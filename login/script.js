let loginForm = document.getElementById("login-form");
let error = document.getElementById("error");
guard();

function generateToken() {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let result = '';
    for ( var i = 0; i < 16; i++ ) {
       result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
 }

 function guard(){
    if(localStorage.getItem("currentUser")){
        window.location.href = "/shop";    
    }
}

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    error.innerHTML = "";
    let users = JSON.parse(localStorage.getItem("users"));
    users.forEach(element => {
        if(element.email === loginForm.elements["email"].value && element.pass === loginForm.elements["pass"].value){
            let currentUser = element;
            currentUser["token"] = generateToken();
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            // redirect to login page
            window.location.href = "/shop";
        }
    });
    error.innerHTML = "<small class='text-danger'>Authentication Failed</small>";
    //for  wrong password

})
