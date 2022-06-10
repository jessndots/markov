/** Textual markov chain generator */
const fs = require('fs')

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map()
    for (let i=0; i<this.words.length; i++) {
      let word = this.words[i];
      chains.set(word, []);
    }

    for (let i=1; i<=this.words.length; i++) {
      let before = this.words[i-1];
      let word = this.words[i];
      let chain = chains.get(before);
      chain.push(word);
      chains.set(before, chain);
    }
    
    this.chains = chains
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    //pick random word to start, add to array called text
    let text = [this.words[between(0, this.words.length)]]

    //until there is 100 words
    for (let i=1; i<numWords; i++) {
      // grab last word from text
      const before = text[text.length-1];
      // get chain for previous word
      const chain = this.chains.get(before);
      // randomly pick new word from chain
      const word = chain[between(0, chain.length)];
      // push new word to text
      text.push(word);
    }

    // set this.text to new text
    this.text = text;
    return this.text.join(" ")
  }
}

module.exports = {MarkovMachine: MarkovMachine, between:between};

