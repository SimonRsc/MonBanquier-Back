const express = require('express');
const router = express.Router();


const comptes = require('../controllers/comptes.js');


router.get('/user/:id',comptes.getComptesByUserId);
router.get('/:id', comptes.getCompteById);
router.post('/share/get',comptes.getShareLink);
router.post('/share/use',comptes.userShareLink);
router.post('',comptes.createAccount);
router.put('/:id',comptes.updateAccount)
router.delete('/:userId/:compteId',comptes.deleteAccount);


module.exports = router;
