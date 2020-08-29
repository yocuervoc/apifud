module.exports = function setupWarehouses (WarehousesModel){

    async function findWarehouseById(id){
        return WarehousesModel.findByPk(id)
    }

    // async function createUser(user) {
    //     const result = await WarehousesModel.create(user)
    //     return result.toJSON()
    // }

    // async function updatePassword(id, passw) { 
    //   let user = await WarehousesModel.findByPk(id)
    //   let updated = await user.update({password: passw})
    //   return updated
    // }

    // async function updateCreditCard(id, creditcard) { 
    //     let user = await WarehousesModel.findByPk(id)
    //     let updated =await user.update({creditCard: creditcard})
    //     return updated
    // }

    async function findAllWarehouses() {
      return WarehousesModel.findAll()
    }

    return {
        findWarehouseById,
        // createUser,
        // updateCreditCard,
        // updatePassword,
        findAllWarehouses
    }
}