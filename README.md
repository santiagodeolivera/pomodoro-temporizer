# pomodoro-temporizer
A downloadable web application for PCs and laptops to organize work time according to the pomodoro technique.

## How to "install"
This software doesn't require any kind of installation.<br>
Just download the source code (and extract the files if it's downloaded as a zip package).

## How to use
First, open the application by opening the file `index.html` in the navigator of your choice.
> Note: If preferred, you can create a shortcut or symbolic link to the mentioned file.

Once the application has started, the navigator you chose should have opened a window like this:
![Screenshot of the start state](https://raw.githubusercontent.com/santiagodeolivera/pomodoro-temporizer/main/README-images/screenshot-start.jpg)

If that's the case, click the "START" button to start the temporizer. It will start a countdown for a period of 25 minutes (a pomodoro of work, if you would).<br>
![Screenshot of the work state](https://raw.githubusercontent.com/santiagodeolivera/pomodoro-temporizer/main/README-images/screenshot-work.jpg)

After that, it will sound an alarm, indicating the time is up. Click the "START" button again to begin a break period of 5 minutes.<br>
![Screenshot of the end of work state](https://raw.githubusercontent.com/santiagodeolivera/pomodoro-temporizer/main/README-images/screenshot-end-work.jpg)
![Screenshot of the break state](https://raw.githubusercontent.com/santiagodeolivera/pomodoro-temporizer/main/README-images/screenshot-break.jpg)

Then, it will sound an alarm, indicating the end of the break, and so on...

![Screenshot of the end of break state](https://raw.githubusercontent.com/santiagodeolivera/pomodoro-temporizer/main/README-images/screenshot-end-break.jpg)

The precise distribution of time this application works with is the following:
* Repeat 5 times:
	* Repeat 4 times:
		* Pomodoro of work of 25 minutes
		* Break of 5 minutes (except for the last pomodoro)
	* Long break of 25 minutes (except for the last "pomodoro block")

The current version works with 5 of the aforementioned "blocks" until it stops, but that may change in the future.

## Mobile usage

This application hasn't been tested on mobile phones (mainly because they may not encourage software installation via zip packages), but I'm looking forward to making an android version if people so wish (although I lack experience in mobile development, so that may take a long while).

## Desktop app development

I've decided not to make an Electron app version because this app doesn't interact with the file system or any other feature Electron brings.

## Potential features

Among the features I'm thinking about adding to this project are:

* Volume control
* Pause
* Mute the alarm
* Determine previously:
	* Number of pomodoros per block and
	* Number of blocks until the end of the program
