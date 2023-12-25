let button = document.querySelector("button").addEventListener("click",(event=>{
    event.preventDefault();
    let UserName = document.querySelector("#name").value;
    let Password = document.querySelector("#password").value;
    let arr = JSON.parse(localStorage.getItem("RegistrationData"));
    let isUserFound = false;
    arr.forEach(LoginData => {
        if(LoginData.UserName == UserName && LoginData.password == Password){
            isUserFound = true
        }
    });
    if (isUserFound) {
        localStorage.setItem('loggedInUser', UserName);
        window.location.href = "./HomePage.html"
    }else{
        alert("Log in Incorrect!");
    }
}))

