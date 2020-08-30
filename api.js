const express = require('express')
const asyncify = require('express-asyncify')

// const Warehouses = require('./lib/warehouses')
// const Warehouses2 = require('./model/warehouse')

const db = require('./db')
const config = require('./config')
const sequelize = db(config.db)

const WarehouseSetup = require('./lib/warehouses')
const WarehouseModel = require('./model/warehouse')


const WarehouseDescriptionSetup = require('./lib/warehouseDescription')
const WarehouseDescriptionModel = require('./model/warehouseDescription')



const Warehouse = WarehouseSetup(WarehouseModel(sequelize))
const WarehouseDescription = WarehouseDescriptionSetup(WarehouseDescriptionModel(sequelize))

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


api.get('/warehouses', async (req, res, next)=>{
    let arrayWarehouse = []
    try{
        arrayWarehouse = await Warehouse.findAllWarehouses()
        console.log(arrayWarehouse)
    }catch(e){
        return next("error", e)
    }
    res.send({arrayWarehouse})
    
})

api.get('/warehouse/:id', async (req, res, next)=>{
    const {id}  = req.params
    console.log("idddd  ", id)
    let warehouse 
    try{
        warehouse = await Warehouse.findWarehouseById(id)
    }catch(e){
        return next("error", e)
    }
    res.send({warehouse})

})

api.post('/createWarehouse', async (req, res, next) => {
    try{
    let answer = await Warehouse.createWarehouse(req.body)
    res.send({ success: true })
    }
    catch(error) {
        return next(error)
    }
})

api.put('/updateWarehouse', async (req, res, next) => {    
    try {
        let answer = await Warehouse.updateWarehouse(req.body)
        res.json({
          success: true
        })
      } catch (error) {
          console.log('error : ', error)
      }
    
})

api.delete('/deleteWarehouse', async (req, res, next) => {
    try {
      let answer = await Warehouse.deleteWarehouse(req.body)
      res.json({
        success: true
      })
    } catch (error) {
        console.log('error')
    }
});
//////warehouseDescription endpoints
api.get('/warehouseDescription', async (req, res, next)=>{
    let arrayWarehouseDescriptions = []
    try{
        arrayWarehouseDescriptions = await WarehouseDescription.findAllWarehouseDescriptions()
        console.log(arrayWarehouseDescriptions)
    }catch(e){
        return next("error", e)
    }
    res.send({arrayWarehouseDescriptions})    
})

api.get('/warehouseDescription/:id', async (req, res, next)=>{
    const {id}  = req.params
    console.log("idddd  ", id)
    let warehouse 
    try{
        warehouse = await WarehouseDescription.findWarehouseDescriptionById(id)
    }catch(e){
        return next("error", e)
    }
    res.send({warehouse})
})
api.post('/createWarehouseDescription', async (req, res, next) => {
    try{
    let answer = await WarehouseDescription.createWarehouseDescription(req.body)
    res.send({ success: true })
    }
    catch(error) {
        return next(error)
    }
})
api.put('/updateWarehouseDescription', async (req, res, next) => {    
    try {
        let answer = await WarehouseDescription.updateWarehouseDescription(req.body)
        res.json({
          success: true
        })
      } catch (error) {
          console.log('error : ', error)
      }
    
})

api.delete('/deleteWarehouseDescription', async (req, res, next) => {
    try {
      let answer = await WarehouseDescription.deleteWarehouseDescription(req.body)
      res.json({
        success: true
      })
    } catch (error) {
        console.log('error')
    }
});

module.exports = api