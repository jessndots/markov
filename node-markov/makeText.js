/** Command-line tool to generate Markov text. */

let fs = require('fs');
let {MarkovMachine, between} = require('./markov');
console.log(MarkovMachine);
const path = String(process.argv[3]);
console.log(path);

let text;
fs.readFile(path, 'utf8', function(err, data) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  text=data;
  let machine = new MarkovMachine(text);
  console.log(machine.makeText());
})

console.log('reading')