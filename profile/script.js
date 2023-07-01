let changePasswordForm = document.getElementById("change-password-form");
let output = document.getElementById("output");
guard();
let teacher = {}; 
function fetchUser(){
    let user = JSON.parse(localStorage.getItem("currentUser"));
    teacher = user;
    document.getElementById("name").value = user.name;
    output.innerHTML = `
        Hii, ${user.email}, use the below form to update your profile.</p>
    `;
}
fetchUser();

function passwordMatch(pass1, pass2){
    if(pass1 === pass2) return true;
    return false;
}

function guard(){
    if(!localStorage.getItem("currentUser")){
        window.location.href = "/login";    
    }
}

function logout(){
    localStorage.removeItem("currentUser");
    // redirect to login page
    window.location.href = "/login";
} 


changePasswordForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(!passwordMatch(changePasswordForm.elements["passNew"].value, changePasswordForm.elements["passNew2"].value)){
        alert("Password Mismatch");
        return;
    }
    let users = JSON.parse(localStorage.getItem("users"));
    users.forEach(element => {
        if(element.email === teacher.email){
            if(element.pass === changePasswordForm.elements["passOld"].value){
                element["pass"] = changePasswordForm.elements["passNew"].value;
                element["name"] = changePasswordForm.elements["name"].value;
                localStorage.setItem("users", JSON.stringify(users));
                logout();
                // redirect to login page
            }
        }
    });
    // wrong password

})

