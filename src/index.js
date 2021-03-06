// Number of pomodoros in a block
let maxRounds = 4;

// Number of blocks
let maxBlocks = 5;

// Amount of time for a work period (in seconds)
const tWork = 25 * 60;

// Amount of time for a break period (in seconds)
const tBreak = 5 * 60;

// Amount of time for a long break period (in seconds)
const tLongBreak = 25 * 60;




let body = document.body;
let startButton = document.getElementById("start-button");
let pauseButton = document.getElementById("pause-button");
let tempText = document.getElementById("temp");
let stateText = document.getElementById("state");
let volumeInput = document.getElementById("volume-input-inner");
let muteInput = document.getElementById("mute-unmute");
let volumeTest = document.getElementById("volume-test");
let maxRoundsInput = document.getElementById("max-rounds");
let maxBlocksInput = document.getElementById("max-blocks");

let beepControl = new BeepControl(2, volumeInput.value * 0.2, 500, 125, 1000);
let temporizer = null;
let temporizerPaused = false;

pauseButton.addEventListener("click", () => {
	if(temporizer) {
		if (temporizerPaused) {
			temporizer.start();
			temporizerPaused = false;
			body.removeAttribute("data-paused");
		} else {
			temporizer.stop();
			temporizerPaused = true;
			body.setAttribute("data-paused", "");
		}
	}
});

function updateVolume() {
	beepControl.vol = volumeInput.value * 0.2;
}
volumeInput.addEventListener("change", updateVolume);
updateVolume();

volumeTest.addEventListener("click", () => {
	beepControl.beepOnce();
});

function updateMaxRounds() {
	let v = maxRoundsInput.value;
	if (v == "") {
		maxRoundsInput.value = 4;
		maxRounds = 4;
	} else maxRounds = parseInt(v);
}
maxRoundsInput.addEventListener("change", updateMaxRounds);
updateMaxRounds();

function updateMaxBlocks() {
	let v = maxBlocksInput.value;
	if (v == "") {
		maxBlocksInput.value = 5;
		maxBlocks = 5;
	} else maxBlocks = parseInt(v);
}
maxBlocksInput.addEventListener("change", updateMaxBlocks);
updateMaxBlocks();


muteInput.addEventListener("click", () => {
	if (body.hasAttribute("data-muted")) {
		body.removeAttribute("data-muted");
		beepControl.vol = volumeInput.value * 0.2;
	} else {
		body.setAttribute("data-muted", "");
		beepControl.vol = 0;
	}
});

let state = {};

function setState(name, args) {
	state = {
		...state,
		...args,
		name: name
	};
	body.setAttribute("data-state", name);
}

setState("START", {
	rounds: 1,
	bigRounds: 1
});

function setTemp(time, ...nextState) {
	temporizer = new Temporizer(time, s => tempText.innerHTML = s, () => {
		setState(...nextState);
		beepControl.start();
	});
	temporizerPaused = false;
	temporizer.start();
	body.removeAttribute("data-paused");
}

startButton.addEventListener("click", async () => {
	beepControl.stop();

	if (["START", "END-BREAK", "END-LONG-BREAK"].includes(state.name)) {
		setState("WORKING");
		setTemp(tWork, "END-WORKING");
	} else if (state.name == "END-WORKING") {
		if (state.rounds < maxRounds) {
			setState("BREAK");
			await setTemp(tBreak, "END-BREAK", { rounds: state.rounds + 1 });
		} else if (state.bigRounds < maxBlocks) {
			setState("LONG-BREAK", { rounds: 1 });
			await setTemp(tLongBreak, "END-LONG-BREAK", { bigRounds: state.bigRounds + 1 });
		} else {
			setState("END");
		}
	}
});
