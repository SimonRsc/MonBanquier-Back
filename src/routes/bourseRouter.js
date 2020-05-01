const express = require('express');
const router = express.Router();


const bourse = require('../controllers/bourse.js');


router.get('/composition/:userId', bourse.getStockByUserId);
router.post('/stock', bourse.createStock);
router.delete('/stock/:stockId', bourse.deleteStock)

module.exports = router;
