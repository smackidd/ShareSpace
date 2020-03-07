


function storeData(user){
    const userStorage = JSON.stringify(user);
    localStorage.setItem("user", userStorage);
}
// wipe out data by uncommenting the code below
// var user = [];
// storeData(user);


function retrieveData(){
    user = JSON.parse(localStorage.getItem("user"));
    return user;
}

function validate(userArray, fname, lname, phone, username, password){
    let valid = true;
    const owner = document.getElementById('owner');
    const coworker = document.getElementById('coworker');
    //matching default values
    if (fname == "First Name" || lname == "Last Name" || phone == "Phone 123-456-7890" || username == "email" || password == "password"){
        valid = false;
        document.getElementById('invalid-home').innerHTML = "Please enter new info!";
    //empty fields
    } else if (fname == "" || lname == "" || phone == "" || username == "" || password == ""){
        valid = false;
        document.getElementById('invalid-home').innerHTML = "Please enter valid info!";
    //active radio buttons?
    } else if (!owner.checked && !coworker.checked){
        valid = false;
        document.getElementById('invalid-home').innerHTML = "Please choose Owner or Coworker";
    }
    // phone is valid
    
    //matching username
    
    

    //length of strings
    return valid;
}


let buttonPush = ()=> {
    if (localStorage.getItem("user")){
        var user = retrieveData();
    } else {
        var user = [];
    }
    console.log(user);

    const cancelButton = document.getElementById('btn-cancel-home');
    const createButton = document.getElementById('btn-create-home');

    cancelButton.addEventListener('click', ()=>{
        document.getElementById('fName').value = "First Name";
        document.getElementById('lName').value = "Last Name";
        document.getElementById('phone').value = "Phone 123-456-7890";
        document.getElementById('username').value = "email";
        document.getElementById('password').value = "password";
        document.getElementById('invalid-home').innerHTML = "";
    });
    
    createButton.addEventListener('click', ()=>{
        const fname = document.getElementById('fName').value;
        const lname = document.getElementById('lName').value;
        const phone = document.getElementById('phone').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const owner = document.getElementById('owner');
            // userid is derived by dividing the number of attributes in the object by
            // the user array length
        const userid = Math.round(user.length / 7);
        const isValid = validate(user, fname, lname, phone, username, password);
        if (isValid){
            user.push(fname);
            user.push(lname);
            user.push(phone);
            user.push(username);
            user.push(password);
            user.push(owner.checked);
            user.push(userid);
            storeData(user);
            //currentUser object
            const currentUser = {firstName: fname, 
                                lastName: lname,
                                phone: phone,
                                username: username,
                                password: password,
                                owner: owner.checked,
                                userid: userid,  };
            //store currentUser object
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            //go to Listings page
            window.location.assign("listings.html");
        }
    });
    
}

buttonPush();
// console.log(user);


