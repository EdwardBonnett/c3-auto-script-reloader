# c3-auto-script-reloader
Construct 3 plugin to auto reload scripts when using an external editor

## Disclaimer
A lot of what's needed to do this isn't currently exposed to the Plugin SDK provided by Construct so this is liable to break and / or cause exceptions to be thrown
I take no responsibility for any corruption of your project.

## How to use
Install the addon as you usually would, then add a single instance of the 'Script Reloader' object to your project. Every 2000ms it will check all files in the local folder to see if they've changed. If they have it will grab the contents of the file and re-add it to the project. This saves you having to constantly reload the scripts every time you make a change. I'd recommend exclusively using an external editor if you use this, rather than the inbuilt one.
