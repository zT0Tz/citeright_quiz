# Exchange Rate App

This is an application written with node.js for quoting historic currency exchange rates.


##Set Up

download here or in your terminal(Command Line), run

`git clone https://github.com/zT0Tz/citeright_quiz.git`

then install dependencies we need running

`npm install`


##Usage

a sample of how to use this app


```
node app.js quote --date=2017-02-09 --base=ZAR --amount=132 --conversion=TRY


Application is running...

Quote success, here is you reslut:
{
  "date": "2017-02-09",
  "base_currency": "ZAR",
  "base_amount": 132,
  "conversion_currency": "TRY",
  "conversion_amount": 36.35148
}
```

you should use the command 'quote' and following the 4 necessary parameter 'date, base, amount and conversion'.

To show help, use command --help or -h

```
➜  citeright_quiz git:(master) ✗ node app.js -h

Application is running...

Usage: <command> [options]

Commands:
  app.js quote  Input the information and get the value of the base currency
                amount in the conversion currency

Options:
  --version           Show version number                              [boolean]
  --date, --dt        Get historical rates for any day since 1999.
                      Format is xxxx(year)-xx(month)-xx(day) [string] [required]
  --base, --bc        Base currency(currency you hold)       [string] [required]
  --amount, --ba      Amount of base currency you would like to exchange,
                      You can input any number between 0 and 500000000000,
                      and only 2 decimals in most will be kept.
                                                             [number] [required]
  --conversion, --cc  Currency you would like to exchange to [string] [required]
  --help, -h          Show help                                        [boolean]

Examples:
  app.js quote --date=2017-06-03 --base=USD --amount=100 --conversion=CAD
  //quote on June 3, 2017, how much CAD would USD$100 buy
```


#TEST

###Unit Test
simply run `npm -test`, the test will carry out



###Integration Test
The following test is run on my mac, and I'm using node.js version 10.8.0

Incorrect input data will cause quote to fail and error message will return, some of the situations are here:

Invalid date:

```
node app.js quote --date=2000-00-00 --base=ZAR --amount=132 --conversion=TR

Application is running...


Quote fail:
Please input a valid date.
```
```
node app.js quote --date=1900-01-01 --base=ZAR --amount=132 --conversion=TR

Application is running...


Quote fail:
Date too old, please enter a date after 1999-01-03.
```
Invalid currency input  
```
node app.js quote --date=2017-02-09 --base=WRONG --amount=132 --conversion=TR

Application is running...


Quote fail:
Please input a valid base currency.
```
```
node app.js quote --date=2017-02-09 --base=ZAR --amount=100 --conversion=WRONG

Application is running...


Quote fail:
Please input a valid conversion currency
```
Invalid amount number (should more than 0 and no more than 500000000000)
```
node app.js quote --date=2017-02-09 --base=ZAR --amount=abc --conversion=TRY

Application is running...


Quote fail:
Please enter another valid amount
```
```
node app.js quote --date=2017-02-09 --base=ZAR --amount=-100 --conversion=TRY

Application is running...


Quote fail:
Please enter another valid amount
```


