let audioContext = new AudioContext();

// Returns a promise which resolves after waiting a certain amount of time
function wait(time) {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), time);
	});
}

// Returns a promise which resolves after beeping once
// Based on code found in https://stackoverflow.com/questions/35497243/how-to-make-a-short-beep-in-javascript-that-can-be-called-repeatedly-on-a-page, by user NVRM
// Changes were made, such as the use of the wait function
function beep(vol, freq, duration) {
 	let oscillator = audioContext.createOscillator();
 	let gain = audioContext.createGain();
	oscillator.connect(gain);
	oscillator.frequency.value = freq;
	oscillator.type = "square";
	gain.connect(audioContext.destination);
	gain.gain.value = vol * 0.01;
	let start = audioContext.currentTime;
	let end = start + duration * 0.001;
	oscillator.start(start);
	oscillator.stop(end);
	return wait(duration);
};

// Returns a promise which resolves after beeping several times
async function beepRepeatedly(times, vol, freq, duration) {
	for(let i = 0; i < times; i++)
		await beep(vol, freq, duration)
}

// Objects of this class can create a controlled beeping sound effect
class BeepControl {
	// times: number of times it beeps in a period
	// vol: volume of the beeps
	// freq: frequency of the beeps (hz)
	// duration: duration of each beep (ms)
	// period: duration of a whole period (ms), beeps included
	constructor(times, vol, freq, duration, period) {
		this.times = times;
		this.vol = vol;
		this.freq = freq;
		this.duration = duration;
		this.pause = period - duration * times;
		this.on = false;
		this.thread = null;
	}

	// Returns a promise which resolves after doing one set of beeps
	beepOnce() {
		return beepRepeatedly(this.times, this.vol, this.freq, this.duration);
	}

	// Creates a promise which beeps continuously with the settings of the object
	async createThread() {
		while(this.on) {
			await this.beepOnce();
			await wait(this.pause);
		}
	}

	// Starts beeping
	start() {
		this.on = true;
		this.thread = this.createThread();
	}

	// Stops beeping
	stop() {
		this.on = false;
		this.thread = null;
	}

	// Beeps until a promise resolves
	async startUntil(promise) {
		this.start();
		await promise;
		this.stop();
	}

	// Beeps until a button is pressed
	startUntilButtonPressed(button) {
		return this.startUntil(new Promise((resolve, reject) => {
			button.addEventListener("click", () => resolve())
		}))
	}
}

// Creates a temporizer which executes a function every time a second passes (with a string showing the time remaining as an argument)
async function temporizer(time, f) {
	while(time > 0) {
		let secs = time % 60;
		let temp_mins = Math.floor(time / 60);
		let mins = temp_mins % 60;
		let hours = Math.floor(temp_mins / 60);

		secs = secs.toString().padStart(2, "0");
		mins = mins.toString().padStart(2, "0");
		hours = hours.toString().padStart(2, "0");
		let str = `${hours}:${mins}:${secs}`;
		f(str);
		await wait(1000);
		time--;
	}
	f("00:00:00");
}
