const Sequelize = require('sequelize');

const db = require('./database.js');


const budgets = db.define('budgets', {
  budgetId: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  budgetNom:{
    type : Sequelize.STRING,
    allowNull:false
  },
  budgetDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  budgetUserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'userId'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  budgetCompteId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'comptes',
      key: 'compteId'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  budgetMontant: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  budgetModel:{
    type:Sequelize.BOOLEAN,
    allowNull:false,
    defaultValue:false
  }
})


module.exports = budgets;
