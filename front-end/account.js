/* Functionality Fixes
    - edit info including password
    
    - add the option to release rental along with rating
    - add users renting properties and edit user ratings, for owner-side
*/


var currentUser = {};
var rentedSpaces = [];
var workspacesAll = [];
let userRented = [];

if (localStorage.getItem("currentUser")){
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
} 

if (localStorage.getItem("rentedSpaces")){
    rentedSpaces = JSON.parse(localStorage.getItem("rentedSpaces"));
}

if (localStorage.getItem("workspaces")){
    workspacesAll = JSON.parse(localStorage.getItem("workspaces"));
}
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

function display(){
    
    if (rentedSpaces.length == 0){
        console.log("hello");
        document.getElementById('rented-workspaces-account').style.display = "none";
        document.getElementById('info').style.flex = "none";
        document.getElementById('info').style.width = "400px";
    } else {
        rentedSpaces.forEach((rented, index) => {
            
            if (rented.UserID == currentUser.userid){
                // look for the workspace that matches the rented element
                
                var propertyName = "";
                var propertyAddress = "";
                var workspacePrice = "";
                workspacesAll.forEach((property) => {
                    property.forEach((workspace, index2) => {
                        if (index2 > 0) {
                            if (workspace.WorkSpaceID == rented.WorkspaceID){
                                propertyName = workspace.property[1].propertyName + " - " + workspace.workspaceType;
                                propertyAddress = workspace.property[1].propertyAddress;
                                workspacePrice = workspace.price + "/" + workspace.leaseLength;
                            }
                        }
                    });
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
                            '<button type="button" id="release-rental">Release Rental</button>' +
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
    console.log('hello buttons');
    const releaseButton = document.querySelectorAll('#release-rental');

    releaseButton.forEach((button, userIndex) => {
        button.addEventListener('click', () => {
            rentedSpaces.forEach((rentedAll, index) => {
                // filter through all rented spaces to match only the user's rented spaces
                if (rentedAll = userRented[userIndex]){
                    rentedSpaces.splice(index, 1);
                    workspacesAll.forEach((property, propertyIndex) => {
                         //if (propertyIndex > 0){
                        property.forEach((workspace, workIndex) => {
                             
                            if (workIndex > 0){
                                if (workspace.WorkSpaceID == rentedAll.WorkspaceID){
                                    workspacesAll[propertyIndex][workIndex].Available = true;
                                }
                            }    
                        });
                    });
                }
            });
            
            
            
            
            localStorage.setItem('rentedSpaces', JSON.stringify(rentedSpaces));
            localStorage.setItem('workspaces', JSON.stringify(workspacesAll));
            window.location.assign("listings.html");

        });
    });
}

display();
buttons();

