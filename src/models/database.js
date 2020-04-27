
const {
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD
} = process.env;


process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DB_DATABASEURL,
 {   dialect: "postgres",  dialectOptions: {
        ssl: true
    },  protocol: "postgres",   port: 5432,   logging: true //false
});

module.exports = db;
