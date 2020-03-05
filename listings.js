/* Functionality Fixes
    - implement Edit Workspace and Remove Workspace Buttons
    - display lease length
    - pass values in to the forms for Edit Property and Edit Workspace
    - update workspacesAll array upon Submission of Edit Workspace
        and Edit Property
    - Style the Coworker side of Listings page
    - Implement Coworker renting functionality -> update Account page
    - Only show available workspaces
    - Style Search/Filter Bar
    - Implement Search/Filter functionality, including Owner-only button
    - display photos

*/
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

function workspaceDisplay(){
    let parking, transit;
    let workspaceIndex = [];
    //fix array iterations
    for (let i = 0; i < workspacesAll.length; i++) {
        for (let j = 1; j < workspacesAll[i].length; j++){    
    
            if (workspacesAll[i][j].property[1].propertyParking) {
                parking = "Yes";
            } else {
                parking = "No";
            }
            if (workspacesAll[i][j].property[1].propertyTransit) {
                transit = "Yes";
            } else {
                transit = "No";
            }
            if (workspacesAll[i][j].smoking){
                smoking = "Yes";
            } else {
                smoking = "No";
            }

            // pass all html for each workspace box into a string variable
            const elem2 = '<div id="workspace-box">' +
                '<div id="listings-workspace">' +
                    '<div id="photo-listings"><i class="fa fa-camera"></i></div>' +
                    '<div id="property-info">' +
                        '<h2 id="property-title">' + workspacesAll[i][j].property[1].propertyName + ' - ' + workspacesAll[i][j].workspaceType + '</h2>' +
                        '<div id="property-address-listings">' +
                            '<p>' + workspacesAll[i][j].property[1].propertyAddress + '</p>' +
                            '<p>' + workspacesAll[i][j].property[1].propertyNeighborhood + '</p>' +
                            '<p>'+ workspacesAll[i][j].property[1].propertySquareFoot + ' SqFT</p>' +
                            '<div id="parking-transit">' +
                                '<p>Parking: ' + parking + '</p>' +
                                '<p>Transit: ' + transit + '</p>' +
                            '</div>' +
                        '</div>    ' +
                    '</div>' +
                    '<div id="workspace-container-listings">' +
                        '<div id="workspace-info">' +
                            '<p>Owner: ' + workspacesAll[i][j].property[1].propertyOwner.firstName + " " + workspacesAll[i][j].property[1].propertyOwner.lastName + '</p>' +
                            '<p>Seats: ' + workspacesAll[i][j].numberOfSeats + '</p>' +
                            '<p>Available: ' + workspacesAll[i][j].dateAvailable + '</p>' +
                            '<p>Price: ' + workspacesAll[i][j].price + '</p>' +
                            '<p>Smoking: ' + smoking + '</p>    ' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div id="listings-buttons">' +
                    '<div id="ratings-listings">' +
                        '<p><i class="fa fa-star"></i></p>' +
                        '<p><i class="fa fa-star"></i></p>' +
                        '<p><i class="fa fa-star"></i></p>' +
                        '<p><i class="fa fa-star"></i></p>' +
                        '<p><i class="fa fa-star"></i></p>' +
                        '<p id="stars-number">3.5/5 stars</p>    ' +
                    '</div>' +
                    '<div id="edit-property">' +
                        '<div class="listings-buttons-container">' +
                            '<button type="button" id="btn-edit-property">Edit Property</button>' +
                        '</div>' +
                    '</div>' +
                    '<div id="remove-property">' +
                        '<div class="listings-buttons-container">' +
                            '<button type="button" id="btn-remove-property">Remove Property</button>' +
                        '</div>' +
                    '</div>' +
                    '<div id="edit-workspace">' +
                        '<div class="listings-buttons-container">' +
                            '<button type="button" id="btn-edit-workspace">Edit Workspace</button>' +
                        '</div>' +
                    '</div>' +
                    '<div id="remove-workspace">' +
                        '<div class="listings-buttons-container">' +
                            '<button type="button" id="btn-remove-workspace">Remove Workspace</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                // Hidden Edit Property Container
                '<div class="edit-form-container">' +
                    '<div class="edit-form">' +
                        '<p>' +
                            '<input type="text" class="pName-property-edit" value="Property Name">' +
                        '</p>' +
                        '<p>' +
                            '<input type="text" class="pAddress-property-edit" value="Address">' +
                        '</p>' +
                        '<p>' +
                            '<input type="text" class="pNeighborhood-property-edit" value="Neighborhood">' +
                        '</p>' +
                        '<p>' +
                            '<input type="text" class="pSquareFoot-property-edit" value="Square Footage">' +
                        '</p>' +
                        '<div id="checkbox">' +
                            '<div>' +
                                '<input type="checkbox" id="garage">' +
                                '<label for="garage">Parking</label>' +
                            '</div>' +
                            '<div>' +
                                '<input type="checkbox" id="transit">' +
                                '<label for="transit">Transit Access</label>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="edit-buttons">' +
                        '<button type="reset" id="btn-cancel-property">Cancel</button>' +
                        '<button type="button" id="btn-submit-property">Submit</button>' +
                    '</div>' +
                '</div>' +

                // hidden Are you Sure? Property Remove Container
                '<div class="are-you-sure-property">' +
                    '<p>Are you sure? This will erase all workspaces in the property.</p>' +
                    '<p><button type="button" id="btn-sure-cancel-property">Cancel</button></p>' +
                    '<p><button type="button" id="btn-sure-remove-property">Remove</button></p>' +
                '</div>' +

                // hidden Edit Workspace container
                '<div id="office-container-listings">' +
                    
                    '<div class="new-space-listings">' +
                        '<div class="photo-listings">' +
                            '<i class="fa fa-camera"></i>' +
                        '</div>' +
                        '<div class="space-info">' +
                            '<div class="space-type">' +
                                '<p><input type="text" class="type" value="Workspace type"></p>' +
                                '<p><input type="text" class="seats" value="# of seats"></p>' +
                                '<div><input type="checkbox" id="smoking"><label for="smoking">Smoking</label></div>' +
                            '</div>' +
                            '<div class="space-availability">' +
                                '<p><input type="date" id="date"></p>' +
                                '<p>' +
                                    '<label for="lease">Lease Length</label>' +
                                    '<select id="lease" name="lease">' +
                                        '<option value="Default">--choose--</option>' +
                                        '<option value="One day">One Day</option>' +
                                        '<option value="One week">One Week</option>' +
                                        '<option value="One month">One Month</option>' +
                                    '</select>' +
                                '</p>' +
                                '<p><input type="text" class="price" value="Price"' + " onfocus='value=" + '"$"' + "'" + '></p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    
                    '<div class="edit-buttons">' +
                        '<button type="reset" id="btn-cancel-workspace">Cancel</button>' +
                        '<button type="button" id="btn-submit-workspace">Submit</button>' +
                    '</div>'
                    
                '</div>   ' +
            '</div>';

            // creates an array help match the workspace child index to the workspacesAll array index
            let temp = {propertyIndex: i, workIndex: j};
            workspaceIndex.push(temp);
            
            // put all workspace box html into the DOM for each array element in workspacesAll
            if (currentUser.owner){
                $('#put-workspaces-here').after(elem2);
            } else {
                // still need to style the coworker display so I'm displaying the owner display
                // for everyone. Once styled, the elem2 variable will change to a variable that
                // contains the coworker html elements
                $('#put-workspaces-here').after(elem2);
            }
            
        }
    }
    
    return workspaceIndex;
    
}

const workspaceIndex = workspaceDisplay();

function buttons(){
    const editPropertyButton = document.querySelectorAll('#btn-edit-property');
    const removePropertyButton = document.querySelectorAll('#btn-remove-property');
    const editWorkspaceButton = document.querySelectorAll('#btn-edit-workspace');
    const editFormContainer = document.querySelectorAll('.edit-form-container');
    const propertySureContainer = document.querySelectorAll('.are-you-sure-property');
    const editWorkspaceContainer = document.querySelectorAll('#office-container-listings');
    const editPropertyCancel = document.querySelectorAll('#btn-cancel-property');
    const editPropertySubmit = document.querySelectorAll('#btn-submit-property');
    const removePropertyCancel = document.querySelectorAll('#btn-sure-cancel-property');
    const removePropertyRemove = document.querySelectorAll('#btn-sure-remove-property');
    const editWorkspaceCancel = document.querySelectorAll('#btn-cancel-workspace');
    const propertyName = document.querySelectorAll('.pName-property-edit');
    const propertyAddress = document.querySelectorAll('.pAddress-property-edit');
    const propertyNeighborhood = document.querySelectorAll('.pNeighborhood-property-edit');
    const propertySqft = document.querySelectorAll('.pSquareFoot-property-edit');
    const parking = document.querySelectorAll('#garage');
    const transit = document.querySelectorAll('#transit');
    //console.log(editFormContainer);

    // displays the edit property form
    editPropertyButton.forEach((element, index) => {
        element.addEventListener('click', ()=>{
            editFormContainer[index].style.display = "block";
        });
    });

    // once displayed the cancel button will hide the edit property form
    editPropertyCancel.forEach((element, index) => {
        element.addEventListener('click', ()=>{
            editFormContainer[index].style.display = "none";
        });
    });

    // submits the edited property for every workspace (needs validation)
    editPropertySubmit.forEach((element, childIndex) => {
        element.addEventListener('click', ()=>{
            // the element child indexes are populated in the opposite order of the workspaceAll indexes
            // so we need to recitfy the problem with the formula below.
            index = (childIndex + 1 - workspaceIndex.length) * -1;
            const propertyIndex = workspaceIndex[index].propertyIndex;
            const workIndex = workspaceIndex[index].workIndex;
            workspacesAll[propertyIndex].forEach((property, workIndex) => {
                if (workIndex > 0) {
                // console.log(propertyName[childIndex].value);
                // console.log(workspacesAll[propertyIndex][workIndex].property[1].propertyName);
                workspacesAll[propertyIndex][workIndex].property[1].propertyName = propertyName[childIndex].value;
                workspacesAll[propertyIndex][workIndex].property[1].propertyAddress = propertyAddress[childIndex].value;
                workspacesAll[propertyIndex][workIndex].property[1].propertyNeighborhood = propertyNeighborhood[childIndex].value;
                workspacesAll[propertyIndex][workIndex].property[1].propertySquareFoot = propertySqft[childIndex].value;
                workspacesAll[propertyIndex][workIndex].property[1].propertyParking = parking[childIndex].checked;
                workspacesAll[propertyIndex][workIndex].property[1].propertyTransit = transit[childIndex].checked;
                }  
            });
            editFormContainer[childIndex].style.display = "none";
            localStorage.setItem('workspaces', JSON.stringify(workspacesAll));
            
            
            window.location.assign("listings.html");
        });
    });

    // displays the "are you sure" query to remove a property
    removePropertyButton.forEach((element, index) => {
        element.addEventListener('click', ()=>{
            propertySureContainer[index].style.display = "flex";
        });
    });

    // once displayed, the cancel button will hide the "are you sure" query
    removePropertyCancel.forEach((element, index) => {
        element.addEventListener('click', ()=>{
            propertySureContainer[index].style.display = "none";
        });
    });

    // the remove button will remove all workspaces in the property from workspacesAll
    removePropertyRemove.forEach((element, childIndex) => {
        element.addEventListener('click', ()=>{
            // the element child indexes are populated in the opposite order of the workspaceAll indexes
            // so we need to recitfy the problem with the formula below.
            index = (childIndex + 1 - workspaceIndex.length) * -1;
            const propertyIndex = workspaceIndex[index].propertyIndex;
            
            workspacesAll.splice(propertyIndex, 1);
            propertySureContainer[index].style.display = "none";
            localStorage.setItem('workspaces', JSON.stringify(workspacesAll));
            window.location.assign("listings.html");
        });
    });

    editWorkspaceButton.forEach((element, index) => {
        element.addEventListener('click', ()=>{
            editWorkspaceContainer[index].style.display = "flex";           
        });
    });

    editWorkspaceCancel.forEach((element, index) => {
        element.addEventListener('click', ()=>{
            editWorkspaceContainer[index].style.display = "none";
        });
    });
}

buttons();