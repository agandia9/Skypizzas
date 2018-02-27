const pizzasData = new(require('./PizzasData'))

class PizzasLogic{
    listAll(){
        return pizzasData.listAll()
    }
}
module.exports = PizzasLogic