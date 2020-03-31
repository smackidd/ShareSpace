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
    res.send(user_data);
});

module.exports = router;