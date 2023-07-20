const express = require('express');
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

app.get('/', (req, res) => res.render('index.html',));
app.use('/Coin', CoinRouter);
app.use('/Gold', GoldRouter);
app.use('/Stock', StockRouter);

app.listen(3000);