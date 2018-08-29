console.log('\nApplication is running...\n');

const _ = require('lodash');
const yargs = require('yargs');

const currencyExchange = require('./currencyExchange/currencyExchange.js');

//set user input and instructions
const argv = yargs
    .command('quote','Input the information and get the value of the base currency amount in the conversion currency')
    .usage('$0 Usage: <command> [options]')
    .option('date', {
            demand: true,
            alias: 'dt',
            describe: 'Get historical rates for any day since 1999.\n' +
            'Format is xxxx(year)-xx(month)-xx(day)',
            string: true,})
    .option('base', {
            demand: true,
            alias: 'bc',
            describe: 'Base currency(currency you hold)',
            string: true,})
    .option('amount', {
            demand: true,
            alias: 'ba',
            describe: 'Amount of base currency you would like to exchange,\n' +
            'You can input any number between 0 and 500000000000,\n' +
            'and only 2 decimals in most will be kept.',
            number: true,})
    .option('conversion', {
            demand: true,
            alias: 'cc',
            describe: 'Currency you would like to exchange to',
            string: true,})
    .example('$0 quote --date=2017-06-03 --base=USD --amount=100 --conversion=CAD  //quote on June 3, 2017, how much CAD would USD$100 buy')
    .help()
    .alias('help', 'h')
    .argv;



//call currencyExchange application and print the result
currencyExchange.handleCurrencyExchange(argv.date, argv.base, argv.amount, argv.conversion, (err, res) => {
    if (err) {
        console.log('\nQuote fail:');
        console.log(err);
    }
    else {
        console.log('\nQuote success, here is you reslut:');
        console.log(JSON.stringify(res, undefined, 2));
    }
});


