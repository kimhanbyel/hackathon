const express = require('express');
const router = express.Router();
const authHandler = require('../handlers/auth.js');
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({ 
        destination(req, file, done) { 
            done(null, 'images/'); 
        },
        filename(req, file, done) { 
            const ext = path.extname(file.originalname); 
            done(null, path.basename(file.originalname, ext) + Date.now() + ext); 
        }
    }),
    limits: { fileSize: 1 * 1024 * 1024 } 
  });

router.get('/signIn', (req, res)=>{ res.render('auth/signIn.html');});
router.post('/signInProcess', authHandler.signInProcess);

router.get('/signUp', (req, res)=>{res.render('auth/signUp.html');});
router.post('/signUpProcess', upload.single('userImg'), authHandler.signUpProcess);

router.get('/signOut', authHandler.signOut);


module.exports = router;