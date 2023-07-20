const axios = require('axios');

const stock = (req, res) => {
    const API_URL = 'https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=L5E2tbtYJXtCbSIS7Jf0qzyvP0juY%2FmlJ3qkbfEHqhHAT74DlcF824RqEH%2Bli8WkX7xKSYw4%2BSqY8rncnu823A%3D%3D&numOfRows=1000&resultType=json';

    const params = {
    serviceKey: 'L5E2tbtYJXtCbSIS7Jf0qzyvP0juY%2FmlJ3qkbfEHqhHAT74DlcF824RqEH%2Bli8WkX7xKSYw4%2BSqY8rncnu823A%3D%3D',
    pageNo: 1,
    numOfRows: 100,
    };

    axios.get(API_URL, {
    params,
    }).then((response) => {
        const market = response.data.response.body.items.item;
        mrktTotAmtSort = market.sort((a, b) => {return b.mrktTotAmt - a.mrktTotAmt});
        res.render('../views/contents/Stock.html', {stock : mrktTotAmtSort})
    });
}

module.exports = {
    stock,
}