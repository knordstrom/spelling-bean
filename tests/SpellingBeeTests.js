const exp = require("constants");

//import a BDD style assertion library
const expect = require("chai").expect;
//import the SpellingBee module
const SpellingBee = require("../library/SpellingBee").SpellingBee;
const Word = require("../library/Word");

//create a test suite called "Spelling Bee App Tests"
describe("SpellingBee Tests", function() {

    //create a test case that asserts that SpellingBee.tokenize returns an array of strings
    it("should return an array of strings of length 4 for hello", function() {
        let bee = new SpellingBee([]);
        //assert that SpellingBee.tokenize returns an array
        expect(Array.isArray(bee.tokenize("hello"))).to.equal(true);
        //assert that SpellingBee.tokenize returns an array of strings
        expect(bee.tokenize("hello").every(element => typeof element === "string")).to.equal(true);
        //assert that SpellingBee.tokenize("hello") returns an array with a length of 4
        expect(bee.tokenize("hello").length).to.equal(4);
    })

    //create a test case that asserts that a SpellingBee instance instantiated on ["hello", "goodbye", "propaganda"] has a property tokenizedDict that is a map with a size of 1
    it("should return a map containing 'propaganda' for a SpellingBee instance instantiated on [\"hello\", \"goodbye\", \"propaganda\"]", function() {
        let bee = new SpellingBee(["hello", "goodbye", "propaganda"]);

        expect(bee.tokenize("propaganda").length).to.equal(7);

        //assert that bee.tokenizedDict is a map
        expect(bee.pangramDict instanceof Map).to.equal(true);
        //assert that bee.tokenizedDict has a size of 1
        expect(bee.pangramDict.size).to.equal(1);

        //assert that bee.tokenizedDict has a key of "propaganda"
        expect([...bee.pangramDict.entries()][0][1][0].value).to.equal("propaganda");

        let p = [...bee.pangramDict.entries()][0][1][0];
        //assert that bee.tokenizedDict.get("propaganda") returns a Word instance
        expect(p instanceof Word).to.equal(true);

        //assert that p.letterSet returns an array of strings
        expect(Array.isArray(p.letterSet)).to.equal(true);
        //assert that p.letterSet returns an array in which every element is a string   
        expect(p.letterSet.every(element => typeof element === "string")).to.equal(true);

        //assert that bee.tokenizedDict.get("propaganda") returns an array of strings of length 7
        expect(p.letterSet.length).to.equal(7);

        expect(p.letterSet[0]).to.equal("a");
        expect(p.letterSet[1]).to.equal("d");
        expect(p.letterSet[2]).to.equal("g");
        expect(p.letterSet[3]).to.equal("n");
        expect(p.letterSet[4]).to.equal("o");
        expect(p.letterSet[5]).to.equal("p");
        expect(p.letterSet[6]).to.equal("r");
    })

    //create a test case that asserts that a SpellingBee instance instantiated on ["hello", "goodbye", "propaganda"] has a property puzzleList that is an array of strings of length 1
    it("should return an array of strings of length 1 for a SpellingBee instance instantiated on [\"hello\", \"goodbye\", \"propaganda\"]", function() {
        let bee = new SpellingBee(["hello", "goodbye", "propaganda"]);

        //assert that bee.puzzleList is an 
        expect(Array.isArray(bee.puzzleList)).to.equal(true);
        //assert that bee.puzzleList is an array of strings
        expect(bee.puzzleList.every(element => typeof element === "string")).to.equal(true);
        
        //assert that bee.puzzleList has a length of 1
        expect(bee.puzzleList.length).to.equal(1);
        //assert that bee.puzzleList has a key of "propaganda"
        expect(bee.puzzleList[0]).to.equal("adgnopr");

        //assert that bee.puzzle("adgnopr") returns a Puzzle instance
        expect(bee.puzzle("adgnopr", 0).baseWord.value).to.equal("propaganda");
        //assert that bee.puzzle(0) returns a Puzzle instance
        expect(bee.puzzle(0, 0).baseWord.value).to.equal("propaganda");
    })

    //create a test case to show that randomPuzzle returns a Puzzle instance with an index between 0 and 6
    it("should return a Puzzle instance with an index between 0 and 6 for randomPuzzle", function() {
        let bee = new SpellingBee(["hello", "goodbye", "propaganda"]);
        let puzzle = bee.randomPuzzle();

        //assert that bee.randomPuzzle() returns a Puzzle instance
        expect(puzzle.baseWord instanceof Word).to.equal(true);
        //assert that bee.randomPuzzle() returns a Puzzle instance with an index between 0 and 6
        expect(puzzle.baseWord.value.indexOf(puzzle.requiredLetter)>=0).to.equal(true);
    })

    //create a test case with a SpellingBee created with two words having 7 unique letters showing that randomPuzzle returns a Puzzle instance with an index between 0 and 6
    it("should return a Puzzle instance with one of two qualifying words for randomPuzzle", function() {
        let bee = new SpellingBee(["hello", "goodbye", "propaganda", "bonfire"]);

        expect(bee.puzzleList.length).to.equal(2);

        let puzzle = bee.randomPuzzle();

        //assert that bee.randomPuzzle() returns a Puzzle instance
        expect(puzzle.baseWord instanceof Word).to.equal(true);

        //assert that bee.randomPuzzle() returns a Puzzle instance with a baseWord of "propaganda" or "bonfire"
        expect(puzzle.baseWord.value === "propaganda" || puzzle.baseWord.value === "bonfire").to.equal(true);

        //assert that bee.randomPuzzle() returns a Puzzle instance with an index between 0 and 6
        expect(puzzle.baseWord.value.indexOf(puzzle.requiredLetter)>=0).to.equal(true);


        let pMap = {}
        for (let i = 0; i < 1000; i++) {
            let p = bee.randomPuzzle();
            pMap[p.baseWord.value] = 1;
        }

        //assert that the keys in pMap are "propaganda" and "bonfire"
        expect(Object.keys(pMap).includes("propaganda")).to.equal(true);
        expect(Object.keys(pMap).includes("bonfire")).to.equal(true);
    })
})