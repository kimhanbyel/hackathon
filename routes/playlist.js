const express = require('express');
const router = express.Router();
const playlistHandler = require('../handlers/playlist.js');
const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({ 
      destination(req, file, done) { 
          done(null, 'images/'); 
      },
      filename(req, file, done) { 
          if(file === undefined) throw err;
          const ext = path.extname(file.originalname); 
          done(null, path.basename(file.originalname, ext) + Date.now() + ext); 
      }
  }),
  limits: { fileSize: 1 * 1024 * 1024 } 
});

router.get('/', playlistHandler.list);
router.post('/:listNum/insertProcess', playlistHandler.song_insertProcess);
router.get('/list_registration', playlistHandler.list_registration);
router.post('/list_registrationProcess', upload.single('playlistImg'), playlistHandler.list_registrationProcess);
router.get('/:listNum/insert', playlistHandler.song_insert);
router.get('/:listNum/delete', playlistHandler.list_delete);
router.get('/:listNum/delete/:songNum', playlistHandler.song_delete);
router.get('/:listNum', playlistHandler.listNum);

module.exports = router; 