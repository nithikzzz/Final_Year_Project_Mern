const express = require('express');
const {getdel,upload,credata}= require('../controllers/delController')



const router = express.Router();


//insert
router.post('/', upload.array('files', 2),credata);

// displaying

router.get('/', getdel);

module.exports = router;