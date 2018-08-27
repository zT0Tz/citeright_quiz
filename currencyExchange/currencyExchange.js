
const axios = require('axios');





const getExchangeRate = (date, baseCurrency) => {
    const url = `https://api.exchangeratesapi.io/${date}?base=${baseCurrency}`;
    axios.get(url).then((res) => {
        // console.log(res.data);
        if (res.data.details) {
            console.log('Check the input format. you should type something like: --date=2018-03-26')
        }
        else {
            console.log(JSON.stringify(res.data, undefined, 2));
            return res.data.rates;
        }
    }).catch((e) => {
        // console.log(e);
        if (e.code === "ENOTFOUND") {
            console.log('Unable to connect to the server');
        }
        else if (e.response.data.error) {
            const errorMessage = e.response.data.error;
            if (errorMessage === "Not found")
                console.log('Please input a valid date.');
            else if (errorMessage === "Invalid date")
                console.log('Please input a valid date.');
            else if (errorMessage === "Date too old")
                console.log('Date too old, please enter a date after 1999-01-03.');
            else if (errorMessage === "Invalid base")
                console.log('Please input a valid base currency.');
        }
        else console.log('Error occurs, please read instructions.');
    });
};

const roundFun = (value, n) => {
    return Math.round(value*Math.pow(10,n))/Math.pow(10,n);
}

const handleCurrencyExchange = (date, baseCurrency, baseAmount, conversionCurrency ) => {
    const url = `https://api.exchangeratesapi.io/${date}?base=${baseCurrency}`;
    axios.get(url).then((res) => {
        // console.log(res.data);
        if (res.data.details) {
            console.log('Check the input format. you should type something like: --date=2018-03-26')
        }
        else {
            // console.log(JSON.stringify(res.data, undefined, 2));
            const amount = roundFun(baseAmount, 2)
            console.log('amount', amount);
            const respondMessage = {
                date: date,
                base_currency: baseCurrency,
                base_amount: amount,
                conversion_currency: conversionCurrency,
                conversion_amount: 0,
            };
            if(res.data.rates[conversionCurrency]){
                const rate = res.data.rates[conversionCurrency];
                // console.log(rate);
                // const conversionAmount = roundFun((baseAmount * rate), 2);
                respondMessage.conversion_amount = roundFun((baseAmount * rate), 2);
                console.log(JSON.stringify(respondMessage, undefined, 2));
            }
            else console.log('Please input a valid conversion currency')





        }
    }).catch((e) => {
        // console.log(e);
        if (e.code === "ENOTFOUND") {
            console.log('Unable to connect to the server');
        }
        else if (e.response.data.error) {
            const errorMessage = e.response.data.error;
            if (errorMessage === "Not found")
                console.log('Please input a valid date.');
            else if (errorMessage === "Invalid date")
                console.log('Please input a valid date.');
            else if (errorMessage === "Date too old")
                console.log('Date too old, please enter a date after 1999-01-03.');
            else if (errorMessage === "Invalid base")
                console.log('Please input a valid base currency.');
        }
        else console.log('Error occurs, please read instructions.');
    });

};


module.exports = {
    getExchangeRate,
    handleCurrencyExchange,
};
