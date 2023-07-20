const mysql = require('mysql2');
const mysqlConfig = require('../config/mysql');
const pool = mysql.createPool(mysqlConfig);

const index = (req, res, next) => {
  if(req.session.user === undefined)
    res.redirect('/');
  else
    next();
}

const userEdit = (req, res) => {
  let sql = 'SELECT * FROM users WHERE id=?';
  let values = [req.session.user.id]
  pool.query(sql, values, (err, rows, field)=>{
    if (err) throw err;
    res.render('myPage/edit.html', { user : rows[0], nav : 'myPage'} );
  })
}

const userEditProcess = (req, res) => {
  let sql = `SELECT pw FROM users WHERE id = ?`;
  let values = [req.session.user.id];
  pool.query(sql, values, (err, rows, field)=>{
    if(err) throw err;
    if(req.body.userPW === rows[0].pw){
      let sql = `UPDATE users SET nick=?, about=? WHERE id=?`;
      let values = [req.body.userNick, req.body.userAbout, req.session.user.id];
      pool.query(sql, values, (err, field)=>{
        if(err) throw err;
        req.session.user.nick = req.body.userNick;
        res.render('index.html', {user : req.session.user});
      })
    } else {
      res.render('myPage/edit.html', {user : req.session.user, nav : 'myPage'});
    }
  })  
}

module.exports = {
  index,
  userEdit,
  userEditProcess,
}