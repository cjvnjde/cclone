#!/usr/bin/env node

const ccopy = require('..');
const [from, to] = process.argv.slice(2);

if (!from || !to) {
  console.log('Usage: ccopy <from> <to> <pattern>');
} else {
  ccopy(from, to, function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    process.exit(0);
  });
}
