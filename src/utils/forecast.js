// destructring  and shorthand
//const chalk=require('chalk')
const request=require('request')

const forecast=(latitude,longitude,callback)=>{

    const url='https://api.darksky.net/forecast/a765fd81f3ec623e2fbf8f97d5df3843/'+ latitude+','+longitude
  
    request({url,json:true},(error,{body})=>{
    
      if(error){
            callback('unable to connect weather dervice..!',undefined)
      }
      else if(body.error)
      {
            callback('unable to find location',undefined)
      }else{
            callback(undefined,body.daily.data[0].summary +' It is currently '+body.currently.temperature+' degree out and there is '+body.currently.precipProbability+' %  chance of rain')
      }
    })


}

module.exports=forecast