let signupForm = document.getElementById("signup-form");
guard();
function passwordMatch(pass1, pass2){
    if(pass1 === pass2) return true;
    return false;
}

function guard(){
    if(localStorage.getItem("currentUser")){
        window.location.href = "/shop";    
    }
}

signupForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(!passwordMatch(signupForm.elements["pass"].value, signupForm.elements["pass2"].value)){
        alert("Password Mismatch");
        return;
    }
    let users = localStorage.getItem("users");
    let teacher = {
        email: signupForm.elements["email"].value, 
        pass: signupForm.elements["pass"].value,
        name: signupForm.elements["name"].value
    }
    if(!users){
        users = [teacher];
    }
    else{
        users = JSON.parse(users);
        users.push(teacher);
    }
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "/login";

})