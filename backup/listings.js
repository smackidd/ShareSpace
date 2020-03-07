var currentUser = {};
let workspacesAll;
if (localStorage.getItem('workspaces')){
    workspacesAll = JSON.parse(localStorage.getItem('workspaces'));
}

console.log("workspacesAll: ", workspacesAll);

if (localStorage.getItem("currentUser")){
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
} 
function setPage(){
    if (currentUser.owner){
        document.getElementById('links').innerHTML = "<li><a href='listings.html'>Listings</a></li><ul><li><a href='update.html'>Update</a></ul>";
    }
    if (currentUser.username != undefined){
        document.getElementById('signIn').innerHTML = "<li><a href='account.html' id='welcome'>Welcome, " + currentUser.firstName + "</a></li>"
    } else {
        document.getElementById('signIn').innerHTML = "<li><a href='SignIn.html'>Sign In</a></li>"
    }

    // if (currentUser.owner){
    //     const navbar = document.querySelector('#navbar');
    //     navbar.className.toggle('owner-navbar');
    // }
}
setPage();

// function workspaceDisplay(){
//     let parking, transit;
//     if (workspacesAll[0][1].property[1].propertyParking) {
//         parking = "Yes";
//     } else {
//         parking = "No";
//     }
//     if (workspacesAll[0][1].property[1].propertyTransit) {
//         transit = "Yes";
//     } else {
//         transit = "No";
//     }
//     console.log(workspacesAll[0][1].property[1].propertyName);
//     //document.getElementById('property-info').innerHTML = "<h2 id='property-title'>" + workspacesAll[0][1].property[1].propertyName + " - " + workspacesAll[0][1].workspaceType + "</h2><p>" + workspacesAll[0][1].property[1].propertyAddress + "</p><p>" + workspacesAll[0][1].property[1].propertyNeighborhood + "</p><p>" + workspacesAll[0][1].property[1].propertySquareFoot + " SqFT</p><div id='parking-transit'><p>Parking: " + parking + "</p><p>Transit: " + transit + "</p>";
// }

// workspaceDisplay();

function buttons(){
    const editPropertyButton = document.getElementById('btn-edit-property');

    editPropertyButton.addEventListener('click', ()=>{
        document.getElementById('edit-form-container').style.display = "block";
    });
}

buttons();