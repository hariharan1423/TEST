const inputs = document.querySelectorAll("input");

inputs.forEach((input)=>{
    input.addEventListener('keyup',(e)=>{
        Valid(e.target,regex[e.target.attributes.name.value]);
    })
})

const regex = {
    fname:/^\w+$/i,
    lname:/^\w+$/i,
    email:/^\S+@\S+\.\S+$/i,
    phn:/^\d{10}$/,
    city:/^\w+$/i,
    country:/^\w+$/i,
    state:/^\w+$/i,
    zip:/^\d+$/,
}

const Valid = (field,reg) =>{
    if(reg.test(field.value)){
        field.className='Valid';
    }else{
        field.className='Invalid';
    }
}