const express = require('express');
const router = express.Router();


const bud = require('../controllers/budget.js');


router.get('/models/:id', bud.getModelBudgetFromAccount);
router.get('/:id', bud.getAllBudgetFromAccount);
router.put('',bud.updateBudget);
router.post('/:id',bud.createBudget);
router.delete('/:id',bud.deleteBudget);


module.exports = router;
