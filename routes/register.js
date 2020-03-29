/// fix validation

const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');


const urlencodedParser = bodyParser.urlencoded({ extended: false })



console.log('hello');
let usersAll = [{
    newID: 0,
}];
const file_location = './user.json'
if (fs.existsSync(file_location)) {
    mydata = fs.readFileSync(file_location);
    usersAll = JSON.parse(mydata);
}
console.log(usersAll);
let currentUser = {};

router.post('/register', urlencodedParser, (req, res) => {
    

    usersAll[0].newID += 1;
    let ID = usersAll[0].newID

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
    usersAll.push(currentUser);
    let data = JSON.stringify(usersAll, null, 2);
    fs.writeFile(file_location, data, ()=> console.log('succesfully wrote to user.json'));
    data = JSON.stringify(currentUser);
    fs.writeFile('./currentUser.json', data, ()=> console.log('succesfully wrote to currentUser.json'))
    
    
    res.redirect('http://localhost:3030/listings');    
});

module.exports = router;