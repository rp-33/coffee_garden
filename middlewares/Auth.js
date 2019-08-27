'use strict';

let serviceToken = require('../services/token.js');

module.exports = (req,res,next) => {

    if(!req.headers.authorization) return res.status(403).send({message : 'No tienes autorización'});
    const token = req.headers.authorization.split(' ')[1];//realizamos el Bearer para obtener el token
    serviceToken.decode(token)
    .then(response =>{
        req.user = response.id; //guardamos el usuario 
        next();//pasamos al siguiente middlewares
    })
    .catch(error =>{
        res.status(error.status).send({message : error.message})
    })

   
}
