const loveform=document.querySelector('form')
const male=document.querySelector('#male')
const female=document.querySelector('#female')
const loveResult=document.querySelector('#love-result')


loveform.addEventListener('submit',(e)=>{
    e.preventDefault();
    fetch("http://localhost:3000/lovemeterCalculator?male="+male.value+"&female="+female.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                loveResult.textContent=data.error
                
            }else{
                loveResult.innerHTML="<marquee>Congratulations:</marquee> "+'<br/>' +"Love between "+ "<b>"+ data.male+"</b> and "+ "<b>"+data.female+"</b> is: "+data.percent+"%"
                console.log(data.male+" "+data.female)
            }
        })
    })
   
})