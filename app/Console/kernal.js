#!/usr/bin/env node

const program = require('commander');
const test = require('./commands/test');

program.version('1.0.1');
program.description('SR Marketplace command line interface');
program.test;



program.parse(process.argv);
program.on('command:*', function () {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});