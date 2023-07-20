const mysql = require('mysql2');
const mysqlConfig = require('../mysql');
const pool = mysql.createPool(mysqlConfig);

let Youtube = require('youtube-node');
let youtube = new Youtube();

const list = (req, res)=>{
  let sql = `SELECT * FROM playlist`;
  pool.query(sql, (err, rows, field)=>{
    if(err) throw err;
    res.render('playlist/list.html', { playlists : rows, user : req.session.user});
  })  
}

const listNum = (req, res)=>{
  let sql = "UPDATE playlist SET views = playlist.views+1 WHERE idplaylist=?;";
  let values = [req.params.listNum];
  pool.query(sql, values, (err, rows, field)=>{
    if(err) throw err;
    let sql = `SELECT * FROM playlist WHERE idplaylist = ?`;
    let values = [req.params.listNum]
    pool.query(sql,values, (err, rows, field)=>{
      if(err) throw err;
      let info_playlist = rows[0];
      let sql = `SELECT * FROM song WHERE playlistId = ?`;
      let values = [req.params.listNum]
      pool.query(sql, values, (err, rows, field)=>{
        if(err) throw err;
        res.render('playlist/listNum.html', { playlist : info_playlist, songs : rows, user : req.session.user, params : req.params.listNum});
      })
    });
  });
}

const list_registration = (req, res)=>{
  if(req.session.user == undefined)
    res.render('auth/signIn.html', {msg : "로그인 하세요"});
  else{
    let sql = `SELECT * From playlist`;
    pool.query(sql, (err, rows, field)=>{
      if(err) throw err;
      res.render('playlist/listRegistration.html', { user : req.session.user});
    })  
  }
}

const list_registrationProcess = (req, res)=>{
  console.log(req.body);

  if(req.session.user == undefined)
    res.render('auth/signIn.html', {msg : "로그인 하세요"});
  else {
    let sql = 'INSERT INTO playlist (title, maker, img, views, count)';
        sql += 'VALUES(?, ?, ?, ?, ?)';
    let values = [];
    if(req.file!== undefined){
      values = [req.body.title, req.session.user.nick, req.file.filename, 0, 0];
      }
    else{
      values = [req.body.title, req.session.user.nick, '', 0, 0];
    }
    pool.query(sql, values, (err, rows, field)=>{
      if(err) throw err;
        res.render("index.html", {msg : "플레이리스트가 만들어졌습니다", user : req.session.user}) 
    })
  }
}

const list_delete = (req, res)=>{
  let sql = `DELETE FROM playlist WHERE idplaylist=?;`
  let values = [req.params.listNum];
  pool.query(sql, values, (err, rows, field)=>{
    res.render('index.html', {msg : "플레이리스트가 삭제되었습니다", user : req.session.user});
  });
}

const song_insert = (req, res)=>{
  if(req.session.user == undefined)
    res.render('auth/signIn.html', {msg : "로그인 하세요"});
  else 
    res.render('playlist/insert.html', {user : req.session.user, params : req.params.listNum});
}

const song_insertProcess = (req, res)=>{
  // console.log(req.body)
  let word = req.body.title + req.body.singer;
  let limit = 1;

  youtube.setKey('AIzaSyBNkPoyEMoiVStAzg5Xyy5d3_mSE50EzZ8');
  youtube.addParam('order', 'relevance'); // 평점 순으로 정렬
  youtube.addParam('regionCode', 'kr'); // 한국으로 지정 
  youtube.addParam('type', 'video');   // 타입 지정

  youtube.search(word, limit, function (err, result) { // 검색 실행
    if (err) { console.log(err); return; } // 에러일 경우 에러공지하고 빠져나감

    console.log(JSON.stringify(result, null, 1)); // 받아온 전체 리스트 출력
    let item = result["items"]; // 결과 중 items 항목만 가져옴
    
    let title = item[0]["snippet"]["title"];
    let video_id = item[0]["id"]["videoId"];

    let sql = 'INSERT INTO song (title, link, playlistId)';
        sql += 'VALUES(?, ?, ?)';
    let values = [title, video_id, req.body.playlistNum];
    pool.query(sql, values, (err, rows, field)=>{
      if(err) throw err;
      console.log('곡이 추가됌')

      let sql = "UPDATE playlist SET count = playlist.count+1 WHERE idplaylist=?;";
      let values = [req.body.playlistNum];
      pool.query(sql, values, (err, rows, field) => {
        if(err) throw err;
        res.render('index.html', {msg : '플레이리스트에 곡이 추가되었습니다', user : req.session.user});
      })
    })
  });
}

const song_delete = (req, res)=>{
  let sql = `SELECT * From playlist`;
  pool.query(sql, (err, rows, field)=>{
    if(err) throw err;
    res.render('blog/list.html', { blogs : rows, user : req.session.user, nav : 'blog_list'});
  })  
}

module.exports =  {
  list,
  list_registration,
  list_registrationProcess,
  list_delete,
  listNum,
  song_delete,
  song_insert,
  song_insertProcess,
}
