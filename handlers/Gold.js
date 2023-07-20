const axios = require('axios');

const API_URL = `https://apis.data.go.kr/1160100/service/GetGeneralProductInfoService/getGoldPriceInfo?serviceKey=N1tWOz4EAkEJu8XqO6CvbW16mucEq9auN%2BMlhssMRJSD%2BMACwOvhthO22tmNJMS8rJN8Nf%2BA6dJ%2BdYiR%2FSJzFA%3D%3D&pageNo=1&numOfRows=12&resultType=json`;

const params = {
    serviceKey: 'N1tWOz4EAkEJu8XqO6CvbW16mucEq9auN+MlhssMRJSD+MACwOvhthO22tmNJMS8rJN8Nf+A6dJ+dYiR/SJzFA==',
    pageNo: 1,
    numOfRows: 10,
    stockCode: '005930'
};

axios.get(API_URL, {
    params,
}).then((response) => {
    const data = response.data;

    console.log(data);
});