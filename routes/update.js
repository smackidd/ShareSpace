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

//place everything in update.html forms in XMLHttpRequest POST methd
//and then retrieve the info here.
router.post('/property/', urlencodedParser, (req, res) => {
    // This retrieves the data from the form input in /scripts/update.js
    data = req.body.propertyholder;
    console.log(data);
    property = JSON.parse(data);
    let newPropertyID = 0;
    if (user_data.workspacesAll.length > 1) {
        newPropertyID = user_data.workspacesAll[user_data.workspacesAll.length - 1].property[0] + 1;
    }
    // clean up JSON data
    console.log(property);
    property.forEach((element, index) => {
        if (index > 0) {
            user_data.workspacesAll[0].newID += 1
            element.WorkSpaceID = user_data.workspacesAll[0].newID;
            element.property[0] = newPropertyID;
            element.property[1].propertyID = newPropertyID;
            element.property[1].propertyOwner = user_data.currentUser[0];
            user_data.workspacesAll.push(element)
        }
    });
    console.log(user_data);
    let newdata = JSON.stringify(user_data, null, 2);  
    fs.writeFile(file_location, newdata, () => console.log("successfully wrote to user_data.json"));
    //user_data.workspacesAll.push(property);
    //console.log(property);
    res.redirect('http://localhost:3030/listings');
});

module.exports = router;