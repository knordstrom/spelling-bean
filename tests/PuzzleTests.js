const exp = require("constants");

//import a BDD style assertion library
const expect = require("chai").expect;
//import the Word module
const Word = require("../library/Word");
const Puzzle = require("../library/Puzzle");

let dictionary = ["hello", "goodbye", "propaganda", "grandpop", "papa", "dad", "mom", "mama", "dog", "cat", "papaya"]
    .map(w => new Word(w))


describe("Puzzle Tests", function() {

    //create a test case that asserts that a Puzzle instance instantiated on "propaganda" and dictionary has a property baseWord that is a Word instance with a value of "propaganda" and solutions that is an array of length 2 containing the strings "propaganda" and "grandpop" and "papa"  
    it("should return a Puzzle instance with a baseWord of 'propaganda' and solutions of ['propaganda', 'grandpop', 'papa', 'dad', 'dog'] for a Puzzle instance instantiated on 'propaganda' and dictionary", function() {
        let puzzle = new Puzzle(new Word("propaganda"), 0, dictionary);

        //assert that puzzle.baseWord is a Word instance
        expect(puzzle.baseWord instanceof Word).to.equal(true);
        //assert that puzzle.baseWord.value is the string "propaganda"
        expect(puzzle.baseWord.value).to.equal("propaganda");

        //assert that puzzle.solutions is an array in which every element is a Word instance    
        expect(Array.isArray(puzzle.solutions)).to.equal(true);
        expect(puzzle.solutions.every(element => element instanceof Word)).to.equal(true);

        console.log("solutions", puzzle.solutions.map(w => w.value))

        expect(puzzle.requiredLetter).to.equal("p");
        expect(puzzle.totalPoints).to.equal(36);

        //assert that puzzle.solutions is an array of length 5
        expect(puzzle.solutions.length).to.equal(3);
        expect(puzzle.solutions.map(w => w.value).includes("propaganda")).to.equal(true);
        expect(puzzle.solutions.map(w => w.value).includes("grandpop")).to.equal(true);
        expect(puzzle.solutions.map(w => w.value).includes("papa")).to.equal(true);
        expect(puzzle.solutions.map(w => w.value).includes("dad")).to.equal(false);
        expect(puzzle.solutions.map(w => w.value).includes("dog")).to.equal(false);
    });

    it("should have a predictable points total for a Puzzle instantiated with 'propaganda' and dictionary", function() {
        let puzzle = new Puzzle(new Word("propaganda"), 2, dictionary);

        expect(puzzle.requiredLetter).to.equal("o");

        expect(puzzle.pangrams).to.equal(2);
        expect(puzzle.points).to.equal(0);
        expect(puzzle.solutions.length).to.equal(3);
        expect(puzzle.totalPoints).to.equal(17 + 15 + 3); //35

        puzzle.guess(new Word("papa"));
        expect(puzzle.guesses.length).to.equal(1);
        expect(puzzle.correctGuesses()).to.equal(0);
        expect(puzzle.points).to.equal(0);

        //not in dictionary but could be created from baseWord
        puzzle.guess(new Word("poop"));
        expect(puzzle.guesses.length).to.equal(2);
        expect(puzzle.correctGuesses()).to.equal(0);
        expect(puzzle.points).to.equal(0);

        //not in dictionary and way off baseWord
        puzzle.guess(new Word("hagiography"));
        expect(puzzle.guesses.length).to.equal(3);
        expect(puzzle.correctGuesses()).to.equal(0);
        expect(puzzle.points).to.equal(0);

        puzzle.guess(new Word("propaganda"));
        expect(puzzle.guesses.length).to.equal(4);
        expect(puzzle.correctGuesses()).to.equal(1);
        expect(puzzle.points).to.equal(17);

        puzzle.guess(new Word("dad"));
        expect(puzzle.guesses.length).to.equal(5);
        expect(puzzle.correctGuesses()).to.equal(1);
        expect(puzzle.points).to.equal(17);

        puzzle.guess(new Word("grandpop"));
        expect(puzzle.guesses.length).to.equal(6);
        expect(puzzle.points).to.equal(32);

        puzzle.guess(new Word("dog"));
        expect(puzzle.guesses.length).to.equal(7);
        expect(puzzle.points).to.equal(35);
    });

})