const express = require('express');
const router = express.Router();
const blogHandler = require('../handlers/blog.js');
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

router.get('/', (req, res)=>{ res.send('상품정보 도메인')});
router.get('/blog_list', blogHandler.blogList);
router.get('/blog_list/:blogNum', blogHandler.blogNum)
router.get('/blog_list/:blogNum/post', blogHandler.blogPost)
router.get('/post_list', blogHandler.postList);
router.get('/post_registration', blogHandler.registration);
router.post('/post_registrationProcess', upload.single('postImg'), blogHandler.registrationProcess);
router.post('/post/comment_registration', blogHandler.comment_registration)
router.get('/post/:postNum', blogHandler.postNum);
router.get('/post/:postNum/edit', blogHandler.postEdit);
router.post('/post/:postNum/editProcess', upload.single('postImg'), blogHandler.postEditProcess);
router.get('/post/:postNum/delete', blogHandler.postDelete);

module.exports = router;


