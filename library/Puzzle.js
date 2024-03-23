const Guess = require("./Guess");

let Puzzle = function(baseWord, requiredLetterIndex, wordList) {

    //console.log("creating puzzle with", baseWord, requiredLetterIndex, wordList);

    let getPoints = function(guess) {
        return (guess.isCorrect ? guess.word.value.length : 0)  
            + (guess.word.key === baseWord.key ? guess.word.key.length : 0);
    }

    this.baseWord = baseWord;

    //create a property 'requiredLetter' that is the letter at the index requiredLetterIndex of the baseWord value
    this.requiredLetter = baseWord.value[requiredLetterIndex];
    wordList = wordList || [];

    //create a method 'solutions' that takes a Set of strings and filters it on whetheer the letters in each string are a subset of letterSet
    this.solutions = wordList.filter(w => w.hasLetter(this.requiredLetter) && baseWord.canCreate(w));
    let solutionSet = new Set(this.solutions.map(w => w.value));

    this.guesses = [];
    this.points = 0;
    this.totalPoints = this.solutions.reduce((total, word) => total + getPoints(new Guess(word, true)), 0);
    this.pangrams = this.solutions.reduce((total, w) => w.key === baseWord.key ? total + 1 : total, 0);

    this.correctGuesses = function() {
        return this.guesses
            .filter(g => g.isCorrect)
            .length;
    }

    this.guess = function(word) {  
        let isCorrect = solutionSet.has(word.value) && this.baseWord.canCreate(word); 
        let g = new Guess(word, isCorrect);
        this.guesses.push(g);
        this.points += getPoints(g);
    } 

}

module.exports = Puzzle