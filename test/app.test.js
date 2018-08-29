

const expect = require('chai').expect;
const nock = require('nock');

const handleCurrencyExchange = require('../currencyExchange/currencyExchange.js').handleCurrencyExchange;
const apiRespond4 = require('./apiRespond4');
const apiRespond5 = require('./apiRespond5');

const mockApi = nock('https://api.exchangeratesapi.io/');

const apiRes1 = {'rates': {'CAD': 0.97853}};
const resMessage1 = {
    "date": "2011-06-03",
    "base_currency": "USD",
    "base_amount": 100,
    "conversion_currency": "CAD",
    "conversion_amount": 97.853
};
const apiRes2 = {rates: {'SEK': 13.482}};
const resMessage2 = {
    "date": "2007-07-12",
    "base_currency": "GBP",
    "base_amount": 303,
    "conversion_currency": "SEK",
    "conversion_amount": 4085.046
};
const apiRes3 = {rates: {"PLN": 4.402}};
const resMessage3 = {
    "date": "2004-08-07",
    "base_currency": "EUR",
    "base_amount": 5,
    "conversion_currency": "PLN",
    "conversion_amount": 22.01
};
const apiRes4 = {rates: {"TRY": 0.27539}};
const resMessage4 = {
    "date": "2017-02-09",
    "base_currency": "ZAR",
    "base_amount": 132,
    "conversion_currency": "TRY",
    "conversion_amount": 36.35148
};
const aipRes5 = {error: 'Invalid base'};

describe ('UnitTest1 for handleExchangeCurrency', () => {
    beforeEach(() => {
        mockApi.get('/2011-06-03?base=USD')
            .reply(200, apiRes1);
    });
    it(`should return respond message:
        {
            "date": "2011-06-03",
            "base_currency": "USD",
            "base_amount": 100,
            "conversion_currency": "CAD",
            "conversion_amount": 97.853
        }`, () => {
        return handleCurrencyExchange("2011-06-03", "USD", 100, 'CAD', (e, r) => {

        })
            .then(
                (res) => {
                    // console.log(res);
                    expect(res).to.equal('resMessage1');
                    }
            )
            .catch(err => err)
    })
});

describe ('UnitTest2 for handleExchangeCurrency', () => {
    beforeEach(() => {
        mockApi.get('/2007-07-12?base=GBP')
            .reply(200, apiRes2);
    });
    it(`should return respond message:
        {
            "date": "2007-07-12",
            "base_currency": "GBP",
            "base_amount": 303,
            "conversion_currency": "SEK",
            "conversion_amount": 4085.046
        }`, () => {
        handleCurrencyExchange("2007-07-12", 'GBP', 303, 'SEK', (e, r) => {})
        .then(res => {
            expect(JSON.stringify(res)).to.equal(JSON.stringify(resMessage2));
        })
        .catch(err => err)

    })
});

describe ('UnitTest3 for handleExchangeCurrency', () => {
    beforeEach(() => {
        mockApi.get('/2004-08-07?base=EUR')
            .reply(200, apiRes3);
    });
    it(`should return respond message:
        {
            "date": "2004-08-07",
            "base_currency": "EUR",
            "base_amount": 5,
            "conversion_currency": "PLN",
            "conversion_amount": 22.01
        }`, () => {
        handleCurrencyExchange("2004-08-07", 'EUR', 5, 'PLN', (e,r) => {
            // console.log(r);
             expect(JSON.stringify(r)).to.equal(JSON.stringify(resMessage3));
        })
            .then(res => res)
            .catch(err => err)
    })
});

describe ('UnitTest4 for handleExchangeCurrency', () => {
    beforeEach(() => {
        mockApi.get('/2017-02-09?base=ZAR')
            .reply(200, apiRespond4);
    });
    it(`should return respond message:
        {
            "date": "2017-02-09",
            "base_currency": "ZAR",
            "base_amount": 132,
            "conversion_currency": "TRY",
            "conversion_amount": 36.35148
        }`, () => {
        handleCurrencyExchange("2017-02-09", 'ZAR', 132, 'TRY', (e,r) => {
            expect(JSON.stringify(r)).to.equal(JSON.stringify(resMessage4));
        })
            .then(res => res)
            .catch(err => err)
    })
});


describe ('UnitTest5 for handleExchangeCurrency', () => {
    beforeEach(() => {
        mockApi.get('/2017-02-09?base=ZA')
            .replyWithError(aipRes5);
    });
    it(`input wrong data, should return respond message:
        Please input a valid base currency.`, () => {
        handleCurrencyExchange("2017-02-09", 'ZA', 132, 'TRY', (em,rm) => {
            console.log(em);
            expect(em).to.equal('lalaPlease input a valid base currency.');
        })
            .then(res => res)
            .catch(err => err)
    })
});
