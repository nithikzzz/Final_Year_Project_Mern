const express = require('express')
const router = express.Router();

const {login , logout,gett,del} = require('../controllers/logincontroller')

router.post('/login',login)
router.post('/logout',logout)
router.get('/get',gett)
//deleting
router.delete('/del/:id', del)
module.exports = router;