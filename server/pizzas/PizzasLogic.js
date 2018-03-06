const pizzasData = new(require('./PizzasData'))

class PizzasLogic{
    listAll(){
        return pizzasData.listAll()
    }
    listOnlyNames(){
        return extractNames(pizzasData.listAll())
    }
}

function extractNames(pizzas){
    const namesPizzas ={}
    for(let i=0; i<pizzas.length; i++){
        namesPizzas[pizzas[i].name.toLowerCase()] = []
    }
    return namesPizzas
}

module.exports = PizzasLogic