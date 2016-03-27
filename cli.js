#!/usr/bin/env node
const argv = require('yargs').argv;
const generate = require('./src/generate');


if (argv.help) {
  return help();
}

generate({
  directory: argv.dir,
  patterns: argv.patterns,
  output: argv.output
});

function help() {
  console.log(`
  Usage: bem-coverage [options]

  Reports the BEM coverage of your SASS/CSS files.

  Options:

  --dir={dirname}           Sets the directory to be scanned. Defaults to the current directory.
  --patterns={patterns}     Sets the CSS extensions to look for. Accepts a comma separated value. Defaults to scss,css.
  --output={dirname}        Sets the directory output for the report. Defaults to stdout.
`);
}
