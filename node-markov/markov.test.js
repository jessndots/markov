const {MarkovMachine, between} = require("./markov");

const fs = require("fs");

test('between should return random num between x(inclusive) and y(exclusive)', function(){
    let rand = between(2,3);
    expect(rand).toEqual(2);
});


test('between should select the higher number as y', function() {
    let rand = between(3,2);
    expect(rand).toEqual(2);
})

test('a new markov machine will set the chains automatically as a map', function() {
    let mm = new MarkovMachine('a b c a c b b c');
    expect(mm.chains).toEqual(expect.any(Map));
})

test('makeText returns a string of 100 words', function() {
    fs.readFile('./eggs.txt', 'utf8', function(err, data) {
    let text=data;
    let machine = new MarkovMachine(text);
    expect(machine.makeText().length).toEqual(100);
})
})