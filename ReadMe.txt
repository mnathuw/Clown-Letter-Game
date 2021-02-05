After you understand the functions of each folder and file in ReadMe_English.txt, here is some more explanation of code workflow for game 2:

1. menuScreen.js
 1. Create Jeour button 
 2. After selecting Jeour, go to mainScreen.js
2. mainScreen.js
 Before student play
 1. Create letter style (font family and font size) and set positions for them in lettersQuestion.js
 2. Get frame and tent sprite in assets/images
 3. Get all buttons in controls.js
 4. Get uppercase and lowercase letter sounds in assets/sounds folder
 5. Call the tent animation no loop for it by getIndex() in tentAnim.js
 6. Randomly chose a character by getIndexOfChar() in balloons.js
 7. onAnswerClick(e): Disable clicked letter and run letter sounds
 8. onWinGame(): run Bravo.mp3, get number of zones and add balloon animation in BalloonAnim.js, count on round, and level up whenever final successful win round is completed
 9. levelUp(): change screen state to continueScreen

3. data [folder] : contain question list and level requirement based on LevelDescription.xlsx
 g1Levels.js: levels for grade 1
 kLevels.js: levels for kindergarten 
	level -> Level column
	round -> Number of successful rounds to complete in a row before mving to the next level
	alphabet -> Use letter from...to... inclusively
	letters -> number of letters displayed
	zone -> number of zones displayed on hot air balloon
	type -> type of game such as match the two same uppercase/lowercase/both letters
 letters.js: Arrays of letters will be generated based on level description
 
4. constances
 Contain file path variables
5. tentAnim.js
 Run tent animation in folder assets/images/AnimTent
6. balloonAnim.js
 No loop for this animation. After all slots of hot air balloon are filled by letters, the letter pairs are left on standby for 2 seconds so that players can see the correct pairs. Then run balloon animation in folder assets/images/HotAirBalloons
7. controls.js
 Allow having a clickable button displayed in assets/images
 1. Get home/back/music/fullscreen image
 2. Set position each of them and enable interaction by setting interactive = true
 3. When user click the home button, the window location will replace by index page (direct user to the home page)
 4. When the user click back button, return to the menuScreen
 5. Set music for control music in mainScreen.js using setMusic() method
 6. The fullScreen in progress. It may not work on the iOS browser. You may visit this website https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API and check browser compatibility
8. lettersQuestion.js
 1. Deal with level function 
 2. Get index level in g1Level.js or kLevels.js
 3. Get alphabet, type and number of letters
 4. Pick random 2 positions of the right answer
 5. Get which array will use depending on level (uppercase/lowercase/both)
 6. Set position of letters (in each case 4/case 6/case 8/case 12)
 7. Get the index of the right answer 
9. continueScreen.js
 1. After the final successful win rounds of each level, continue screen will appear
 2. Create continue button, will direct the player to next level (the winning round will be restarted to 0)
10. boxes.js: Locate and resize the box
 1. BoxLetterEasy.png: for 4 letters or 6 letters
 2. BoxLetterMedium.png: for 8 letters
 3. BoxLetterHard.png: for 12 letters
11. balloons.js
 1. Locate and resize the balloon gray off
 2. Locate bottom part and 3 parts match for each zone cases (3/5/7)
 3. Locate and resize the character
 4. Colored balloon when student click right answer by changeColor() (set gray001/gray002/gray003/gray004/gray005/gray006/gray007 visible false)
 5. Get letters to appear in the balloon and set position for them
 6. Set the letters style based on GoogleFont.txt

Please let me know if you have any questions or concerns. I would love to explain to you more detail.

Nguyen Anh Thu Mai

For any question : mnathu98@gmail.com
