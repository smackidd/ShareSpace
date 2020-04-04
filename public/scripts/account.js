/* Functionality Fixes
    - edit info including password
    
    - add the option to release rental along with rating
    - add users renting properties and edit user ratings, for owner-side
*/



var rentedSpaces = [];
var workspacesAll = [];
let userRented = [];
let currentUser = {};
fetch('http://localhost:3030/user_data')
    .then((res) => res.json())
    .then((data) => {

        if (data.currentUser){
            currentUser = data.currentUser[0];
        } 

        if (data.rentedWorkspaces){
            rentedSpaces = data.rentedWorkspaces;
        }

        if (data.workspacesAll){
            workspacesAll = data.workspacesAll;
        }
        console.log("currenUser: ", currentUser);
        console.log("rentedSpaces: ", rentedSpaces);
        console.log(workspacesAll);
        // resetting Available value for debugging purposes
        // workspacesAll.forEach((property) => {
        //     property.forEach((workspace, index2) => {
        //         if (index2 > 0){
        //             workspace.Available = true;
        //         }
        //     });
        // });
        // localStorage.setItem("workspaces", JSON.stringify(workspacesAll));
        // console.log("after reset: ", workspacesAll);
        function setPage(){
            if (currentUser.usertype == "owner"){
                document.getElementById('links').innerHTML = "<li><a href='http://localhost:3030/listings'>Listings</a></li><ul><li><a href='http://localhost:3030/update'>Update</a></ul>";
            }
            if (currentUser.fname != undefined){
                document.getElementById('signIn').innerHTML = "<li><a href='http://localhost:3030/account' id='welcome'>Welcome, " + currentUser.fname + "</a></li>"
            } else {
                document.getElementById('signIn').innerHTML = "<li><a href='http://localhost:3030/signIn'>Sign In</a></li>"
            }
        
            // if (currentUser.owner){
            //     const navbar = document.querySelector('#navbar');
            //     navbar.className.toggle('owner-navbar');
            // }
        }
        setPage();

        function accountInfo(){
            
            document.getElementById('account-fName').innerHTML = currentUser.fname;
            document.getElementById('account-lName').innerHTML = currentUser.lname;
            document.getElementById('account-phone').innerHTML = currentUser.phone;
            document.getElementById('account-username').innerHTML = currentUser.username;
            if (currentUser.usertype == "owner"){
                document.getElementById('account-type').innerHTML = "Owner";
            } else {
                document.getElementById('account-type').innerHTML = "Coworker";
            }
        }
        accountInfo();


        // needs to be put in the routes package
        // function signOut(){
        //     const signout = document.getElementById('signout');

        //     signout.addEventListener('click', ()=>{
        //         user_data = data
        //         currentUser = {};
        //         user_data.currentUser[0] = currentUser;
        //         let data = JSON.stringify(user_data, null, 2);
        //         fs.writeFile(file_location, data, ()=> console.log('succesfully wrote to user_data.json'));
        //         // window.location.assign("index.html");
        //     });
        // }
        // signOut();

        function display(){
            
            if (rentedSpaces.length == 0){
                console.log("hello");
                document.getElementById('rented-workspaces-account').style.display = "none";
                document.getElementById('info').style.flex = "none";
                document.getElementById('info').style.width = "400px";
            } else {
                rentedSpaces.forEach((rented, index) => {
                    
                    if (rented.UserID == currentUser.ID){
                        // look for the workspace that matches the rented element
                        
                        var propertyName = "";
                        var propertyAddress = "";
                        var workspacePrice = "";
                        workspacesAll.forEach((property, index2) => {
                           
                                if (index2 > 0) {
                                    if (property.WorkSpaceID == rented.WorkspaceID){
                                        propertyName = property.property[1].propertyName + " - " + property.workspaceType;
                                        propertyAddress = property.property[1].propertyAddress;
                                        workspacePrice = property.price + "/" + property.leaseLength;
                                    }
                                }
                            
                        });

                        
                    
                        const rentedElem = '<div id="workspace-account">' +
                                '<div id="workspace-info-account">' +
                                    '<div id="info-photo-account">' +
                                        '<i class="fa fa-camera"></i>' +
                                    '</div>' +
                                    '<div id="info-property-account">' +
                                        '<p id="property-name-account"><h2>' + propertyName + '</h2></p>' +
                                        '<p id="property-address-account">' + propertyAddress + '</p>' +
                                        '<p id="workspace-price-account">' + workspacePrice + '</p>' +
                                    '</div>' +
                                '</div>' +
                                '<div id="workspace-info-buttons">' +
                                    '<button type="submit" id="release-rental">Release Rental</button>' +
                                '</div>' +    
                            '</div>';

                        // create a new array of rented indexes for this particular user
                        // makes referencing the release rental button easier.
                        userRented.push(rented);
                        $('#put-rentedElem-here').before(rentedElem);    
                    }
                });
            }
        }

        function buttons(){
            //console.log('hello buttons');
            const releaseButton = document.querySelectorAll('#release-rental');

            releaseButton.forEach((button, userIndex) => {
                button.addEventListener('click', () => {
                    rentedSpaces.forEach((rentedAll, index) => {
                        // filter through all rented spaces to match only the user's rented spaces
                        if (rentedAll = userRented[userIndex]){
                            data.rentedWorkspaces.splice(index, 1);
                            workspacesAll.forEach((property, propertyIndex) => {
                                //if (propertyIndex > 0){
                                
                                    
                                    if (propertyIndex > 0){
                                        if (property.WorkSpaceID == rentedAll.WorkspaceID){
                                            data.workspacesAll[propertyIndex].Available = true;
                                        }
                                    }    
                                
                            });
                        }
                    });
                    
                    
                    
                    
                    // localStorage.setItem('rentedSpaces', JSON.stringify(rentedSpaces));
                    // localStorage.setItem('workspaces', JSON.stringify(workspacesAll));
                    // window.location.assign("listings.html");
                    console.log(data);
                    document.getElementById('propertyholder').value = JSON.stringify(data);
                });
            });
        }

        display();
        buttons();
    });

