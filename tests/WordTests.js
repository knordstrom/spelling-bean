const exp = require("constants");

//import a BDD style assertion library
const expect = require("chai").expect;
//import the Word module
const Word = require("../library/Word");

//create a test suite called "Spelling Bee App Tests"
describe("Word Tests", function() {

    //createe a test cass that asserts that a Word instantiated with 'good' has a property letterSet that is the set {'g', 'o', 'd'}
    it("should return a set containing 'g', 'o', 'd' for a Word instance instantiated with 'good'", function() {
        let word = new Word("good");

        //assert that word.letterSet is an array of strings
        expect(Array.isArray(word.letterSet)).to.equal(true);

        //assert that word.letterSet is an array in which every element is a string
        expect(word.letterSet.every(element => typeof element === "string")).to.equal(true);

        //assert that word.letterSet has a length of 3
        expect(word.letterSet.length).to.equal(3);

        //assert that word.letterSet has a key of "propaganda"
        expect(word.letterSet[0]).to.equal("d");
        expect(word.letterSet[1]).to.equal("g");
        expect(word.letterSet[2]).to.equal("o");
    })

    //create a test case that asserts that a Word instantiated with 'propaganda' has a property key that is the string 'adgnopr'
    it("should return the string 'adgnopr' for a Word instance instantiated with 'propaganda'", function() {
        let word = new Word("propaganda");

        //assert that word.key is a string
        expect(typeof word.key).to.equal("string");
        //assert that word.key is the string 'dgo'
        expect(word.key).to.equal("adgnopr");
    })

    //create a test case that asserts that a Word instantiated with 'grandpop' has a property key that is the string 'adgnopr'
    it("should return the string 'adgnopr' for a Word instance instantiated with 'grandpop'", function() {
        let word = new Word("grandpop");

        //assert that word.key is a string
        expect(typeof word.key).to.equal("string");
        //assert that word.key is the string 'dgo'
        expect(word.key).to.equal("adgnopr");
    })

    it("should return true for Word('prop') caan be created from the Word('propaganda') and false for Word('what')", function() {
        let propaganda = new Word("propaganda");
        let prop = new Word("prop");
        let what = new Word("what");
        let papa = new Word("papa");

        //assert that propaganda.isSolution(prop) is true
        expect(propaganda.canCreate(prop)).to.equal(true);
        expect(propaganda.canCreate(propaganda)).to.equal(true);
        expect(propaganda.canCreate(papa)).to.equal(true);
        //assert that propaganda.isSolution(what) is false
        expect(propaganda.canCreate(what)).to.equal(false);
    })

    //create a test case that shows that a Word instance has a property hasLetter that returns true if the letter is in the letterSet and false otherwise
    it("should return true for Word('propaganda') hasLetter('p') and false for Word('propaganda') hasLetter('x')", function() {
        let propaganda = new Word("propaganda");

        //assert that propaganda.hasLetter('p') is true
        expect(propaganda.hasLetter('p')).to.equal(true);
        //assert that propaganda.hasLetter('x') is false
        expect(propaganda.hasLetter('x')).to.equal(false);
    })
})