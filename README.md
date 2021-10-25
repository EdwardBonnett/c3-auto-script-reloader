# c3-auto-script-reloader
Construct 3 plugin which provides advanced features when paired with the VS Code extension here:
https://marketplace.visualstudio.com/items?itemName=EdwardBonnett.c3-vscode-extension


## Features
### Script reload
If you have the Construct 3 VS Code plugin then the script folder will be automatically refreshed every time you save a file from with VS Code.

### Remote debugging
If you have the Construct 3 VS Code plugin then running / stopping the debug instance from within VS Code will automatically start / stop your game for you. Note: The construct 3 window requires to be focued / visible periodically, otherwise the game window may not play automatically.
## How to use
Install the addon as you usually would, then add a single instance of the 'VS Code Plugin' object to your project. When you have the Construct 3 Tools extension installed for VS Code it will automatically connect to Construct 3 from the editor.

## Disclaimer
Due to requiring an instance of the socket.io library in the runtime to control the debug session I'd recommend removing this plugin before publishing your final game to reduce the size of your game.