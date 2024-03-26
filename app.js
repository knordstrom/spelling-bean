// Create a new instance of the SpellingBee class that reads a dictionary file from the disk of my mac and sets a variable 'dict' to its contents as a map
// The dictionary file is a text file with one word per line
// The map is a data structure that maps a key to a value
// In this case, the key is the word and the value is the word
// The map is used to check if a word is in the dictionary

const SpellingBee = require('./library/SpellingBee').SpellingBee;
const Word = require('./library/Word');

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
    return fs.readFileSync("./library/resources/words_alpha.txt", "utf-8").toLowerCase().split("\r\n")
}

const d = DiskDict();
const bee = new SpellingBee(Array.from(d));

//create an express application listening on port 3000
const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

const pCache = {};


//create a route that returns the baseWord of the puzzle
app.get('/random', (req, res) => {
    let puzzle = bee.randomPuzzle();
    pCache[puzzle.key] = puzzle;
    res.send(200,puzzle.key);
});

//create a route that reads a parameter "key" from the GET request and a paarameter "guess" from the GET request 
// and makes a guess against the puzzle instance in pMap
//if the guess is correct, return the points and the total points
//if the guess is incorrect, return the points and the total points
app.get('/guess', (req, res) => {
    let key = req.query.key;
    let guess = req.query.guess;
    let puzzle = pCache[key];
    if (puzzle == undefined) {
        puzzle = bee.randomPuzzle().fromFullKey(key);
        pCache[key] = puzzle;
    }

    puzzle.guess(new Word(guess));
    res.send(200,[puzzle.points, puzzle.totalPoints, puzzle.correctGuesses()]);
});





 


module.exports = {
    
}
