let Guess = function(word, correct) {
    this.word = word;
    this.timeestamp = Date.now();
    this.isCorrect = correct;
    this.isPangram = false;
}

module.exports = Guess