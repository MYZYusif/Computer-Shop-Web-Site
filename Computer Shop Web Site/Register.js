let form = document.querySelector("form");
let inputs = document.querySelectorAll("input");
let button = document.querySelector("button");

inputs.forEach(input=>{
    input.addEventListener("keyup",()=>{
        let trueMessage = input.nextElementSibling;
        let falseMessage = input.nextElementSibling.nextElementSibling;
        if (input.checkValidity()) {
            trueMessage.style.display = "block";
            falseMessage.style.display = "none"
        }else{
            trueMessage.style.display = "none";
            falseMessage.style.display = "block"
        }
    });
    
})

button.addEventListener("click",(event)=>{
    event.preventDefault
    if(form.checkValidity()){
        AddNewUser()
        form.reset()
        window.location.href = "./login.html"
    }else{
        alert("Register Incorrect!")
    }
}
)

function checkUserFromStorage() {
    let RegistrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    return RegistrationData
}

function AddNewUser() {
    let newUser = {};
    inputs.forEach(input => {
        newUser[input.name]= input.value;
    })
    let RegistrationData = checkUserFromStorage();
    RegistrationData.push(newUser);
    localStorage.setItem("RegistrationData", JSON.stringify(RegistrationData));
}

function goBack() {
    window.history.back();
  }