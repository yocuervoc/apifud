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



const Warehouse = WarehouseSetup(WarehouseModel(sequelize), WarehouseDescriptionModel(sequelize))
const WarehouseDescription = WarehouseDescriptionSetup(WarehouseDescriptionModel(sequelize))

const api = asyncify(express.Router())


api.use(express.json())
api.use(express.urlencoded({ extended: false }))


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

/**
* @swagger
* /api/warehouses:
*   get:
*     tags:
*       - warehouse
*     name: warehouses
*     summary: return all warehouses
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: found all warehouse successfully
*/
api.get('/warehouses', async (req, res, next)=>{
    let arrayWarehouse = []
    try{
        arrayWarehouse = await Warehouse.findAllWarehouses()
        
    }catch(e){
        return next("error", e)
    }
    res.send({arrayWarehouse})
    
})
/**
* @swagger
* /api/warehouse/{id}:
*   get:
*     tags:
*       - warehouse
*     name: warehouses
*     summary: get warehouses by id
*     consumes:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         schema:
*           type: object
*           properties:
*             id:
*               type: integer
*         required:
*           - id
*     responses:
*       200:
*         description: warehouse found successfully
*/
api.get('/warehouse/:id', async (req, res, next)=>{
    const {id}  = req.params //cambiar
    let warehouse 
    try{
        warehouse = await Warehouse.findWarehouseById(id)
    }catch(e){
        return next("error", e)
    }
    res.send({warehouse})
})

/**
* @swagger
* /api/createWarehouse:
*   post:
*     tags:
*       - warehouse
*     name: warehouses
*     summary: create a new warehouse 
*     consumes:
*       - application/json
*     parameters:
*       - name: 
*           name
*           headquarters_number
*         in: body
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*             headquarters_number:
*               type: string
*             description:
*               type: array
*               items:
*                 type: object
*                 properties:
*                     phone:
*                         type: string
*                     address:
*                         type: string
*                     city:
*                         type: string
*         required:
*           name
*           headquarters_number
*     responses:
*       200:
*         description: create a Warehouse successfully
*/
api.post('/createWarehouse', async (req, res, next) => {
    try{
    let answer = await Warehouse.createWarehouse(req.body)
    res.send({ success: true })
    }
    catch(error) {
        return next(error)
    }
})
/**
* @swagger
* /api/updateWarehouse:
*   put:
*     tags:
*       - warehouse
*     name: warehouses
*     summary: update a  warehouse by id
*     consumes:
*       - application/json
*     parameters:
*       - name: 
*           warehouse_id
*           name
*           headquarters_number
*         in: body
*         schema:
*           type: object
*           properties:
*             warehouse_id:
*               type: integer
*             name:
*               type: string
*             headquarters_number:
*               type: string
*         required:
*           warehouse_id
*           name
*           headquarters_number
*     responses:
*       200:
*         description: Warehouse updated successfully
*/
api.put('/updateWarehouse', async (req, res, next) => {    
    try {
        let answer = await Warehouse.updateWarehouse(req.body)
        answer == 0 ? res.status(404).send("id not found") : res.json({success: true})
      } catch (error) {
          console.log('error : ', error)
      }
    
})
/**
* @swagger
* /api/deleteWarehouse:
*   delete:
*     tags:
*       - warehouse
*     name: warehouses
*     summary: delete a warehouse by id
*     consumes:
*       - application/json
*     parameters:
*       - name: 
*           warehouse_id
*         in: body
*         schema:
*           type: object
*           properties:
*             warehouse_id:
*               type: integer
*         required:
*           warehouse_id
*     responses:
*       200:
*         description: Warehouse deleted successfully
*/
api.delete('/deleteWarehouse', async (req, res, next) => {
    try {
      let answer = await Warehouse.deleteWarehouse(req.body)
      answer == 0 ? res.status(404).send("id not found") : res.json({success: true})
    } catch (error) {
        console.log('error')
    }
});
//////warehouseDescription endpoints

/**
* @swagger
* /api/warehouseDescription:
*   get:
*     tags:
*       - warehouseDescription
*     name: warehouses
*     summary: return all warehouseDescriptions
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: found all warehouseDescription successfully
*/
api.get('/warehouseDescription', async (req, res, next)=>{
    let arrayWarehouseDescriptions = []
    try{
        arrayWarehouseDescriptions = await WarehouseDescription.findAllWarehouseDescriptions()
        
    }catch(e){
        return next("error", e)
    }
    res.send({arrayWarehouseDescriptions})    
})

/**
* @swagger
* /api/warehouseDescription/{id}:
*   get:
*     tags:
*       - warehouseDescription
*     name: warehouseDescription
*     summary: get warehouseDescription by id
*     consumes:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         schema:
*           type: object
*           properties:
*             id:
*               type: integer
*         required:
*           - id
*     responses:
*       200:
*         description: warehouseDescription found successfully
*/
api.get('/warehouseDescription/:id', async (req, res, next)=>{
    const {id}  = req.params //cambiar
    let warehouse 
    try{
        warehouse = await WarehouseDescription.findWarehouseDescriptionById(id)
    }catch(e){
        return next("error", e)
    }
    res.send({warehouse})
})

/**
* @swagger
* /api/createWarehouseDescription:
*   post:
*     tags:
*       - warehouseDescription
*     name: warehouseDescription
*     summary: create a new warehouseDescription 
*     consumes:
*       - application/json
*     parameters:
*       - name: 
*           warehouse_id
*           phone
*           address
*           city
*         in: body
*         schema:
*           type: object
*           properties:
*             warehouse_id:
*               type: integer
*             phone:
*               type: integer
*             address:
*               type: string
*             city:
*               type: string
*         required:
*           phone
*           address
*           city
*     responses:
*       200:
*         description: create a create warehouseDescription successfully
*/
api.post('/createWarehouseDescription', async (req, res, next) => {
    try{
    let answer = await WarehouseDescription.createWarehouseDescription(req.body)
    res.send({ success: true })
    }
    catch(error) {
        return next(error)
    }
})
/**
* @swagger
* /api/updateWarehouseDescription:
*   put:
*     tags:
*       - warehouseDescription
*     name: warehouseDescription
*     summary: update a warehouseDescription by id
*     consumes:
*       - application/json
*     parameters:
*       - name: 
*           id
*           warehouse_id
*           phone
*           address
*           city
*         in: body
*         schema:
*           type: object
*           properties:
*             id:
*               type: integer
*             warehouse_id:
*               type: integer
*             phone:
*               type: integer
*             address:
*               type: string
*             city:
*               type: string
*         required:
*           warehouse_id
*           phone
*           address
*           city
*     responses:
*       200:
*         description: warehouseDescription updated successfully
*/   
api.put('/updateWarehouseDescription', async (req, res, next) => {    
    try {
        let answer = await WarehouseDescription.updateWarehouseDescription(req.body)
        answer == 0 ? res.status(404).send("id not found") : res.json({success: true})
      } catch (error) {
          console.log('error : ', error)
      }
    
})
/**
* @swagger
* /api/deleteWarehouseDescription:
*   delete:
*     tags:
*       - warehouseDescription
*     name: warehouseDescription
*     summary: delete a warehouseDescription by id
*     consumes:
*       - application/json
*     parameters:
*       - name: 
*           id
*         in: body
*         schema:
*           type: object
*           properties:
*             id:
*               type: integer
*         required:
*           id
*     responses:
*       200:
*         description: warehouseDescription deleted successfully
*/
api.delete('/deleteWarehouseDescription', async (req, res, next) => {
    try {
      let answer = await WarehouseDescription.deleteWarehouseDescription(req.body)
      answer == 0 ? res.status(404).send("id not found") : res.json({success: true})
    } catch (error) {
        console.log('error')
    }
});

module.exports = api