const status = require('http-status');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users.js');

const has = require('has-keys');


module.exports = {
  async connection(req,res){
    if(!has(req.body,'data')){
      throw{code:HTTP.BAD_REQUEST,message:"You must specify identifiant"};
    }
    let data = JSON.parse(req.body['data']);
    let result = await userModel.findOne({where:{userEmail:data.email,userPassword:data.password}}).catch(()=>{
      throw {code: status.BAD_REQUEST, message:'Une erreur est survenue, réessayez !'};
    });
    if(result == null){
throw  {code: status.BAD_REQUEST, message:'Identifiants incorrects !' }
    }
    const jwtBearerToken = await jwt.sign({userId : result.userId}, process.env.SECRET, {
      expiresIn: 3600
    });
    let user = {id:result.userId,email:result.userEmail,prenom:result.userPrenom,nom:result.userNom};
    res.json({code: true,message: 'Returning users',token : jwtBearerToken,expireAt:3600, user});


  }
}
