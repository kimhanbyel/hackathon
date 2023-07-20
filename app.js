const express = require('express');
const axios = require('axios');
const CoinRouter = require('./routes/Coin');
const StockRouter = require('./routes/Stock');
const GoldRouter = require('./routes/Gold');
const nunjucks = require('nunjucks');
const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
})

app.use(express.json({ type : 'application/json'}));
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
  let temp;
  let comment;

  let API_URL = 'https://api.qwer.pw/request/hangang_temp';

  const params = {
    apikey: 'guest',
  };

  axios.get(API_URL, {
    params,
  }).then((response) => {
    const data = response.data;
    console.log(data[1]);
    console.log(temp = data[1].respond.temp);
  });
  
  console.log(temp);
  API_URL = 'https://api.qwer.pw/request/helpful_text';

  axios.get(API_URL, {
    params,
  }).then((response) => {
    const data = response.data;
    comment = data[1].respond;
    res.render('index.html', {temp : temp, comment : comment});
  });
});
app.use('/Coin', CoinRouter);
app.use('/Gold', GoldRouter);
app.use('/Stock', StockRouter);

app.listen(3000);