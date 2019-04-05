const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/dec8049800b9e072bc0347762522e372/'+latitude+','+longitude

    request({url, json:true},(err,{body})=>{
        if(err){
          callback('Ya Fucked Up Somwhere')
        }else if(body.error){
            console.log(body)
            callback(body.error,undefined)
        }else{
           callback(undefined,{
               temperatureHigh:body.daily.data[0].temperatureHigh,
               temperatureLow:body.daily.data[0].temperatureLow,
               summary: body.daily.data[0].summary,
               temp: body.currently.temperature,
               rainChance: body.currently.precipProbability 
           })
        }
    })
}

//function test
// forecast('71.9876','-156.9834',(err,data)=>{
//     // console.log(data)
// })

module.exports = forecast