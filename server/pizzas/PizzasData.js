const fs = require('fs')

class PizzasData{
    constructor(){
        this.pizzas = require('./pizzas.json')
    }
    listAll(){
        return this.pizzas
    }
}
module.exports = PizzasData