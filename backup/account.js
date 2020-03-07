var currentUser = {};

if (localStorage.getItem("currentUser")){
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
} 

function accountInfo(){
    
    document.getElementById('account-fName').innerHTML = currentUser.firstName;
    document.getElementById('account-lName').innerHTML = currentUser.lastName;
    document.getElementById('account-phone').innerHTML = currentUser.phone;
    document.getElementById('account-username').innerHTML = currentUser.username;
    if (currentUser.owner){
        document.getElementById('account-type').innerHTML = "Owner";
    } else {
        document.getElementById('account-type').innerHTML = "Coworker";
    }
}
accountInfo();

function signOut(){
    const signout = document.getElementById('signout');

    signout.addEventListener('click', ()=>{
        currentUser = {};
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        console.log(currentUser);
        console.log(JSON.parse(localStorage.getItem('currentUser')));
        // window.location.assign("index.html");
    });
}
signOut();