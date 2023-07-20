const axios = require('axios');

const gold = (req, res) => {
    const url = `https://apis.data.go.kr/1160100/service/GetGeneralProductInfoService/getGoldPriceInfo?serviceKey=N1tWOz4EAkEJu8XqO6CvbW16mucEq9auN%2BMlhssMRJSD%2BMACwOvhthO22tmNJMS8rJN8Nf%2BA6dJ%2BdYiR%2FSJzFA%3D%3D&numOfRows=100&resultType=json`;

    const params = {
        serviceKey: "N1tWOz4EAkEJu8XqO6CvbW16mucEq9auN+MlhssMRJSD+MACwOvhthO22tmNJMS8rJN8Nf+A6dJ+dYiR/SJzFA==",
        pageNo: 1,
        numOfRows: 100,
    };

    axios.get(url, {
        params,
        }).then((response) => {
            console.log(response.data.response.body.items.item);
            // console.log(response.data.response.body.items.item[0]["itmsNm"]);
            res.render('../views/contents/Gold.html', {gold : response.data.response.body.items.item});
    });
}

module.exports = {
    gold,
}