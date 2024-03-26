const Word = require("./Word");
const Puzzle = require("./Puzzle");

let SpellingBee = function(stringList,c) {

    let config = c || {};
    let size = config.size || 7;

    //create a variable dict that is a map with key value pairs of string to string taken from the argument d
    let words = stringList.map(s => s.toLowerCase())
        .map(s => new Word(s))
    let dict = words
        .reduce((map, word) => map.has(word.key) ? map.get(word.key).push(word) : map.set(word.key,[word]), new Map());
    

    //write a function that uses tokenize on dict to return a map of string to array of strings
    //the array of strings should contain the unique letters of the key
    //the map should be filtered on the length of the array of strings
    //it should keep only the words that have an array length of exactly 7 letters
    //the array of strings should be the result of tokenize on the key
    let pangramDict = new Map([...dict]
        .filter(entry => entry[0].length === size));
    
    this.puzzleList = Array.from(pangramDict.keys());

    this.puzzle = function(key, index) {
        //if the key is a number, use it as an index to the puzzleList
        if (!isNaN(key)) {
            key = this.puzzleList[key];
        }
        return new Puzzle(pangramDict.get(key)[0], index, words);
    }

    this.randomPuzzle = function() {
        let key = this.puzzleList[Math.floor(Math.random() * this.puzzleList.length)];
        let index = Math.floor(Math.random() * size);
        return this.puzzle(key, index);
    }

    this.tokenize = function(string) {
        let letters = string.toLowerCase().split("").filter(letter => letter.match(/[a-z]/));
        return [...new Set(letters)].sort();
    }
    this.pangramDict = pangramDict;
}   

module.exports = {
    SpellingBee: SpellingBee
}