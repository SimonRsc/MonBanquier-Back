const router = require('express').Router();
const jwt = require('jsonwebtoken');
//App Router
router.use('/connect',require('./connectRouter'));

router.use('/api',(req,res, next)=>{
    const token = req.headers.authorization;
        let result = jwt.verify(token,process.env.SECRET);
        if(result != undefined){
            next();
        }

});
router.use('/api/comptes',require('./comptesRouter'));
router.use('/api/users',require('./userRouter'));
router.use('/api/operations',require('./operationRouter'));
router.use('/api/budgets',require('./budgetsRouter'));
router.use('/api/bourse', require('./bourseRouter'));

module.exports = router;
