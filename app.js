// Create a new instance of the SpellingBee class that reads a dictionary file from the disk of my mac and sets a variable 'dict' to its contents as a map
// The dictionary file is a text file with one word per line
// The map is a data structure that maps a key to a value
// In this case, the key is the word and the value is the word
// The map is used to check if a word is in the dictionary

const SpellingBee = require('./library/SpellingBee');

// Read the dictionary file from the disk of my mac
// Set a variable 'dict' to its contents as a map
// The dictionary file is a text file with one word per line
// The map is a data structure that maps a key to a value
// In this case, the key is the word and the value is the word
// The map is used to check if a word is in the dictionary

// The dictionary file is a text file with one word per line
// The map is a data structure that maps a key to a value
// In this case, the key is the word and the value is the word
// The map is used to check if a word is in the dictionary


let DiskDict = function() {
    let fs = require('fs');
    return fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n")
       // .reduce((map, word) => map.set(word, map), new Map());
}

new SpellingBee(DiskDict())







module.exports = {
    
}
