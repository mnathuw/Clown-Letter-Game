import Container from '../framework/containers/container.js';
import ScreenManager from '../framework/screens/screenManager.js';
import randomize from '../framework/utils/randomize.js'; 
import {
    UPPER_A_H,
    UPPER_I_P,
    UPPER_A_P,
    UPPER_Q_Z,
    UPPER_A_Z,
    LOWER_A_H,
    LOWER_I_P,
    LOWER_A_P,
    LOWER_Q_Z,
    LOWER_A_Z
} from "../data/letters.js";
import KLevels from '../data/kLevels.js';

export default class LettersQuestion extends Container
{
    constructor(resources, pos, level)
    {
        super(pos);

        // Get ratio, width, height of game screen
        this.screenManager = new ScreenManager(this, this)
        var w = this.screenManager.getWidth();
        var h = this.screenManager.getHeight();

        // Deal with level function
        this._kLevel = new KLevels();
        this.level = this._kLevel.getKLevels();

        // Get index in level js file
        this.index = level - 1;

        // Get alphabet of this level
        this.alphabet = this.level[this.index].alphabet;

        // Get type of this level
        this.type = this.level[this.index].type;

        // Get number of letters of this level
        this.numberOfLetters = this.level[this.index].letters;

        // Create letters array to appear in box
        this.letters = [];

        // Pick random 2 position of right answer
        this.indexAnswer = []
        switch(this.numberOfLetters) 
        {
            case "4":
                this.indexAnswer = [0, 1, 2, 3];
                break;
            case "6":
                this.indexAnswer = [0, 1, 2, 3, 4, 5];
                break;
            case "8":
                this.indexAnswer = [0, 1, 2, 3, 4, 5, 6, 7];
                break;
            case "12":
                this.indexAnswer = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
                break;
            default:
                console.log('Error in Level design, look at level ' + level);
        }

        this.shuffleIndexAnswer = this.shuffle(this.indexAnswer);
        this.indexRightAnswer1 = this.shuffleIndexAnswer[0];
        this.indexRightAnswer2 = this.shuffleIndexAnswer[1];
        
        // Get which array will use
        this.lettersArray = [];
        this.lettersArray2 = [];

        if (this.type == "uppercase")
        {
            switch(this.alphabet) {
                case "ah":
                    this.lettersArray = UPPER_A_H;
                    break;
                case "ip":
                    this.lettersArray = UPPER_I_P;
                    break;
                case "ap":
                    this.lettersArray = UPPER_A_P;
                    break;
                case "qz":
                    this.lettersArray = UPPER_Q_Z;
                    break;
                case "az":
                    this.lettersArray = UPPER_A_Z;
                    break;  
                default:
                    console.log('Error in Level design, look at level ' + this.level);
            }
        }
        else if (this.type == "lowercase")
        {
            switch(this.alphabet) {
                case "ah":
                    this.lettersArray = LOWER_A_H;
                    break;
                case "ip":
                    this.lettersArray = LOWER_I_P;
                    break;
                case "ap":
                    this.lettersArray = LOWER_A_P;
                    break;
                case "qz":
                    this.lettersArray = LOWER_Q_Z;
                    break;
                case "az":
                    this.lettersArray = LOWER_A_Z;
                    break;  
                default:
                    console.log('Error in Level design, look at level ' + this.level);
            }
        }
        else if (this.type == "both")
        {
            switch(this.alphabet) {
                case "ah":
                    this.lettersArray = LOWER_A_H;
                    this.lettersArray2 = UPPER_A_H;
                    break;
                case "ip":
                    this.lettersArray = LOWER_I_P;
                    this.lettersArray2 = UPPER_I_P;
                    break;
                case "ap":
                    this.lettersArray = LOWER_A_P;
                    this.lettersArray2 = UPPER_A_P;
                    break;
                case "qz":
                    this.lettersArray = LOWER_Q_Z;
                    this.lettersArray2 = UPPER_Q_Z;
                    break;
                case "az":
                    this.lettersArray = LOWER_A_Z;
                    this.lettersArray2 = UPPER_A_Z;
                    break;  
                default:
                    console.log('Error in Level design, look at level ' + this.level);
            }
        }
        else
        {
            console.log('Error in Level design, look at level ' + this.level);
        }

        // Check there are 1 or 2 array
        // Not empty mean there are 2 arrays, both upper and lower
        if (Array.isArray(this.lettersArray2) && this.lettersArray2.length)
        {
            // Pick a random letter for right answer
            this.indexRightAnswerInArray = randomize(0, this.lettersArray.length - 1);
            this.rightAnswerLetterInLower = this.lettersArray[this.indexRightAnswerInArray];
            this.rightAnswerLetterInUpper = this.lettersArray2[this.indexRightAnswerInArray];

            // Get the remain letters array without the right answer
            this.lettersArray.splice(this.indexRightAnswerInArray, 1);
            this.lettersArray2.splice(this.indexRightAnswerInArray, 1);

            // Take the shuffle array of index of letters
            var indexOfLetters = [];
            for (let i = 0; i < this.lettersArray.length - 1; i++)
            {
                indexOfLetters.push(i);

            }
            this.shuffleIndex = this.shuffle(indexOfLetters);

            // Put right answer in postition of right answer
            this.letters[this.indexRightAnswer1] = new PIXI.Text(this.rightAnswerLetterInUpper);
            this.letters[this.indexRightAnswer2] = new PIXI.Text(this.rightAnswerLetterInLower);

            // this.lettersArray[shuffleIndex[i]]

            // Put in the remain positions which not right answer
            for (let i = 2; i < this.numberOfLetters; i++)
            {
                this.letters[this.shuffleIndexAnswer[i]] = new PIXI.Text([ this.lettersArray[this.shuffleIndex[i-2]] , [this.lettersArray2[this.shuffleIndex[i-2]] ] ] [Math.round(Math.random())]);
            } 
        }
        // empty mean only lower or upper
        else
        {
            // Pick a random letter for right answer
            this.shuffleLettersArray = this.shuffle(this.lettersArray);
            this.rightAnswerLetter = this.shuffleLettersArray[0];

            // Put right answer in postition of right answer
            this.letters[this.indexRightAnswer1] = new PIXI.Text(this.rightAnswerLetter);
            this.letters[this.indexRightAnswer2] = new PIXI.Text(this.rightAnswerLetter);

            // Get the remain letters array without the right answer
            this.shuffleLettersArray.shift();

            // put in the remain positions which not right answer
            for (let i = 2; i < this.numberOfLetters; i++)
            {
                this.letters[this.shuffleIndexAnswer[i]] = new PIXI.Text(this.shuffleLettersArray[i-2]);
            }
        }

        // // Set position of letters (4 letters)

        switch(this.numberOfLetters) 
        {
            case "4":
                // Set position of letters (4 letters)
                this.letters[0].x = w / 2.8;
                this.letters[0].y = h / 2.8;
                this.letters[1].x = w / 2.4;
                this.letters[1].y = h / 2.8;
                this.letters[2].x = w / 2.8;
                this.letters[2].y = h / 2.25;
                this.letters[3].x = w / 2.4;
                this.letters[3].y = h / 2.25;                  
                break;
            case "6":
                // Set position of letters (6 letters)
                this.letters[0].x = w / 2.9;
                this.letters[0].y = h / 2.8;
                this.letters[1].x = (w / 2.9 + w / 2.3) / 2;
                this.letters[1].y = h / 2.8;
                this.letters[2].x = w / 2.3;
                this.letters[2].y = h / 2.8;
                this.letters[3].x = w / 2.9;
                this.letters[3].y = h / 2.25;
                this.letters[4].x = (w / 2.9 + w / 2.3) / 2;
                this.letters[4].y = h / 2.25;
                this.letters[5].x = w / 2.3;
                this.letters[5].y = h / 2.25;
                break;
            case "8":
                // Set position of letters (8 letters)
                this.letters[0].x = w / 2.7;
                this.letters[0].y = h / 3;

                this.letters[1].x = w / 2.46 //(w / 2.7 + w / 2.3 + w /1.7) / 3;
                this.letters[1].y = this.letters[0].y;

                this.letters[2].x = 2 * this.letters[0].x - this.letters[1].x;
                this.letters[2].y = h / 2.5;

                this.letters[3].x = this.letters[0].x;
                this.letters[3].y = this.letters[2].y;
                
                this.letters[4].x = this.letters[1].x //(w / 2.9 + w / 2.3) / 2;
                this.letters[4].y = this.letters[2].y;

                this.letters[5].x = 2 * this.letters[1].x -this.letters[0].x;
                this.letters[5].y = this.letters[2].y;

                this.letters[6].x = this.letters[0].x;
                this.letters[6].y = 2 * this.letters[2].y - this.letters[0].y;

                this.letters[7].x = this.letters[1].x;
                this.letters[7].y = 2 * this.letters[2].y - this.letters[0].y;
                break;
            case "12":
                // Set position of letters (12 letters)
                this.letters[0].x = w / 3.17;
                this.letters[0].y = h / 3.2;

                this.letters[1].x = w / 2.74 
                this.letters[1].y = this.letters[0].y;

                this.letters[2].x = 2 * this.letters[1].x - this.letters[0].x;
                this.letters[2].y = this.letters[0].y

                this.letters[3].x = 2 * this.letters[2].x - this.letters[1].x;
                this.letters[3].y = this.letters[0].y;
                
                this.letters[4].x = this.letters[0].x 
                this.letters[4].y = h / 2.47;

                this.letters[5].x = this.letters[1].x;
                this.letters[5].y = this.letters[4].y;

                this.letters[6].x = 2 * this.letters[1].x - this.letters[0].x;
                this.letters[6].y = this.letters[4].y;

                this.letters[7].x = 2 * this.letters[2].x - this.letters[1].x;
                this.letters[7].y = this.letters[4].y;

                this.letters[8].x = this.letters[0].x;
                this.letters[8].y = 2 * this.letters[4].y - this.letters[0].y;

                this.letters[9].x = this.letters[1].x;
                this.letters[9].y = 2 * this.letters[4].y - this.letters[0].y;

                this.letters[10].x = 2 * this.letters[1].x - this.letters[0].x;
                this.letters[10].y = 2 * this.letters[4].y - this.letters[0].y;

                this.letters[11].x = 2 * this.letters[2].x - this.letters[1].x;
                this.letters[11].y = 2 * this.letters[4].y - this.letters[0].y;
                break;
            default:
                console.log('Error in Level design, look at level ' + this.level);
        }

        // Set interact and add child
        for (let i = 0; i < this.numberOfLetters; i++) 
        {
            this.letters[i].style.fontFamily = 'Muli';
            this.letters[i].style.fill = '#00a4bc';
            this.letters[i].style.fontSize = 70 * w / 1920;
            this.letters[i].anchor.set(0.5);
            //setTimeout(() => this.letters[i].interactive = true, 5000)
            this.letters[i].interactive = true;
            this.letters[i].buttonMode = true;
            this.addChild(this.letters[i]);
        }
        
    }

    getIndexRightAnswer1()
    {
        return this.indexRightAnswer1;
    }

    getIndexRightAnswer2()
    {
        return this.indexRightAnswer2;
    }

    getRightLetter1()
    {
        if (Array.isArray(this.lettersArray2) && this.lettersArray2.length)
        {
            return this.rightAnswerLetterInLower;
        }
        else 
        {
            return this.rightAnswerLetter;
        }
    }

    getRightLetter2()
    {
        if (Array.isArray(this.lettersArray2) && this.lettersArray2.length)
        {
            return this.rightAnswerLetterInUpper;
        }
        else 
        {
            return this.rightAnswerLetter;
        }
    }

    // Shuffle an array
    shuffle(array)
    {
        var cl = [];
        var nA = [];
        jQuery.extend(cl, array);
        while(cl.length > 0)
        {
        var r = Math.floor(Math.random() * cl.length);
        nA.push(cl[r]);
        cl.splice(r,1);
        }
        return nA;
    }

}
