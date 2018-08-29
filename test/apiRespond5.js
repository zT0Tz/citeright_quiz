
module.exports = {
    Error: "Request failed with status code 422\n" +
    "    at createError (/Users/zt0tz/GitHub/citeright_quiz/node_modules/axios/lib/core/createError.js:16:15)\n" +
    "at settle (/Users/zt0tz/GitHub/citeright_quiz/node_modules/axios/lib/core/settle.js:18:12)\n" +
    "at IncomingMessage.handleStreamEnd (/Users/zt0tz/GitHub/citeright_quiz/node_modules/axios/lib/adapters/http.js:201:11)\n" +
    "at IncomingMessage.emit (events.js:187:15)\n" +
    "at endReadableNT (_stream_readable.js:1081:12)\n" +
    "at process._tickCallback (internal/process/next_tick.js:63:19)",

    response: {
        status: 422,
        statusText: 'Unprocessable Entity',
        headers: {
            date: 'Tue, 28 Aug 2018 22:16:19 GMT',
            'content-type': 'text/html;charset=utf-8',
            'transfer-encoding': 'chunked',
            connection: 'close',
            'set-cookie': [Array],
            'cache-control': 'public, must-revalidate, max-age=900',
            'last-modified': 'Thu, 09 Feb 2017 00:00:00 GMT',
            vary: 'Origin',
            'expect-ct':
                'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
            server: 'cloudflare',
            'cf-ray': '451a243f4aac5504-ORD' },

        data: { error: 'Invalid base' } }
};
