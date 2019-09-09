const program = require('commander');

program
    .command('test')
    .description('Test commands.')
    .action(() => {        
        console.log('command line is working..')
        process.exit(1);
    });    

module.exports = program