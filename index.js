#!/usr/bin/env node

'use strict';

const program = require('commander');
const pkg = require('./package.json');
const glob = require('glob');
const lib = require('./lib');

program
    .version(pkg.version)
    .usage('[options] <images glob pattern>')
    .description(pkg.description)
    .arguments('<pattern>')
    .option('-s, --size <percentage>', 'New size for the placeholder, in percentage', 1, parseInt)
    .option('-o, --output <path>', 'Path for the output json', './placeholders.json')
    .parse(process.argv);

if (!program.args.length) {
    return program.help();
}

const throwError = err => {
    console.error('something went wrong while trying to glob!');
    console.error(err);
    process.exit(1);
};

glob(program.args[0], (err, files) => {
    if (err) {
        throwError(err);
    }

    lib.generatePlaceholders(files, program.size)
        .then(placeholders => {
            console.log(placeholders);
            process.exit();
        })
        .catch(throwError);
});

// console.log(program.size);
// console.log(program.output);
// console.log(program.args);