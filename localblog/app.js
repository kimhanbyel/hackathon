const express = require('express');
const session = require('express-session');
const authRouter = require('./routes/auth');
const myPageRouter = require('./routes/myPage');
const blogRouter = require('./routes/blog');
const playlistRouter = require('./routes/playlist');
const sessionConfig = require('./config/session');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
})

app.use('/static/', express.static(path.join(__dirname, 'images')));
app.use(session(sessionConfig));
app.use(express.json({ type : 'application/json'}));
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => res.render('index.html', {user : req.session.user}));
app.get('/aris', (req, res) => res.render('myPage/aris.html'))
app.use('/auth', authRouter); 
app.use('/myPage', myPageRouter);
app.use('/blog', blogRouter);
app.use('/playlist', playlistRouter);
// app.use('/guide', guideRouter);
app.listen(3000);