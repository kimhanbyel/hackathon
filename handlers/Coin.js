let request = require('request');
let options = {
    'method': 'GET',
    'url': "https://api.coinpaprika.com/v1/tickers?quotes=KRW"
};

const print = (req, res) => {
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        let info = JSON.parse(body).slice(0, 100);
        console.log(info[0]);
        res.render('main/coin.html', {coins: info});
    });
}

module.exports = {
    print,
}