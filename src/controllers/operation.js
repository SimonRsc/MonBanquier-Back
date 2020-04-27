const status = require('http-status');

const operationModel = require('../models/operations.js')
const comptesModel = require('../models/comptes.js')
const budgetModel = require('../models/budget.js')
const has = require('has-keys');
const sequelize = require('../models/database.js')

module.exports = {

async createOperation(req,res){
  if(!has(req.params,'id') & !has(req.body,'data')){
    throw {code: status.BAD_REQUEST, message: 'You must specify the id'};
  }
  let id = req.params['id'];
  if(! await budgetModel.findOne({where:{budgetId:id}})){
    throw {code: status.BAD_REQUEST, message: 'Le budget n\'existe pas'};
  }
  let data = JSON.parse(req.body['data']);
  let date = new Date();
  const month = date.getMonth()+1;
  date = date.getFullYear()+"-"+month+"-"+date.getDate();

  await operationModel.create({opDate:date,opUserId:data.userId,opBudgetId:id,opMontant:data.montant,opDescription:data.description});
  res.json({status: true,message: 'Operation added'});
},

async getOperationFromAccount(req,res){
  if(!has(req.params,'id')){
    throw {code: status.BAD_REQUEST, message: 'You must specify the id'};
  }
  let id = req.params['id'];
  console.log(id);
  if(!await comptesModel.findOne({where:{compteId:id}})){
    throw {code: status.BAD_REQUEST, message: 'Le budget n\'existe pas'};
  }
  let data = await operationModel.findAll({where:{opBudgetId:id}});
  res.json({operations : data});
},

async deleteOperation(req,res){
  if(!has(req.params,'id')){
    throw {code: status.BAD_REQUEST, message: 'You must specify the id'};
  }
  let id = req.params['id'];
  await operationModel.destroy({where:{opId:id}});
  res.json({status: true,message: 'Operation removed'});
}
}
