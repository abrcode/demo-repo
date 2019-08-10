const request=require('request')
//const chalk=require('chalk')

const geocode=(address,callback)=>{
 
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYXh3b29uYSIsImEiOiJjanlxNWFjNDMxaHYzM2R1d3FsOHBiM3c0In0.5ch9PpDSCy47XJEfeeXgyg'

    request({ url,json:true} ,(error,{body})=>{
    
        if (error) {
               callback('UNABLE TO CONNECT THE LOCATION SERVICE..!',undefined)
         }else if (body.features.length ===0 ) {
             callback('UNABLE TO FIND LOCATION , TRY ANOTHER SEARCH..!',undefined)
         }else {
             callback(undefined,{
               latitude : body.features[0].center[1],
               longitude :body.features[0].center[0],
               location : body.features[0].place_name   
             }) 
            }
  
        })
}

module.exports=geocode