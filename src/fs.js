const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const port=process.env.PORT || 3000

//const chalk=require('chalk')
// app.com
// app.com/help
// app.com/about
// console.log(__dirname)
// //console.log(__filename) 
// console.log(path.join(__dirname,'../public'))   
const app=express()


//define paths for express config
const publicDirectorypath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

//setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialpath)

//setup static directory to serve
app.use(express.static(publicDirectorypath))

//  app.get('',(req,res)=>{
   
//      res.send('<h1>WEATHER..!</h1>')

//  })

//  app.get('/help',(req,res)=>{


//     res.send([{
//         name: 'Aniket'
//     },{name :'Vishal'},
// {
//     name:'Parth'
// }])

// })

// app.get('/about',(req,res)=>{
   
//     res.send('<h1>Page About...!</h1>')

// })

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name :'Aniket rao'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name : 'ANIKET RAO B'
    })
})

app.get('/help',(req,res)=>{
  
  res.render('help',{
    helptext:'WE ARE HERE FOR YOUR HELP',
    title:'help ',
       name:'ANIKET B RAO'
    })
})
//express route handler
app.get('/Weather',(req,res)=>{
  if(!req.query.address)
  {
   return   res.send({
           error :'Address Must Be Required..!'
      })
//    return res.send('Address Must Be Provided..!')
  }
       geocode(req.query.address, (error,{latitude,longitude,location}={})=>{  //distructring // default function param
          if(error){
              return res.send({error}) //shorthand
          }      

          forecast(latitude,longitude,(error,forecastData)=>{
              if(error){
              return res.send({error})
               }

              res.send({
                  forecast:forecastData,
                  location,
                  address : req.query.address
              })

          })
       })

     
 //console.log(req.query.address) 
//    res.send({
//         forecast:'Its Raining there',
//        location : 'India',
//         // address :[]
//         address: req.query.address 
//   })
})

app.get('/products',(req,res)=>{
  
   if(!req.query.search){
     return  res.send({
           error:'You Must Provide Search There..!'
       })
   }

    console.log(req.query.search)
    res.send({
    //products:[req.query.search]
     products :[]
})
})

app.get('/help/*',(req,res)=>{
   
    res.render('404',{
        title:'404',
        name:'ANIKET',
        error:'help article not found'
    })
})     

app.get('*',(req,res)=>{
   res.render('404',{
       title:'404',
       name:'ANIKET',
       error:'PAGE NOT FOUND'
   })
})

 app.listen(port,()=>{
     console.log('SERVER IS UP ON PORT'+ port)
 })