
const axios = require('axios');



//the function that deals the round-off of the value
const roundFun = (value, n) => {
    return Math.round(value*Math.pow(10,n))/Math.pow(10,n);
};


//the function that deals the multiple of the float number
// (because javascript cannot do multiple properly)
function floatMultiple(value1,value2)
{
    let m=0,s1=value1.toString(),s2=value2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}


//the main function to do currency exchange, receive four parameters, and print out the result
const handleCurrencyExchange = (date, baseCurrency, baseAmount, conversionCurrency, callback) => {
    //check if the input amount is within the valid range
    if (baseAmount  && baseAmount>0 && baseAmount<=500000000000) {
        //fetch data from API
        const url = `https://api.exchangeratesapi.io/${date}?base=${baseCurrency}`;
        return axios.get(url).then((res ) => {

            // console.log('res.data',res.data);
            //check input format
            //one occasion is that type space before date, API does not return error or data
            if (res.data.details) {
                callback('Check the input format. you should type something like: --date=2018-03-26')
            }
            else {
                // console.log(JSON.stringify(res.data, undefined, 2));
                //let input keep no more than 2 decimals
                const amount = roundFun(baseAmount, 2);
                // console.log('amount', amount);
                const respondMessage = {
                    date: date,
                    base_currency: baseCurrency,
                    base_amount: amount,
                    conversion_currency: conversionCurrency,
                    conversion_amount: 0,
                };

                //check if input the valid conversion currency
                if(res.data.rates[conversionCurrency]){
                    const rate = res.data.rates[conversionCurrency];
                    // console.log('rate',rate);
                    respondMessage.conversion_amount = floatMultiple(rate, amount);
                    // callback(undefined, respondMessage);
                    callback(undefined, respondMessage);
                    return respondMessage
                }
                else callback('Please input a valid conversion currency')

            }

            //different error situation
        }).catch((e) => {
            // console.log(e);
            if (e.error === "Not found")
                callback('Please input a valid date.');
            else if (e.error === "Invalid date")
                callback('Please input a valid date.');
            else if (e.error === "Date too old")
                callback('Date too old, please enter a date after 1999-01-03.');
            else if (e.error=== "Invalid base")
                callback('Please input a valid base currency.');
            else if (e.code === "ENOTFOUND") {
                callback('Unable to connect to the server');
            }

            // else if (e.response.data.error) {
            //     const errorMessage = e.response.data.error;
            //     console.log('errorMessage',errorMessage);
            //     if (errorMessage === "Not found")
            //         callback('Please input a valid date.');
            //     else if (errorMessage === "Invalid date")
            //         callback('Please input a valid date.');
            //     else if (errorMessage === "Date too old")
            //         callback('Date too old, please enter a date after 1999-01-03.');
            //     else if (errorMessage === "Invalid base")
            //         callback('Please input a valid base currency.');
            // }
            // else callback('Error occurs, please read instructions.');
            else  {
                try {
                    const errorMessage = e.response.data.error;
                    // console.log('errorMessage',errorMessage);
                    if (errorMessage === "Not found")
                        callback('Please input a valid date.');
                    else if (errorMessage === "Invalid date")
                        callback('Please input a valid date.');
                    else if (errorMessage === "Date too old")
                        callback('Date too old, please enter a date after 1999-01-03.');
                    else if (errorMessage === "Invalid base")
                        callback('Please input a valid base currency.');
                }
                catch (err) {
                    // console.log(err);
                    callback('Error occurs, please read instructions.');
                }
            }
        });
    }
    else  callback('Please enter another valid amount');
};


module.exports = {
    handleCurrencyExchange,
};
