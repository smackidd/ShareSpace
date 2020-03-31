const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');



const urlencodedParser = bodyParser.urlencoded({ extended: false })



// console.log('hello');
let user_data = {
    users: [{
        newID: 0,
    }],
    currentUser: [{}],
    workspacesAll: [{
        newID: 0
    }],
    rentedWorkspaces: [{}],
};
const file_location = './user_data.json'
if (fs.existsSync(file_location)) {
    mydata = fs.readFileSync(file_location);
    user_data = JSON.parse(mydata);
}
//// console.log("signIn: ", user_data);


router.post('/signInCheck', urlencodedParser, (req,res) => {
    // console.log("you have pushed a button");
    function validate(username, password){
        let valid = true;
        //matching default values
        if (username == "email" || password == "password"){
            valid = false;
            res.send("Please enter new info!");
            
        //empty fields
        } else if (username == "" || password == ""){
            valid = false;
            res.send("Please enter valid info!");
            
        }
        //matching username and password
        user_data.users.forEach((user) => {
            // console.log(password);
            // console.log(user.password);
            if (username == user.username && password == user.password){
                valid = true;
                console.log("I am here");
                const currentUser = user;
                user_data.currentUser[0] = currentUser;
                let data = JSON.stringify(user_data, null, 2);
                fs.writeFile(file_location, data, ()=> console.log('succesfully wrote to user_data.json'));
                res.redirect("http://localhost:3030/listings");
            } else {
                valid = false;
            }
        });

        if (valid == false){
            res.send("username or password not found!");
        }
        
        
        return valid;
    }
    
    // let buttonPush = ()=> {
    //     const cancelButton = document.getElementById('btn-cancel-signin');
    //     const submitButton = document.getElementById('btn-submit-signin');
    
    //     cancelButton.addEventListener('click', ()=>{
    //         document.getElementById('username').value = "email";
    //         document.getElementById('password').value = "password";
    //         document.getElementById('invalid-signin').innerHTML = "";
    //     });
    //     retrieveData();
        //// console.log(user);
        //submitButton.addEventListener('click', ()=>{
    const username = req.body.username;
    const password = req.body.password;
    const isValid = validate(username, password);
    // if (isValid){
        
    //     //go to Listings page
    //     res.redirect("http://localhost:3030/listings");
    //      //res.send("all good");
    // }
    //     });
        
    
    
    // buttonPush();    
});

module.exports = router;