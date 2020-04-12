const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url="https://api.darksky.net/forecast/d75408f5df4f43b5428f198fb4938d24/"+latitude+","+longitude
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect",undefined)
        }
        else if(response.body.error){
            callback("Unable to find location data","undefined")
        }
        else{
            callback(undefined,response.body.daily.data[0])
        }
    })
}

module.exports=forecast