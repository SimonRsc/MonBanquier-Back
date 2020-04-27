const status = require('http-status');

const userModel = require('../models/users.js');
const comptesModel = require('../models/comptes.js');
const userCompteModel = require('../models/usersComptes.js')
const budgetModel = require('../models/budget.js')

const has = require('has-keys');


module.exports = {
    async getUserById(req, res) {
        if (!has(req.params, 'id'))
            throw {
                code: status.BAD_REQUEST,
                message: 'You must specify the id'
            };

        let {
            id
        } = req.params;

        let data = await userModel.findOne({
            where: {
                userId: id
            }
        });

        if (!data)
            throw {
                code: status.BAD_REQUEST,
                message: 'User not found'
            };

        res.json({
            status: true,
            message: 'Returning user',
            data
        });
    },

    async createUser(req, res) {
        if (!has(req.body, 'data'))
            throw {
                code: status.BAD_REQUEST,
                message: 'You must specify the name and email'
            };

        let data = JSON.parse(req.body['data']);
        const oldUser = await userModel.findOne({where: {userEmail: data.email}}).catch(()=>{  throw {message: 'Une erreur est survenue, réessayez!'};});
        console.log(oldUser)
        if (oldUser != null) {

            throw {code: status.BAD_REQUEST, message: 'L\'adresse mail est déjà utilisée !'};
        }
        let user = await userModel.create({
            userNom: data.nom,
            userPrenom: data.prenom,
            userEmail: data.email,
            userPassword: data.password,
            userImage: data.image
        }).catch(() => {
            throw {message: 'Une erreur est survenue, réessayez!'};
        });

        let compte = await comptesModel.create({
            compteNom: "Mon premier Compte",
            compteDescription: "Bientôt milliardaire !",
            compteCreateur: user.userId
        });



        await userCompteModel.create({
            compteId: compte.compteId,
            userId: user.userId
        })
        let date = new Date();
        const month = date.getMonth() + 1;
        date = date.getFullYear() + "-" + month + "-" + date.getDate();
       await budgetModel.create({
            budgetNom: "Yatch",
            budgetDate: date,
            budgetUserId: user.userId,
            budgetCompteId: compte.compteId,
            budgetMontant: 1000000,
            budgetModel: false
        });

        res.json({
            status: true,
            message: 'User Added'
        });
    },

    async updateUser(req, res) {
        if (!has(req.body, 'data') && !has(req.param, 'id'))
            throw {
                code: status.BAD_REQUEST,
                message: 'You must specify the id, name and email'
            };

        let data = JSON.parse(req.body['data']);
        let id = req.param['id'];
        if (await userModel.findOne({where: {userId: id}}) == null) {
            res.status(400).json({status: true, message: "Le compte n'existe pas"});
        }

        await userModel.update({
            userNom: data.nom,
            userPrenom: data.prenom,
            userEmail: data.email,
            userPassword: data.password,
            userImage: data.image
        }, {where: {userId: id}});


        res.json({
            status: true,
            message: 'User updated'
        });
    },

    async deleteUser(req, res) {
        if (!has(req.params, 'id'))
            throw {
                code: status.BAD_REQUEST,
                message: 'You must specify the id'
            };

        let {
            id
        } = req.params;

        await userModel.destroy({
            where: {
                userId: id
            }
        });

        res.json({
            status: true,
            message: 'User deleted'
        });
    }

}
