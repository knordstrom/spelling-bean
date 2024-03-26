let Word = function(string) {
    this.value = string;
    this.letterSet = [...new Set(this.value.toLowerCase().split(""))].sort();

    //create a property 'key' that is the sorted elements of letterSet sorted and joined into a string
    this.key = this.letterSet.join("");

    this.hasLetter = function(letter) {
        return this.letterSet.indexOf(letter) != -1;
    }

    this.canCreate = function(word) {
        return word.key.split("").every(letter => { return this.letterSet.indexOf(letter) != -1 });
    }
}

module.exports = Word