/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    // Split the input text into individual words using spaces, carriage returns, and newlines as delimiters, returns an array of individual words
    let words = text.split(/[ \r\n]+/);
    // Filter out any empty strings from the resulting array of words
    this.words = words.filter(c => c !== "");
    // The 'filter' method is used to remove empty strings from the 'words' array.
    // It checks each element (word) 'c' of the 'words' array and only includes
    // elements for which the arrow function 'c => c !== ""' returns true.
    // The condition 'c !== ""' checks if the word 'c' is not an empty string (i.e., it contains at least one character).
    // If the condition is met, the word is included in the new filtered array.
    // The resulting filtered array is assigned to 'this.words', containing only valid non-empty words.
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // Initialize a new Map to store the Markov Chain
    let chains = new Map();

    // Loop through each word in the 'this.words' array to build the Markov Chain
    for (let i = 0; i < this.words.length; i++) {
      // Get the current word from the 'this.words' array
      let word = this.words[i];

      // Get the next word in the 'this.words' array (null if there is none)
      let nextWord = this.words[i + 1] || null;

      // Check if the current word is already a key in the 'chains' Map
      if (chains.has(word)) {
        // If the current word is a key, append the nextWord to its array value
        chains.get(word).push(nextWord);
      } else {
        // If the current word is not yet a key, add it as a key and set its value as an array containing the next word
        chains.set(word, [nextWord]);
      }
    }
    // Set 'this.chains' to the final 'chains' map after the loop has finished constructing it
    this.chains = chains;
  }
  // The 'static' keyword is used to define a static method of the class.
  // Static methods belong to the class itself, not to instances created from the class.
  // They can be called directly on the class without creating an instance of the class.

  // The 'choice' method is a static method of the 'MarkovMachine' class.
  // It takes an array ('ar') as a parameter and returns a random element from that array.
  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }
    // Method to generate random text using the Markov Chain
    // The 'numWords' parameter determines the maximum number of words to generate (default value is 100).
    // Returns the generated text as a single string.
    makeText(numWords = 100) {
      // Pick a random key to begin the text generation
      // Get an array of all the keys in the 'this.chains' Map using 'Array.from(this.chains.keys())'
      let keys = Array.from(this.chains.keys());
      // Use the 'choice' static method of the 'MarkovMachine' class to randomly select a key from the array
      let key = MarkovMachine.choice(keys);
      let out = [];
  
      // Produce Markov chain until reaching termination word (null) or reaching the desired number of words (numWords)
      // The 'while' loop will continue until 'out.length' becomes equal to 'numWords' or 'key' becomes 'null'.
      while (out.length < numWords && key !== null) {
        // Add the current 'key' to the 'out' array, representing a word in the generated text
        out.push(key);
        // Choose the next word (key) in the Markov Chain from the possible words that can follow the current 'key'
        // Use the 'choice' static method to randomly select the next word from the array of possible next words.
        key = MarkovMachine.choice(this.chains.get(key));
      }
      // Return the generated text as a single string, with words joined by spaces
      // The 'out' array now contains the generated words from the Markov Chain.
      // Join the elements of the 'out' array using a space as the separator to form a single string.
      return out.join(" ");
    }
}
// The 'module.exports' statement is used to make the 'MarkovMachine' class available for use in other files.
// By exporting the class, other files can import it and create instances of the 'MarkovMachine' class.
// This allows them to use the functionality provided by the class to generate random text using the Markov Chain.

// The 'module.exports' statement is an object that contains the things we want to export from this module (file).
// In this case, we want to export the 'MarkovMachine' class, so we assign it as a property of the 'module.exports' object.

// The 'MarkovMachine' class is assigned to the 'MarkovMachine' property of 'module.exports'.
// This way, when another file imports this module using the 'require' function, they can access the 'MarkovMachine' class like this:
// const { MarkovMachine } = require('./path/to/this/file');

// The syntax { MarkovMachine } inside the 'require' function is called object destructuring, which allows us to extract specific properties from an object.

// For example, if another file wants to use the 'MarkovMachine' class, they can import it like this:
// const { MarkovMachine } = require('./path/to/this/file');
// Then, they can create an instance of the class and use its methods like this:
// const markovMachine = new MarkovMachine("source text");
// const generatedText = markovMachine.makeText(200);
// console.log(generatedText);

// By exporting the 'MarkovMachine' class, it becomes a reusable module that can be used in different parts of the application.
// This modular approach makes the code more organized and easier to maintain.
module.exports = {
  MarkovMachine,
};