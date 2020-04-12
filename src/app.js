const path=require('path')
const hbs=require('hbs')
const express=require('express')

// importing the modules
const forecast=require("./utils/forecast")
const geocode=require("./utils/geocode")

const app=express()

// Defining path for express config
const publicDirectoryPath=path.join(__dirname,"../public")
const viewPath=path.join("../templates/views")
const partialPath=path.join("../templates/partials")

app.set("view engine",'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name: "Kamlesh Kumar"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide address!"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({forecast:forecastData,
            location,
        address:req.query.address})
        })
    })
})




app.get("/about",(req,res)=>{
    res.render('about',{
        title:"About Us",
        name:"Kamlesh Kumar"
    })
    
})

app.get("/help",(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Kamlesh Kumar"
    })
    
})


app.get("/lovemeter",(req,res)=>{
    res.render('lovemeter',{
        title:'Love meter',
        name:"Kamlesh Kumar"
    })
})

app.get("/lovemeterCalculator",(req,res)=>{
    const {male,female}=req.query
    console.log(req.query)
    if(!male){
        res.send({error:"You must enter both partner name"});
    }else if(!female){
        res.send({error:"You must enter both partner name"});
    }else{
        if(male.toLowerCase()==="kamlesh" && female.toLowerCase()==="ananya"){
        return res.send({percent:100,male:male,female:female})
        }
        var lmale=male.length
        var lfemale=female.length
        var sum=0
        for(var i=0;i<lmale;i++){
            sum+=male.toLowerCase().charCodeAt(i)
        }
        for(var i=0;i<lfemale;i++){
            sum+=female.toLowerCase().charCodeAt(i);
        }
        sum=sum%100;
        res.send({percent:sum,male:male,female:female})
    }
})

app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})

