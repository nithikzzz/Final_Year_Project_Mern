const express = require('express');
const multer = require('multer');
const { imgup , getAllImages } = require('../controllers/imgController');

const router = express.Router();


const storage = multer.memoryStorage(); 

const upload = multer({ storage: storage });

// route for uploading image
router.post('/img', upload.single('image'), imgup);
router.get('/all', getAllImages);

module.exports = router;
