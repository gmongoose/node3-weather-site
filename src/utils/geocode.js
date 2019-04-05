const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ21vbmdvb3NlIiwiYSI6ImNqdHVhMm1sZTFjMzA0ZXBlemJ0M2h5M2cifQ.anSu6FJERhiFigBi-NwDng&limit=1'

    request({url, json:true},(err,{body})=>{
        if(err){
            callback('Bad Fucking Connection')
        }else if(body.features.length === 0){
            callback('Where the Fuck is that')
        }else {
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
