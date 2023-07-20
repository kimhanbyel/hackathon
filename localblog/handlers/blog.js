const mysql = require('mysql2');
const mysqlConfig = require('../config/mysql');
const pool = mysql.createPool(mysqlConfig);

const getDate = (d) => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
const getTime = (d) => `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
const getDateTime = (d) => getDate(d) + ' ' + getTime(d);

const blogList = (req, res)=>{
  let sql = `SELECT * From users`;
  pool.query(sql, (err, rows, field)=>{
    if(err) throw err;
    res.render('blog/list.html', { blogs : rows, user : req.session.user, nav : 'blog_list'});
  })  
}

const postList = (req, res)=>{
  let sql = `SELECT * From posts ORDER BY idposts DESC;`;
  pool.query(sql, (err, rows, field)=>{
    if(err) throw err;
    res.render('post/list.html', { posts : rows, user : req.session.user, nav : 'post_list'});
  })  
}

const registration = (req, res)=>{
  if(req.session.user == undefined)
    res.render('auth/signIn.html', {msg : "로그인 하세요"});
  else 
    res.render('post/registration.html', {user : req.session.user});
}

const registrationProcess = (req, res)=>{
  if(req.session.user == undefined)
    res.render('auth/signIn.html', {msg : "로그인 하세요"});
  else {
    let sql = 'INSERT INTO posts (title, content, registrationDate, img, writer, commentCnt, views) ';
        sql += 'VALUES(?, ?, ?, ?, ?, ?, ?)';
    let values = [];
    console.log(req.body);
    if(req.file!== undefined){
      values = [req.body.title, req.body.content, getDateTime(new Date()),
                req.file.filename, req.session.user.nick, 0, 0];
      }
    else{
      values = [req.body.title, req.body.content, getDateTime(new Date()),
                '', req.session.user.nick, 0, 0];
    }
    pool.query(sql, values, (err, rows, field)=>{
      if(err) throw err;
        res.render("index.html", {msg : "글이 등록되었습니다", user : req.session.user}) 
    })
  }
}

const postNum = (req, res)=>{
  let sql = "UPDATE posts SET views = posts.views+1 WHERE idposts=?;";
  let values = [req.params.postNum];
  pool.query(sql, values, (err, rows, field)=>{
    if(err) throw err;
    let sql = "SELECT * FROM posts WHERE idposts=?";
    let values = [req.params.postNum];
    pool.query(sql, values, (err, rows, field)=>{
      if(err) throw err;
      let post_info = rows[0];
      let sql = "SELECT * FROM comment WHERE postId=?";
      let values = [req.params.postNum];
      pool.query(sql, values, (err, rows, field)=>{
        res.render('post/postNum.html', {post : post_info, comments : rows, user : req.session.user, nav : 'post_list', params : req.params.postNum});
      });
    });
  })
}

const postEdit = (req, res) => {
  let sql = `SELECT * From posts WHERE idposts=?`;
  let values = [req.params.postNum];
  pool.query(sql, values,(err, rows, field)=>{
    if(err) throw err;
    console.log(rows[0]);
    res.render('post/edit.html', { post : rows[0], user : req.session.user});
  })  
}

const postEditProcess = (req, res)=>{
  if(req.session.user == undefined)
    res.render('auth/signIn.html', {msg : "로그인 하세요"});
  else {
    let sql = 'UPDATE posts SET title=?, content=?, img=? WHERE idposts = ?;';
    let values = [];
    if(req.file!== undefined){
      values = [req.body.title, req.body.content, req.file.filename, req.params.postNum];
    }
    else{
      values = [req.body.title, req.body.content, '', req.params.postNum];
    }
    pool.query(sql, values, (err, rows, field)=>{
      if(err) throw err;
        res.render("index.html", {msg : "글이 수정되었습니다", user : req.session.user}) 
    })
  }
}

const postDelete = (req, res) => {
  let sql = `DELETE FROM posts WHERE idposts=?;`
  let values = [req.params.postNum];
  pool.query(sql, values, (err, rows, field)=>{
    res.render('index.html', {msg : "글이 삭제되었습니다", user : req.session.user});
  });
}

const blogNum = (req, res)=>{
  let sql = `SELECT * FROM users WHERE users.idUsers=?;`;
  let values = [req.params.blogNum];
  pool.query(sql, values, (err, rows, field)=>{
    if(err) throw err;
    let info_user = rows[0];
    let sql = "SELECT * FROM posts WHERE writer=? ORDER BY idposts DESC;";
    let values = [rows[0].nick];
    pool.query(sql, values, (err, rows, field)=>{
      if(err) throw err;
      let info_posts = rows;
      let sql = `SELECT * FROM playlist WHERE maker = ?`;
      let values = [info_user.nick];
      pool.query(sql, values, (err, rows, field)=>{
        if(err) throw err;
        res.render('blog/blogNum.html', {info: info_user, posts: info_posts, user : req.session.user, nav : 'blog_list', playlists: rows, params : req.params.blogNum});
      })
    })
  })
}

const blogPost = (req, res)=>{
  let sql = `SELECT * FROM users WHERE users.idUsers=?;`;
  let values = [req.params.blogNum];
  pool.query(sql, values, (err, rows, field)=>{
    if(err) throw err;
    let info_user = rows[0];
    let sql = "SELECT * FROM posts WHERE writer=? ORDER BY idposts DESC;";
    let values = [rows[0].nick];
    pool.query(sql, values, (err, rows, field)=>{
      if(err) throw err;
      console.log(info_user, rows);
      res.render('blog/blogPost.html', {info: info_user, posts: rows, user : req.session.user, nav : 'blog_list', params : req.params.blogNum});
    })
  })
}

const comment_registration = (req, res)=>{
  let sql = `INSERT INTO comment (com_nick, com_content, postId) VALUES (?,?,?)`;
  let values = [req.session.user.nick, req.body.comment, req.body.post_id];
  pool.query(sql, values, (err, rows, fields)=>{
    if(err) throw err;
    let sql = `UPDATE posts SET commentCnt = posts.commentCnt+1 WHERE idposts=?;`;
    let values = [req.body.post_id];
    pool.query(sql, values, (err, rows, fields) => {
      res.redirect(`/blog/post/${req.body.post_id}`);
    })
  });
}

module.exports =  {
  blogList,
  postList,
  registration,
  registrationProcess,
  comment_registration,
  postNum,
  postEdit,
  postEditProcess,
  postDelete,
  blogNum,
  blogPost,
}
