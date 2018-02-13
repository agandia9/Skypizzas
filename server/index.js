const express = require('express')
const fs = require('fs')
const request = require('request')
const cheerio = require ('cheerio')

const app = express()

app.get('/scrape',function(req, res){
    
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
                        pizzasRaw.push(item.attribs.src.substring(2))
                    })
                })
            })
            for(let i=0; i<pizzasRaw.length; i+=3){
                pizzasFiltered.push({
                    name: pizzasRaw[i],
                    ingredients: pizzasRaw[i+1],
                    image: pizzasRaw[i+2],
                })
            }
            fs.writeFile('output.json', JSON.stringify(pizzasFiltered, null, 4), function(err){

                console.log('File successfully written! - Check your project directory for the output.json file');
            
            })
        
            res.send('Check your console!')
            
        })    
    } catch (e) {
        console.error(e.message)
    }  
})

app.listen('8080')

console.log('Magic on port 8080')

exports= module.exports = app