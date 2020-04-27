const express = require('express');
const router = express.Router();


const user = require('../controllers/user.js');


router.get('/:id', user.getUserById);

router.post('',user.createUser);

//router.delete('/:id', user.deleteUser);


module.exports = router;
