/// fix validation

const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');



const urlencodedParser = bodyParser.urlencoded({ extended: false })



console.log('hello');
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
console.log(user_data);
let currentUser = {};

router.post('/register', urlencodedParser, (req, res) => {
    

    user_data.users[0].newID += 1;
    let ID = user_data.users[0].newID

    // owner/coworker radio buttons verification and values
    // if (req.body.owner == undefined && req.body.coworker == undefined) {
    //     res.end("please select a usertype!");
    // } else {
    //     if (req.body.owner = 'on') owner = true;
    //     else owner = false;
    // }
    
    currentUser = {
        ID: ID,
        fname: req.body.fName,
        lname: req.body.lName,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password,
        usertype: req.body.usertype
    };
    user_data.users.push(currentUser);
    user_data.currentUser[0] = currentUser;
    let data = JSON.stringify(user_data, null, 2);
    fs.writeFile(file_location, data, ()=> console.log('succesfully wrote to user_data.json'));
    // data = JSON.stringify(currentUser);
    // fs.writeFile('./currentUser.json', data, ()=> console.log('succesfully wrote to currentUser.json'))
    
    
    res.redirect('http://localhost:3030/listings');    
});

module.exports = router;