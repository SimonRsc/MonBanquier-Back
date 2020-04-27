const express = require('express');
const router = express.Router();


const op = require('../controllers/operation.js');


router.get('/:id', op.getOperationFromAccount);
router.post('/:id',op.createOperation);
router.delete('/:id',op.deleteOperation);


module.exports = router;
