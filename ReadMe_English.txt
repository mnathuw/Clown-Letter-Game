Framework v4.8.1 (To go with PIXI version 4.8.1)

Description of the files

assets			[folder]	Folder where we store images, sounds and other files required in the game.
js			[folder]	Javascript folder for the game.
node_modules		[folder]	This folder has to be build with < npm install >
index.html		Page where the game is displayed
main.css		CSS of the webpage
package.json		what we need from npm
webpack.config.js	config for when we do < npm build >


js/framework/animations/animation.js
	Class Animation : Allows to load animation such as Anim001.png, Anim002.png, etc.
	To use it, we have to load the animation in game2.js
	[game2.js]
		this.assetLoader.addAssets([
			...,
			"sheets/AnimCoffreLose01.json",		//File made with TexturePacker.
		]);
	
	[animation.js]
		constructor(name, animLength, position = Vector2.Zero(), loop = false, anchor = Vector2.Zero(), speed = 0.5)
	[mainScreen.js]
		new Animation("AnimCoffreLose0100", 78, new Vector2(0, 0), false, new Vector2(0.5,0.5));
js/framework/assetLoader/assetloader.js
	Class AssetLoader : Allows to load all the assets one shot, when the game starts. The js game2.js is responsible for loading all the assets for the game.
	
js/framework/box/baseBox.js
	Class BaseBox : Basic Class for all boxes, currently no boxes are connected to BaseBox, but changes will be made shortly to allow it.
	
js/framework/box/digitBox.js
	Class DigitBox : Allows to have a box to hide/display characters under the form  _'_ _  _ _ _ _. There might be problems with this class with other characters that have to be displayed, such as <'> for example <.> or <?> or <!>, this would have to be tested.
	
js/framework/box/textBox.js
	Class TextBox : Allows to have text in the desired font.  (There's a problem with the fonts we have to load, I will look into that)
	
js/framework/box/timeBox.js
	Class TimeBox : Has not been programmed yet. This will allow to display time and to increase it (timer) or decrease it (countdown). Will be able to be put on pause, rewind, unpause, reset, etc...
	
js/framework/box/winBox.js
	Class WinBox : Has not been programmed yet. This will allow to display time and to increase/decrease numbers (such as a score), and other functions such as a linear increse (from a value to another with a linear progression), other type of increase could be exponential (faster and faster, the increase will need to be capped)
js/framework/buttons/button.js
	Class Button : Allows to have a clickable button/graphic displayed. The button contains a sprite only for debugging.
	new Button(new PIXI.Rectangle(0, 0, 100, 50), true);	//The last parameter is for debugging/display the button.
	
js/framework/containers/container.js
	Class Container : Allows to make a delay for our class, and will be used to apply force, gravity, friction etc.
	
js/framework/forces/gravity.js
	Class Gravity : Gravity force.
	
js/framework/screens/baseScreen.js
	Class BaseScreen : As for the container class, allows to have a delay (such as a timer). Responsible for the display of the canvas (render).
	
js/framework/screens/loadingScreen.js
	Class LoadingScreen : The first screen that is displayed in the games. Allows the display of the progression bar during the loading of the game.
	
js/framework/screens/screenManager.js
	Class ScreenManager : As per its name, it manages the screens. Which screen is currently displayed. If a screen isn't active it will not be displayed. Also allows to make transitions between the screens.
js/framework/screens/screenState.js
	Class ScreenState : Small state class of a screen: ACTIVE, INACTIVE, FROZEN (Displayed, but not updated).
	
js/framework/sounds/sound.js
	Class Sound : Allows to find a sound that has been loaded.
	var piece = new Sound("sounds/piece.mp3");
	
js/framework/sprites/sprite.js
	Class Sprite : Return a sprite that has been loaded.
	
js/framework/utils/vector2.js
	Class Vector2 : Small class to contain x and y, for positionning, but can be used to contain two values.



js/game/maths/currentGameMath.js
	Class CurrentGameMath : Not really used, it's something we can use to know what's the response from the server.
	
js/game/maths/gameMath.js
	Class GameMath : Allows to get information on the current game in progress, from the server.
	
js/game/controls.js
	Class Controls : Display and manage buttons home, back and play/stop music.
	
js/game/game.js
	For now, start the game by calling game2.run(), this will be soon changed in order for the GameMath to be called and at the respond of GameMath we start the game, this way we don't have a respond from the server for the current game in progress, what to display,etc...
js/game/game2.js
	Class Game2 : This is where we load the assets for the game, and where we create the ScreenManager and define all the screens and create the gameLoop, for the update and the draw.
	
js/game/mainScreen.js
	Class MainScreen : The screen of the game, must manage all the custom classes, sounds, graphics, etc.
	
	
	Here is how the framework currently works:
	1. game.js is called by index.html
	2. game.js calls game2.run().
	3. game2.run() adds the assets to load in assetLoader, the ScreenManager is created, the screens are added.
	4. ScreenManager.loadContent() is called, which creates the class LoadingScreen and call loadingScreen.loadContent(), loadingScreen only displays its background and the progress bar, 
	   no asset is loaded for now.
	5. assetLoader.loadContent() is called, the loading process for the assets is now started, the callback for the progress and ending are added by ScreenManager.
	6. ScreenManager is in charge of giving the information of the progress to loadingScreen.
	7. When the loading of the assets is done, screenManager.contentLoaded() is called by assetLoader (by the callback). The screen loadingScreen is unloaded with removeScreen(). 
	   The screen or screens ACTIVE are displayed by calling their loadContent().
	8. MainScreen displays its assets that have to be loaded before being used. 
	9. MainScreen calls gameMath.generateNewGame(user_id, game_id, initGameMath)
	10. When initGameMath is called by GameMath, we have the information about the game or games that will be played.
	11. I would like that we keep the structure of the games as is the most possible.
	11.a initGameMath has to call init(), within init we have to initialise the game, the currentLevel, and start the music, etc...
	11.b init() has to call startGame(), to display the first asset of the game. Then, we have to call initNewGame(), which is responsible for the current game in progress.
	11.c initNewGame() has to call startConsigne() or playQuestion() depending if it's our first game. startConsigne() either displays what the player has to do or a sound that explains how to play. There's none in some games.
	11.d startConsigne() has to call consigneCompleted(), even if not applicable.
	11.e consigneCompleted() has to call playQuestion(), again it's similar to startConsigne() , call it even if not applicable. This could be a sound or a text.
	11.f playQuestion() has to call questionCompleted(). This is only when the question/explanation is completed and the game starts (the player can click, or play).
	11.g questionCompleted() must display or enable the elements of the game that have to be displayed or enabled.
	11.h onCellClick(e), or onCoffreClick, or whatever that has to be verified for a correct answer, if correct: play the bravo or other sound, if incorrect play the sorry or other sound...
	11.i onCellClick(e) has to call onWinGame(e), which is responsible to verify if we win the current game or if we have to keep playing. 
	12. The rest of it will be customed for each game, or we will add other instructions on an as-needed basis.
	
	
This is mostly a tour of the framework and how I would like the games to work to keep a certain uniformity.


Thank you :)

Roger

For any question : info@creonix.ca