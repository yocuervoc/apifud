const express = require('express')
const asyncify = require('express-asyncify')
const { QueryTypes } = require('sequelize');

const db = require('./db')
const config = require('./config')

const api = asyncify(express.Router())


api.use(express.json())
api.use(express.urlencoded({ extended: false }))
///

api.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Request-Headers, Access-Control-Request-Method, Origin, X-Requested-With, Content-Type, Accept, DNT, Referer, User-Agent, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

const sequelize = db(config.db)


api.get('/Warehouses', async (req, res, next)=>{
    let arrayWarehouse = []
    try{
        arrayWarehouse = await sequelize.query("SELECT * FROM `warehouse`", { type: QueryTypes.SELECT });
        
    }catch(e){
        return next("errorers", e)
    }
    res.send({arrayWarehouse})

})

// api.post('/createUser', auth(config.auth), async (req, res, next) => {
//     try{
//     let answer = await User.createUser(req.body)
//     res.send({ success: true })
//     }
//     catch(error) {
//         return next(error)
//     }
// })
// /////////////////////
// api.post('/updatepassword/:id', auth(config.auth), async (req, res, next) => {
    
//     try {
//         const { id } = req.params
//         let password = req.body.password || ''
//         let answer = await User.updatePassword(id, password)
//         res.json({
//           success: true
//         })
//       } catch (error) {
//           console.log('error :(')
//       }
    
// })

// api.post('/updateCreditCard/:id', auth(config.auth), async (req, res, next) => {
//     try {
//       const { id } = req.params
//       let credit = req.body.creditCard || ''
//       let answer = await User.updateCreditCard(id, credit)
//       res.json({
//         success: true
//       })
//     } catch (error) {
//         console.log('error :(')
//     }
// });

//////////////////


module.exports = api