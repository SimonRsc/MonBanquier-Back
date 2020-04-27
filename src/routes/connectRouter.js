const express = require('express');
const router = express.Router();
const user = require('../controllers/user')

const connect = require('../controllers/connect.js');


router.post('',connect.connection);
router.post('/new',user.createUser);

module.exports = router;
