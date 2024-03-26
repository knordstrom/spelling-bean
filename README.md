# spelling-bean
A library to back and support the times' word game of a similar name.

To run tests, use`npm test` from the main directory.

Coverage:

----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------|---------|----------|---------|---------|-------------------
All files       |     100 |       95 |     100 |     100 |                   
 Guess.js       |     100 |      100 |     100 |     100 |                   
 Puzzle.js      |     100 |    91.66 |     100 |     100 | 25                
 SpellingBee.js |     100 |      100 |     100 |     100 |                   
 Word.js        |     100 |      100 |     100 |     100 |                   
----------------|---------|----------|---------|---------|-------------------


To access the API (and thus play the game), execute `npm start`. The API runs on localhost:3000 by default and there are presently two endpoints:

* `/random`        Returns the key of a randomly selected game from the dictionary
* `/guess?key=[KEY]&guess=[WORD_BEING_GUESSED]`  Plays the game with key KEY by guessing WORD_BEING_GUESSED