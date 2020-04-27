const status = require('http-status');

const comptesModel = require('../models/comptes.js');
const userCompteModel = require('../models/usersComptes.js')
const jwt = require('jsonwebtoken');
const has = require('has-keys');
const sequelize = require('../models/database.js')
const {
  QueryTypes
} = require('sequelize');

module.exports = {

  async getCompteById(req, res) {
    if (!has(req.params, 'id'))
      throw {
        code: status.BAD_REQUEST,
        message: 'You must specify the id'
      };

    let {
      id
    } = req.params;

    let data = await comptesModel.findOne({
      where: {
        compteId: id
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

  async getComptesByUserId(req, res) {
    if (!has(req.params, 'id'))
      throw {
        code: status.BAD_REQUEST,
        message: 'You must specify the id'
      };

    let {
      id
    } = req.params;

    const token = req.headers.authorization;
    let result = jwt.verify(token,process.env.SECRET);

    if(result.userId != id){
      throw {
        code: 403,
        message: 'Access Forbidden'
      };
    }


    let data = await sequelize.query('SELECT c.*,u.* from comptes c join usersComptes uc join users u on c.compteId = uc.compteId and c.compteCreateur = u.userId where uc.userId = :userId;', {
      replacements: {
        userId: parseInt(id)
      },
      type: QueryTypes.SELECT
    });

    if (!data)
      throw {
        code: status.BAD_REQUEST,
        message: 'There is no account for this user'
      };

    res.json({
      status: true,
      message: 'Returning accounts',
      data,
    });
  },

  async createAccount(req, res) {
    if (!has(req.body, ['data'])) {
      throw {
        code: status.BAD_REQUEST,
        message: 'You must specify the user informations'
      };
    }
    let data = JSON.parse(req.body['data']);
    console.log(data)
    //Vérifier que le userId existe
    //Vérifier que l'utilisateur n'a pas déjà un compte avec ce nom ?
    let compte = await comptesModel.create({
      compteNom: data.nom,
      compteDescription: data.description,
      compteCreateur: data.userId
    }).catch((error)=>{throw{message:error.toString()}});
    await userCompteModel.create({
      compteId: compte.compteId,
      userId: data.userId
    })
    res.status(200).json({
      status: true,
      compteId: compte.userId,
      message: 'User created'
    });

  },

  async updateAccount(req, res) {
    if (!has(req.body, ['data'])) {
      throw {
        code: status.BAD_REQUEST,
        message: 'You must specify the id, nom and description'
      };
    }
    let id = req.params['id'];
    const token = req.headers.authorization;
    let result = jwt.verify(token,process.env.SECRET);

    if(result.userId != id){
      throw {
        code: 403,
        message: 'Access Forbidden'
      };
    }
    let data = JSON.parse(req.body['data']);
    if (await comptesModel.findOne({
        where: {
          compteId: data.compteId
        }
      }) == null) {
      res.status(400).json({
        status: true,
        message: "Le compte n'existe pas"
      });
    } else {
      await comptesModel.update({
        compteNom: data.compteNom,
        compteDescription: data.compteDescription
      }, {
        where: {
          compteId: data.compteId
        }
      });
    }
    res.status(201).json({
      status: true,
      message: 'Compte updated'
    });
  },

  async deleteAccount(req, res) {
    if (!has(req.params, 'userId') && !has(req.params, 'compteId')) {
      throw {
        code: status.BAD_REQUEST,
        message: 'You must specify informations'
      };
    }

    if (!await userCompteModel.findOne({where: {compteId: req.params['compteId'], userId: req.params['userId']}})) {
      throw {status: false, message: "Le compte que vous demandez n'existe pas"};
    }

    /*  await comptesModel.destroy({
        where: {
          compteId: data.compteId
        }
      });*/
    await userCompteModel.destroy({
      where: {
        compteId: req.params['compteId'],
        userId: req.params['userId']
      }
    });
    res.json({
      status: true,
      message: 'Compte deleted'
    });
  },

    async getShareLink(req,res){
      if (!has(req.body, ['data'])) {
        throw {
          code: status.BAD_REQUEST,
          message: 'You must specify the id, nom and description'
        };
      }
      let data = JSON.parse(req.body['data']);
      const token = req.headers.authorization;
      let result = jwt.verify(token,process.env.SECRET);

      if(result.userId !== data.userId){
        throw {
          code: 403,
          message: 'Access Forbidden'
        };
      }
      if (! await userCompteModel.findOne({where:{compteId:data.compteId, userId:data.userId}})){
        throw {status: false, message: "Le compte que vous demandez n'existe pas"};
      }

      res.json({status:true, token: jwt.sign({ compteId: data.compteId},process.env.SECRET,{expiresIn: 86400})});
    },

    async userShareLink(req,res){
      if (!has(req.body, ['data'])) {
        throw {
          code: status.BAD_REQUEST,
          message: 'You must specify the id, nom and description'
        };
      }
      let data = JSON.parse(req.body['data']);
      let tokenResult;
      try {
        tokenResult= await jwt.verify(data.token, process.env.SECRET);
        }catch(e){
          throw{message:"Code non valide!"}
        }

      if(!await comptesModel.findOne({ where:{ compteId:tokenResult.compteId}})){
        throw {message: 'Le Compte n\'existe pas !'}
      }
      if(await userCompteModel.findOne({ where:{ compteId:tokenResult.compteId, userId:data.userId}})){
        throw {message: 'Compte déjà présent !'}
      }
      await userCompteModel.create({compteId: tokenResult.compteId , userId: data.userId}).catch((error)=>
      {
        throw {message:"Une erreur est survenue !"};
      });

      res.json({status:true});

    }
}
