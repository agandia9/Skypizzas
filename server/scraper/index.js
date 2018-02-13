const express = require('express')
const request = require('request')
const cheerio = require ('cheerio')

const scraperRouter = express.Router()

scraperRouter.route('/')
.get((req, res)=>{
    
    const url = 'https://www.dominospizza.es/carta-de-pizzas'
    try {
        request(url, function(error, response, html ){
            if(error) throw error

            const $ = cheerio.load(html)

            //let names = ingredients = images = []
            const pizzasRaw = []
            const pizzasFiltered = []
            
            $('#CartaPizzas').filter(function(){
                $(this).find('.PizzaContent').each(function(index,item){
                    $(this).find('.pizza-detail').filter(function(index, item){
                        pizzasRaw.push(item.children[1].children[0].data)
                        pizzasRaw.push(item.children[3].children[0].data)
                    })
                    $(this).find('img').filter(function(index,item){
                        pizzasRaw.push('http:' + item.attribs.src)
                    })
                })
            })
            for(let i=0; i<pizzasRaw.length; i+=3){
                if(pizzasRaw[i].toLowerCase() !== "margarita" && pizzasRaw[i].toLowerCase() !== "elige por mitades"){
                    pizzasFiltered.push({
                        name: pizzasRaw[i],
                        ingredients: pizzasRaw[i+1],
                        image: pizzasRaw[i+2]
                    })
                }
            }
            res.json({
                status: 'OK',
                message: 'Pizzas scrapped successfully',
                data:  pizzasFiltered
            })
            
        })    
    } catch (e) {
        console.error(e.message)
    }  
})

module.exports = scraperRouter