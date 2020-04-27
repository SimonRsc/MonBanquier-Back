const status = require('http-status');

const budgetModel = require('../models/budget.js')
const operationModel = require('../models/operations.js')
const comptesModel = require('../models/comptes.js')
const has = require('has-keys');
const sequelize = require('../models/database.js')

module.exports = {

    async createBudget(req, res) {
        if (!has(req.params, 'id') & !has(req.body, 'data')) {
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};
        }
        let id = req.params['id'];
        if (!await comptesModel.findOne({where: {compteId: id}})) {
            throw {code: status.BAD_REQUEST, message: 'Le compte n\'existe pas'};
        }
        let data = JSON.parse(req.body['data']);
        let date = new Date();
        const month = date.getMonth() + 1;
        date = date.getFullYear() + "-" + month + "-" + date.getDate();
        if (data.model == null) {
            data.model = false;
        }
        await budgetModel.create({
            budgetNom: data.nom,
            budgetDate: date,
            budgetUserId: data.userId,
            budgetCompteId: id,
            budgetMontant: data.montant,
            budgetModel: data.model
        });
        res.json({status: true, message: 'Operation added'});
    },

    async getAllBudgetFromAccount(req, res) {
        if (!has(req.params, 'id')) {
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};
        }
        let id = req.params['id'];
        if (!await comptesModel.findOne({where: {compteId: id}})) {
            throw {code: status.BAD_REQUEST, message: 'Le budget n\'existe pas'};
        }
        let data = await budgetModel.findAll({where: {budgetCompteId: id, budgetModel: false}, order: ['budgetNom']});
        let result = []

        for (let budget of data) {
            budget = budget.dataValues;
            let tmp = await operationModel.findAll({
                where: {opBudgetId: budget.budgetId},
                order: [['opMontant', 'DESC']]
            })
            budget.operations = tmp;
            result.push(budget)
        }
        res.json({budgets: result});
    },

    async getModelBudgetFromAccount(req, res) {
        if (!has(req.params, 'id')) {
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};
        }
        let id = req.params['id'];
        if (!await comptesModel.findOne({where: {compteId: id}})) {
            throw {code: status.BAD_REQUEST, message: 'Le budget n\'existe pas'};
        }
        let data = await budgetModel.findAll({where: {budgetCompteId: id, budgetModel: true}});
        res.json(data);

    },

    async deleteBudget(req, res) {
        if (!has(req.params, 'id')) {
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};
        }
        let id = req.params['id'];
        await budgetModel.destroy({where: {budgetId: id}});
        res.json({status: true, message: 'Operation removed'});
    },

    async updateBudget(req, res) {
        if (!has(req.body, 'data')) {
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};
        }
        let data = JSON.parse(req.body['data']);

        if (!await budgetModel.findOne({where: {budgetId: data.budgetId}})) {
            throw {code: status.BAD_REQUEST, message: 'Le budget n\'existe pas'};
        }


        await budgetModel.update({
            budgetNom: data.nom,
            budgetMontant: data.montant
        }, {
            where: {
                budgetId: data.budgetId
            }
        });
        res.json({status: true, message: 'Budget modifié'});
    }
}
