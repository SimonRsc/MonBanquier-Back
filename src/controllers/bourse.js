const status = require('http-status');
const jwt = require('jsonwebtoken');

const bourseModel = require('../models/stock.js')
const has = require('has-keys');
const sequelize = require('../models/database.js')

module.exports = {

    async createStock(req, res) {
        if ( !has(req.body, 'data')) {
            throw {code: status.BAD_REQUEST, message: 'You must data'};
        }
        let data = JSON.parse(req.body['data']);
        const token = req.headers.authorization;
        const result = await jwt.verify(token,process.env.SECRET);
        if(result.userId != data.userId){
            throw {message: 'Access Forbidden'};
        }

        await bourseModel.create({
            stockCode: data.code,
            stockPru: data.pru,
            stockQte: data.qte,
            stockBuyingDate: data.date,
            stockUserId: data.userId,
        });
        res.json({status: true, message: 'Stock line added'});
    },

    async getStockByUserId(req, res) {
        if (!has(req.params, 'userId')) {
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};
        }
        let id = req.params['userId'];
        const token = req.headers.authorization;
        const result = await jwt.verify(token,process.env.SECRET);
        if(result.userId != id){
            throw {message: 'Access Forbidden'};
        }
        let data = await bourseModel.findAll({where: {stockUserId:id}, order: ['stockCode']});
        res.json({stock: data});
    },


    async deleteStock(req, res) {
        if (!has(req.params, 'stockId')) {
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};
        }
        let id = req.params['stockId'];
        const token = req.headers.authorization;
        const result = await jwt.verify(token,process.env.SECRET);
        await bourseModel.destroy({where: {stockId: id, stockUserId: result.userId}});
        res.json({status: true, message: 'Stock removed'});
    },


}
