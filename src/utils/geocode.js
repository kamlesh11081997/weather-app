
const request = require('request')
// site : https://account.mapbox.com/
const access_token="pk.eyJ1Ijoia2FtbGVzaDExMDgiLCJhIjoiY2s4dnp5ZzUzMDVqNTNrbzRjcWZpNDl3cCJ9.dXIPZ8bF8i_TnAphozzkdg"

const geocode=(address,callback)=>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token="+access_token
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to fetch the location',undefined)
        }
        else if(response.body.features.length===0){
            callback("Unable to find location",undefined)
        }
        else{
            callback(undefined,{latitude:response.body.features[0].center[0],
                                longitude:response.body.features[0].center[1],
                                location:response.body.features[0].place_name
                            })
        }
    })
}

module.exports=geocode


// geocode("boston",(error,response)=>{
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log(response.latitude+ " "+ response.longitude+" "+response.location)
//     }
// })