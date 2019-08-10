
// console.log('This is client side javascript file is loaded..!')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
 
//      response.json().then((data)=>{
//        console.log(data)
//      })
   
// })




const weatherForm=document.querySelector('form')
const searchElement=document.querySelector('input')
const messageOne=document.querySelector('#m1')
const messageTwo=document.querySelector('#m2')

// messageOne.textContent='From JAVASCRIPT'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=searchElement.value

// rendering the message foe both paragraph
     messageOne.textContent='Loading..!'
     messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
   
        response.json().then((data)=>{
       
          if(data.error){
           // console.log(data.error)
          messageOne.textContent=data.error 
        }else{
        //    console.log(data.location)
        //    console.log(data.forecast)
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
          }        
        })
      })
 })