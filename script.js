function guard(){
    if(localStorage.getItem("currentUser")){
        window.location.href = "/shop";    
    }
}
guard();