const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//define paths
const publicDirectory = path.join(__dirname,'../public')
const viewsDirectory = path.join(__dirname,'../templates/views')
const partialsDirectory = path.join(__dirname,'../templates/partials')
//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)
//setup static public directory
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather Nutz',
        name:'Fishboy'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Your Mama'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg:'This is a funky little help message',
        title:'Tpoui Hil'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return  res.send({
            errmsg:'Please Provide Address'
        })
    }

    const sAddress = req.query.address
    geocode(sAddress,(err,{latitude,longitude,location}={})=>{
        if(err){
            return res.send({
                errmsg:err
            })
        }
        forecast(latitude,longitude,(err,{temperatureHigh, temperatureLow, summary,temp,rainChance})=>{
            if(err){
                return res.send({
                    errmsg:err
                })
            }
            const sForecast = summary + ' Today has a high temperature of ' + temp + ' degrees and ' + rainChance + '% chance of rain. The Hi will be '+temperatureHigh+' degrees and the Lo of '+temperatureLow+' degrees'
            res.send({
                location:location,
                weather:sForecast
            })
        })
    })
 

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            errmsg:'You Gotta Search for Something'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        msg:'Help Article Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        msg:'Page Not Found'
    })
})


app.listen(port,()=>{
    console.log('Server Fucntional Port '+port)
})