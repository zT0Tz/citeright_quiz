console.log('Application is running');


const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');


const currencyExchange = require('./currencyExchange/currencyExchange.js');

const argv = yargs
    .command('quote','input the information and get the value of the base currency amount in the conversion currency')
    .usage('$0 Usage: <command> [options]')
    .option('date', {
            demand: true,
            alias: 'dt',
            describe: 'Get historical rates for any day since 1999.\n' +
            'Format is xxxx(year)-xx(month)-xx(day) ',
            string: true,})
    .option('base', {
            demand: true,
            alias: 'bc',
            describe: 'base currency(currency you hold)',
            string: true,})
    .option('amount', {
            demand: true,
            alias: 'ba',
            describe: 'the amount of base currency you would like to exchange',
            number: true,})
    .option('conversion', {
            demand: true,
            alias: 'cc',
            describe: 'the currency you would like to exchange to',
            string: true,})
    .example('$0 quote --date=2017-06-03 --base=USD --amount=100 --conversion=CAD  //quote on June 3, 2017, how much CAD would USD$100 buy')
    .help()
    .alias('help', 'h')
    .argv;



// console.log(process.argv);
debugger;
// console.log('Yargs',argv);

if(argv.amount<0 || argv.amount>500000000000)
    console.log('Please enter another valid amount');
else
    currencyExchange.handleCurrencyExchange(argv.date, argv.base, argv.amount, argv.conversion);


