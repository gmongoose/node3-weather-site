console.log('loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value.trim()

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    
    const url = 'http://localhost:3000/weather?address='+location
    fetch(url).then((res)=>{
    res.json().then((data)=>{
        msg1.textContent = ''
        if(data.errmsg){
            console.log(data.errmsg)
            msg2.textContent = data.errmsg
        }else{
            console.log(data.location)
            console.log(data.weather)
            msg1.textContent = data.location
            msg2.textContent = data.weather
        }
        
    })
})
    // console.log(location)
})