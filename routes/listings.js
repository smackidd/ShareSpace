const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');



const urlencodedParser = bodyParser.urlencoded({ extended: false })

let user_data = {};
const file_location = './user_data.json'
if (fs.existsSync(file_location)) {
    mydata = fs.readFileSync(file_location);
    user_data = JSON.parse(mydata);
}

router.get('/user_data', (req,res) => {
    if (fs.existsSync(file_location)) {
        mydata = fs.readFileSync(file_location);
        user_data = JSON.parse(mydata);
    }
    res.send(user_data);
});

router.post('/editWorkspace', urlencodedParser, (req,res) => {
    let data = req.body.propertyholder;
    console.log("user_data: ", data);
    
    parsedData = JSON.parse(data);
    let newdata = JSON.stringify(parsedData, null, 2);  
    fs.writeFile(file_location, newdata, () => console.log("successfully wrote to user_data.json"));
    res.redirect('http://localhost:3030/listings');    
});

module.exports = router;