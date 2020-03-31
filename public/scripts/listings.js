/* Functionality Fixes
    
    
    - pass values in to the forms for Edit Property and Edit Workspace
  
    - Implement ratings display
    
     
    - Style Search/Filter Bar
    - Implement Search/Filter functionality, including Owner-only button
    - display photos
*/
let currentUser = {};
fetch('http://localhost:3030/user_data')
    .then((res) => res.json())
    .then((data) => {
        console.log("data: ", data);
        currentUser = data.currentUser[0];
        console.log("currentUser.usertype: ", currentUser.usertype);
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

        function workspaceDisplay(){
            console.log(data.workspacesAll.length);
            let parking, transit;
            let workspaceIndex = [];
            //fix array iterations
            for (let i = 0; i < data.workspacesAll.length; i++) {
                for (let j = 1; j < data.workspacesAll[i].length; j++){    
            
                    if (data.workspacesAll[i][j].property[1].propertyParking) {
                        parking = "Yes";
                    } else {
                        parking = "No";
                    }
                    if (data.workspacesAll[i][j].property[1].propertyTransit) {
                        transit = "Yes";
                    } else {
                        transit = "No";
                    }
                    if (data.workspacesAll[i][j].smoking){
                        smoking = "Yes";
                    } else {
                        smoking = "No";
                    }
        
                    // pass all html for each workspace box into a string variable
                    const elemOwner = '<div id="workspace-box">' +
                        '<div id="listings-workspace">' +
                            '<div id="photo-listings"><i class="fa fa-camera"></i></div>' +
                            '<div id="property-info">' +
                                '<h2 id="property-title">' + data.workspacesAll[i][j].property[1].propertyName + ' - ' + data.workspacesAll[i][j].workspaceType + '</h2>' +
                                '<div id="property-address-listings">' +
                                    '<p>' + data.workspacesAll[i][j].property[1].propertyAddress + '</p>' +
                                    '<p>' + data.workspacesAll[i][j].property[1].propertyNeighborhood + '</p>' +
                                    '<p>'+ data.workspacesAll[i][j].property[1].propertySquareFoot + ' SqFT</p>' +
                                    '<div id="parking-transit">' +
                                        '<p>Parking: ' + parking + '</p>' +
                                        '<p>Transit: ' + transit + '</p>' +
                                    '</div>' +
                                '</div>    ' +
                            '</div>' +
                            '<div id="workspace-container-listings">' +
                                '<div id="workspace-info">' +
                                    '<p>Owner: ' + data.workspacesAll[i][j].property[1].propertyOwner.firstName + " " + data.workspacesAll[i][j].property[1].propertyOwner.lastName + '</p>' +
                                    '<p>Seats: ' + data.workspacesAll[i][j].numberOfSeats + '</p>' +
                                    '<p>Available: ' + data.workspacesAll[i][j].dateAvailable + '</p>' +
                                    '<p>Price: ' + data.workspacesAll[i][j].price + '/' + data.workspacesAll[i][j].leaseLength + '</p>' +
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
                                                '<option value="day">One Day</option>' +
                                                '<option value="week">One Week</option>' +
                                                '<option value="month">One Month</option>' +
                                            '</select>' +
                                        '</p>' +
                                        '<p><input type="text" class="price" value="Price"' + " onfocus='value=" + '"$"' + "'" + '></p>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            
                            '<div class="edit-buttons">' +
                                '<button type="reset" id="btn-cancel-workspace">Cancel</button>' +
                                '<button type="button" id="btn-submit-workspace">Submit</button>' +
                            '</div>' +
                            
                        '</div>   ' +
        
                        // hidden Are you Sure? Worksapce Remove Container
                        '<div class="are-you-sure-workspace">' +
                            '<p>Are you sure?</p>' +
                            '<p><button type="button" id="btn-sure-cancel-workspace">Cancel</button></p>' +
                            '<p><button type="button" id="btn-sure-remove-workspace">Remove</button></p>' +
                        '</div>' +
                    '</div>';
        
        
        
        
                    const elemCoworker = '<div id="workspace-box">' +
                        '<div id="listings-workspace">' +
                            '<div id="photo-listings"><i class="fa fa-camera"></i></div>' +
                            '<div id="property-info">' +
                                '<h2 id="property-title">' + data.workspacesAll[i][j].property[1].propertyName + ' - ' + data.workspacesAll[i][j].workspaceType + '</h2>' +
                                '<div id="property-address-listings">' +
                                    '<p>' + data.workspacesAll[i][j].property[1].propertyAddress + '</p>' +
                                    '<p>' + data.workspacesAll[i][j].property[1].propertyNeighborhood + '</p>' +
                                    '<p>'+ data.workspacesAll[i][j].property[1].propertySquareFoot + ' SqFT</p>' +
                                    '<div id="parking-transit">' +
                                        '<p>Parking: ' + parking + '</p>' +
                                        '<p>Transit: ' + transit + '</p>' +
                                    '</div>' +
                                '</div>    ' +
                            '</div>' +
                            '<div id="workspace-container-listings">' +
                                '<div id="workspace-info">' +
                                    '<p>Owner: ' + data.workspacesAll[i][j].property[1].propertyOwner.firstName + " " + data.workspacesAll[i][j].property[1].propertyOwner.lastName + '</p>' +
                                    '<p>Seats: ' + data.workspacesAll[i][j].numberOfSeats + '</p>' +
                                    '<p>Available: ' + data.workspacesAll[i][j].dateAvailable + '</p>' +
                                    '<p>Price: ' + data.workspacesAll[i][j].price + '/' + data.workspacesAll[i][j].leaseLength + '</p>' +
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
                            '<div id="contact-owner">' +
                                '<div class="listings-buttons-container">' +
                                    '<button type="button" id="btn-contact-owner">Contact Info</button>' +
                                '</div>' +
                            '</div>' +
                            '<div id="rent-workspace">' +
                                '<div class="listings-buttons-container">' +
                                    '<button type="button" id="btn-rent-workspace">Rent Workspace</button>' +
                                '</div>' +
                            '</div>' +
                            
                        '</div>' +
                        '<div id="owner-info-listings">' +
                            '<div id="owner-name-listings"></div>' +
                            '<div id="owner-phone-listings"></div>' +
                            '<div id="owner-email-listings"></div>' +
                            '<button type="button" id="btn-cancel-owner-info">Cancel</button>' +
                        '</div>' +
                    '</div>';
                    
                    // creates an array help match the workspace child index to the data.workspacesAll array index
                    let temp = {propertyIndex: i, workIndex: j};
                    console.log("hello");
                    console.log("currentUser.usertype: ", currentUser.usertype);
                    // put all workspace box html into the DOM for each array element in data.workspacesAll
                    if (currentUser.usertype == "owner"){
                        workspaceIndex.push(temp);
                        $('#put-workspaces-here').after(elemOwner);
                    } else {
                        // only show unrented workspaces
                        if (data.workspacesAll[i][j].Available){
                            workspaceIndex.push(temp);
                            $('#put-workspaces-here').after(elemCoworker);
                        }
                    }
                    
                    
                }
            }
            
            return workspaceIndex;
            
        }
        console.log("hello");
        const workspaceIndex = workspaceDisplay();

        function buttons(){
            const editPropertyButton = document.querySelectorAll('#btn-edit-property');
            const removePropertyButton = document.querySelectorAll('#btn-remove-property');
            const editWorkspaceButton = document.querySelectorAll('#btn-edit-workspace');
            const removeWorkspaceButton = document.querySelectorAll('#btn-remove-workspace');
            const editFormContainer = document.querySelectorAll('.edit-form-container');
            const propertySureContainer = document.querySelectorAll('.are-you-sure-property');
            const editWorkspaceContainer = document.querySelectorAll('#office-container-listings');
            const editPropertyCancel = document.querySelectorAll('#btn-cancel-property');
            const editPropertySubmit = document.querySelectorAll('#btn-submit-property');
            const removePropertyCancel = document.querySelectorAll('#btn-sure-cancel-property');
            const removePropertyRemove = document.querySelectorAll('#btn-sure-remove-property');
            const editWorkspaceCancel = document.querySelectorAll('#btn-cancel-workspace');
            const editWorkspaceSubmit = document.querySelectorAll('#btn-submit-workspace');
            const propertyName = document.querySelectorAll('.pName-property-edit');
            const propertyAddress = document.querySelectorAll('.pAddress-property-edit');
            const propertyNeighborhood = document.querySelectorAll('.pNeighborhood-property-edit');
            const propertySqft = document.querySelectorAll('.pSquareFoot-property-edit');
            const workspaceType = document.querySelectorAll('.type');
            const workspaceSeats = document.querySelectorAll('.seats');
            const workspaceSmoking = document.querySelectorAll('#smoking');
            const workspaceDate = document.querySelectorAll('#date');
            const workspaceLease = document.querySelectorAll('#lease');
            const workspacePrice = document.querySelectorAll('.price');
            const parking = document.querySelectorAll('#garage');
            const transit = document.querySelectorAll('#transit');
            const workspaceSureContainer = document.querySelectorAll('.are-you-sure-workspace');
            const removeWorkspaceCancel = document.querySelectorAll('#btn-sure-cancel-workspace');
            const removeWorkspaceRemove = document.querySelectorAll('#btn-sure-remove-workspace');
            const contactOwnerButton = document.querySelectorAll('#btn-contact-owner');
            const contactOwnerInfo = document.querySelectorAll('#owner-info-listings');
            const contactOwnerName = document.querySelectorAll('#owner-name-listings');
            const contactOwnerPhone = document.querySelectorAll('#owner-phone-listings');
            const contactOwnerEmail = document.querySelectorAll('#owner-email-listings');
            const contactOwnerCancel = document.querySelectorAll('#btn-cancel-owner-info');
            const rentWorkspaceButton = document.querySelectorAll('#btn-rent-workspace');
        
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
                    data.workspacesAll[propertyIndex].forEach((property, workIndex) => {
                        if (workIndex > 0) {
                        // console.log(propertyName[childIndex].value);
                        // console.log(data.workspacesAll[propertyIndex][workIndex].property[1].propertyName);
                        data.workspacesAll[propertyIndex][workIndex].property[1].propertyName = propertyName[childIndex].value;
                        data.workspacesAll[propertyIndex][workIndex].property[1].propertyAddress = propertyAddress[childIndex].value;
                        data.workspacesAll[propertyIndex][workIndex].property[1].propertyNeighborhood = propertyNeighborhood[childIndex].value;
                        data.workspacesAll[propertyIndex][workIndex].property[1].propertySquareFoot = propertySqft[childIndex].value;
                        data.workspacesAll[propertyIndex][workIndex].property[1].propertyParking = parking[childIndex].checked;
                        data.workspacesAll[propertyIndex][workIndex].property[1].propertyTransit = transit[childIndex].checked;
                        }  
                    });
                    editFormContainer[childIndex].style.display = "none";
                    localStorage.setItem('workspaces', JSON.stringify(data.workspacesAll));
                    
                    
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
        
            // the remove button will remove all workspaces in the property from data.workspacesAll
            removePropertyRemove.forEach((element, childIndex) => {
                element.addEventListener('click', ()=>{
                    // the element child indexes are populated in the opposite order of the workspaceAll indexes
                    // so we need to recitfy the problem with the formula below.
                    index = (childIndex + 1 - workspaceIndex.length) * -1;
                    const propertyIndex = workspaceIndex[index].propertyIndex;
                    
                    data.workspacesAll.splice(propertyIndex, 1);
                    propertySureContainer[index].style.display = "none";
                    localStorage.setItem('workspaces', JSON.stringify(data.workspacesAll));
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
        
            editWorkspaceSubmit.forEach((element, childIndex) => {
                element.addEventListener('click', ()=>{
                    index = (childIndex + 1 - workspaceIndex.length) * -1;
                    const propertyIndex = workspaceIndex[index].propertyIndex;
                    const workIndex = workspaceIndex[index].workIndex;
                    data.workspacesAll[propertyIndex][workIndex].workspaceType = workspaceType[childIndex].value;
                    data.workspacesAll[propertyIndex][workIndex].numberOfSeats = workspaceSeats[childIndex].value;
                    data.workspacesAll[propertyIndex][workIndex].smoking = workspaceSmoking[childIndex].checked;
                    data.workspacesAll[propertyIndex][workIndex].dateAvailable = workspaceDate[childIndex].value;
                    data.workspacesAll[propertyIndex][workIndex].leaseLength = workspaceLease[childIndex].value;
                    data.workspacesAll[propertyIndex][workIndex].price = workspacePrice[childIndex].value;
        
                    editWorkspaceContainer[index].style.display = "none";
                    localStorage.setItem('workspaces', JSON.stringify(data.workspacesAll));
                    window.location.assign("listings.html");
                });
            });
        
            // displays the "are you sure" query to remove a workspace
            removeWorkspaceButton.forEach((element, index) => {
                element.addEventListener('click', ()=>{
                    workspaceSureContainer[index].style.display = "flex";
                });
            });
        
            // once displayed, the cancel button will hide the "are you sure" query
            removeWorkspaceCancel.forEach((element, index) => {
                element.addEventListener('click', ()=>{
                    workspaceSureContainer[index].style.display = "none";
                });
            });
        
            // the remove button will remove all workspaces in the property from data.workspacesAll
            removeWorkspaceRemove.forEach((element, childIndex) => {
                element.addEventListener('click', ()=>{
                    // the element child indexes are populated in the opposite order of the workspaceAll indexes
                    // so we need to recitfy the problem with the formula below.
                    index = (childIndex + 1 - workspaceIndex.length) * -1;
                    const propertyIndex = workspaceIndex[index].propertyIndex;
                    const workIndex = workspaceIndex[index].workIndex;
                    console.log("propertyIndex: ", propertyIndex);
                    console.log("workIndex: ", workIndex);
                    
                    data.workspacesAll[propertyIndex].splice(workIndex, 1);
                    propertySureContainer[childIndex].style.display = "none";
                    localStorage.setItem('workspaces', JSON.stringify(data.workspacesAll));
                    window.location.assign("listings.html");
                });
            });
        
            contactOwnerButton.forEach((element, childIndex) => {
                element.addEventListener('click', () => {
                    contactOwnerInfo[childIndex].style.display = "flex";
        
                    var index = (childIndex + 1 - workspaceIndex.length) * -1;
                    const propertyIndex = workspaceIndex[index].propertyIndex;
                    const workIndex = workspaceIndex[index].workIndex;
                    contactOwnerName[childIndex].innerHTML = "Name: " + data.workspacesAll[propertyIndex][workIndex].property[1].propertyOwner.firstName + " " + data.workspacesAll[propertyIndex][workIndex].property[1].propertyOwner.lastName;
                    contactOwnerPhone[childIndex].innerHTML = "Phone: " + data.workspacesAll[propertyIndex][workIndex].property[1].propertyOwner.phone;
                    contactOwnerEmail[childIndex].innerHTML = "Email: " + data.workspacesAll[propertyIndex][workIndex].property[1].propertyOwner.username;
                });
            });
        
            contactOwnerCancel.forEach((element, index) => {
                element.addEventListener('click', () => {
                    contactOwnerInfo[index].style.display = "none";
                });
            });
        
            rentWorkspaceButton.forEach((element, childIndex) => {
                element.addEventListener('click', ()=> {
                    rentWorkspace(childIndex);
                    window.location.assign("listings.html");
                });
            });
        
        }
        
        buttons();
    });








// var currentUser = {};
// var rentedWorkspaces = [];
// let data.workspacesAll;
// if (localStorage.getItem('rentedSpaces')) {
//     rentedWorkspaces = JSON.parse(localStorage.getItem('rentedSpaces'));
// }
// if (localStorage.getItem('workspaces')){
//     data.workspacesAll = JSON.parse(localStorage.getItem('workspaces'));
// }

// console.log("data.workspacesAll: ", data.workspacesAll);

// if (localStorage.getItem("currentUser")){
//     currentUser = JSON.parse(localStorage.getItem("currentUser"));
// } 



// function setPage(){
//     if (currentUser.owner){
//         document.getElementById('links').innerHTML = "<li><a href='listings.html'>Listings</a></li><ul><li><a href='update.html'>Update</a></ul>";
//     }
//     if (currentUser.username != undefined){
//         document.getElementById('signIn').innerHTML = "<li><a href='account.html' id='welcome'>Welcome, " + currentUser.firstName + "</a></li>"
//     } else {
//         document.getElementById('signIn').innerHTML = "<li><a href='SignIn.html'>Sign In</a></li>"
//     }

//     // if (currentUser.owner){
//     //     const navbar = document.querySelector('#navbar');
//     //     navbar.className.toggle('owner-navbar');
//     // }
// }
// setPage();

// function workspaceDisplay(){
//     let parking, transit;
//     let workspaceIndex = [];
//     //fix array iterations
//     for (let i = 0; i < data.workspacesAll.length; i++) {
//         for (let j = 1; j < data.workspacesAll[i].length; j++){    
    
//             if (data.workspacesAll[i][j].property[1].propertyParking) {
//                 parking = "Yes";
//             } else {
//                 parking = "No";
//             }
//             if (data.workspacesAll[i][j].property[1].propertyTransit) {
//                 transit = "Yes";
//             } else {
//                 transit = "No";
//             }
//             if (data.workspacesAll[i][j].smoking){
//                 smoking = "Yes";
//             } else {
//                 smoking = "No";
//             }

//             // pass all html for each workspace box into a string variable
//             const elemOwner = '<div id="workspace-box">' +
//                 '<div id="listings-workspace">' +
//                     '<div id="photo-listings"><i class="fa fa-camera"></i></div>' +
//                     '<div id="property-info">' +
//                         '<h2 id="property-title">' + data.workspacesAll[i][j].property[1].propertyName + ' - ' + data.workspacesAll[i][j].workspaceType + '</h2>' +
//                         '<div id="property-address-listings">' +
//                             '<p>' + data.workspacesAll[i][j].property[1].propertyAddress + '</p>' +
//                             '<p>' + data.workspacesAll[i][j].property[1].propertyNeighborhood + '</p>' +
//                             '<p>'+ data.workspacesAll[i][j].property[1].propertySquareFoot + ' SqFT</p>' +
//                             '<div id="parking-transit">' +
//                                 '<p>Parking: ' + parking + '</p>' +
//                                 '<p>Transit: ' + transit + '</p>' +
//                             '</div>' +
//                         '</div>    ' +
//                     '</div>' +
//                     '<div id="workspace-container-listings">' +
//                         '<div id="workspace-info">' +
//                             '<p>Owner: ' + data.workspacesAll[i][j].property[1].propertyOwner.firstName + " " + data.workspacesAll[i][j].property[1].propertyOwner.lastName + '</p>' +
//                             '<p>Seats: ' + data.workspacesAll[i][j].numberOfSeats + '</p>' +
//                             '<p>Available: ' + data.workspacesAll[i][j].dateAvailable + '</p>' +
//                             '<p>Price: ' + data.workspacesAll[i][j].price + '/' + data.workspacesAll[i][j].leaseLength + '</p>' +
//                             '<p>Smoking: ' + smoking + '</p>    ' +
//                         '</div>' +
//                     '</div>' +
//                 '</div>' +
//                 '<div id="listings-buttons">' +
//                     '<div id="ratings-listings">' +
//                         '<p><i class="fa fa-star"></i></p>' +
//                         '<p><i class="fa fa-star"></i></p>' +
//                         '<p><i class="fa fa-star"></i></p>' +
//                         '<p><i class="fa fa-star"></i></p>' +
//                         '<p><i class="fa fa-star"></i></p>' +
//                         '<p id="stars-number">3.5/5 stars</p>    ' +
//                     '</div>' +
//                     '<div id="edit-property">' +
//                         '<div class="listings-buttons-container">' +
//                             '<button type="button" id="btn-edit-property">Edit Property</button>' +
//                         '</div>' +
//                     '</div>' +
//                     '<div id="remove-property">' +
//                         '<div class="listings-buttons-container">' +
//                             '<button type="button" id="btn-remove-property">Remove Property</button>' +
//                         '</div>' +
//                     '</div>' +
//                     '<div id="edit-workspace">' +
//                         '<div class="listings-buttons-container">' +
//                             '<button type="button" id="btn-edit-workspace">Edit Workspace</button>' +
//                         '</div>' +
//                     '</div>' +
//                     '<div id="remove-workspace">' +
//                         '<div class="listings-buttons-container">' +
//                             '<button type="button" id="btn-remove-workspace">Remove Workspace</button>' +
//                         '</div>' +
//                     '</div>' +
//                 '</div>' +

//                 // Hidden Edit Property Container
//                 '<div class="edit-form-container">' +
//                     '<div class="edit-form">' +
//                         '<p>' +
//                             '<input type="text" class="pName-property-edit" value="Property Name">' +
//                         '</p>' +
//                         '<p>' +
//                             '<input type="text" class="pAddress-property-edit" value="Address">' +
//                         '</p>' +
//                         '<p>' +
//                             '<input type="text" class="pNeighborhood-property-edit" value="Neighborhood">' +
//                         '</p>' +
//                         '<p>' +
//                             '<input type="text" class="pSquareFoot-property-edit" value="Square Footage">' +
//                         '</p>' +
//                         '<div id="checkbox">' +
//                             '<div>' +
//                                 '<input type="checkbox" id="garage">' +
//                                 '<label for="garage">Parking</label>' +
//                             '</div>' +
//                             '<div>' +
//                                 '<input type="checkbox" id="transit">' +
//                                 '<label for="transit">Transit Access</label>' +
//                             '</div>' +
//                         '</div>' +
//                     '</div>' +
//                     '<div class="edit-buttons">' +
//                         '<button type="reset" id="btn-cancel-property">Cancel</button>' +
//                         '<button type="button" id="btn-submit-property">Submit</button>' +
//                     '</div>' +
//                 '</div>' +

//                 // hidden Are you Sure? Property Remove Container
//                 '<div class="are-you-sure-property">' +
//                     '<p>Are you sure? This will erase all workspaces in the property.</p>' +
//                     '<p><button type="button" id="btn-sure-cancel-property">Cancel</button></p>' +
//                     '<p><button type="button" id="btn-sure-remove-property">Remove</button></p>' +
//                 '</div>' +

//                 // hidden Edit Workspace container
//                 '<div id="office-container-listings">' +
                    
//                     '<div class="new-space-listings">' +
//                         '<div class="photo-listings">' +
//                             '<i class="fa fa-camera"></i>' +
//                         '</div>' +
//                         '<div class="space-info">' +
//                             '<div class="space-type">' +
//                                 '<p><input type="text" class="type" value="Workspace type"></p>' +
//                                 '<p><input type="text" class="seats" value="# of seats"></p>' +
//                                 '<div><input type="checkbox" id="smoking"><label for="smoking">Smoking</label></div>' +
//                             '</div>' +
//                             '<div class="space-availability">' +
//                                 '<p><input type="date" id="date"></p>' +
//                                 '<p>' +
//                                     '<label for="lease">Lease Length</label>' +
//                                     '<select id="lease" name="lease">' +
//                                         '<option value="Default">--choose--</option>' +
//                                         '<option value="day">One Day</option>' +
//                                         '<option value="week">One Week</option>' +
//                                         '<option value="month">One Month</option>' +
//                                     '</select>' +
//                                 '</p>' +
//                                 '<p><input type="text" class="price" value="Price"' + " onfocus='value=" + '"$"' + "'" + '></p>' +
//                             '</div>' +
//                         '</div>' +
//                     '</div>' +
                    
//                     '<div class="edit-buttons">' +
//                         '<button type="reset" id="btn-cancel-workspace">Cancel</button>' +
//                         '<button type="button" id="btn-submit-workspace">Submit</button>' +
//                     '</div>' +
                    
//                 '</div>   ' +

//                 // hidden Are you Sure? Worksapce Remove Container
//                 '<div class="are-you-sure-workspace">' +
//                     '<p>Are you sure?</p>' +
//                     '<p><button type="button" id="btn-sure-cancel-workspace">Cancel</button></p>' +
//                     '<p><button type="button" id="btn-sure-remove-workspace">Remove</button></p>' +
//                 '</div>' +
//             '</div>';




//             const elemCoworker = '<div id="workspace-box">' +
//                 '<div id="listings-workspace">' +
//                     '<div id="photo-listings"><i class="fa fa-camera"></i></div>' +
//                     '<div id="property-info">' +
//                         '<h2 id="property-title">' + data.workspacesAll[i][j].property[1].propertyName + ' - ' + data.workspacesAll[i][j].workspaceType + '</h2>' +
//                         '<div id="property-address-listings">' +
//                             '<p>' + data.workspacesAll[i][j].property[1].propertyAddress + '</p>' +
//                             '<p>' + data.workspacesAll[i][j].property[1].propertyNeighborhood + '</p>' +
//                             '<p>'+ data.workspacesAll[i][j].property[1].propertySquareFoot + ' SqFT</p>' +
//                             '<div id="parking-transit">' +
//                                 '<p>Parking: ' + parking + '</p>' +
//                                 '<p>Transit: ' + transit + '</p>' +
//                             '</div>' +
//                         '</div>    ' +
//                     '</div>' +
//                     '<div id="workspace-container-listings">' +
//                         '<div id="workspace-info">' +
//                             '<p>Owner: ' + data.workspacesAll[i][j].property[1].propertyOwner.firstName + " " + data.workspacesAll[i][j].property[1].propertyOwner.lastName + '</p>' +
//                             '<p>Seats: ' + data.workspacesAll[i][j].numberOfSeats + '</p>' +
//                             '<p>Available: ' + data.workspacesAll[i][j].dateAvailable + '</p>' +
//                             '<p>Price: ' + data.workspacesAll[i][j].price + '/' + data.workspacesAll[i][j].leaseLength + '</p>' +
//                             '<p>Smoking: ' + smoking + '</p>    ' +
//                         '</div>' +
//                     '</div>' +
//                 '</div>' +
//                 '<div id="listings-buttons">' +
//                     '<div id="ratings-listings">' +
//                         '<p><i class="fa fa-star"></i></p>' +
//                         '<p><i class="fa fa-star"></i></p>' +
//                         '<p><i class="fa fa-star"></i></p>' +
//                         '<p><i class="fa fa-star"></i></p>' +
//                         '<p><i class="fa fa-star"></i></p>' +
//                         '<p id="stars-number">3.5/5 stars</p>    ' +
//                     '</div>' +
//                     '<div id="contact-owner">' +
//                         '<div class="listings-buttons-container">' +
//                             '<button type="button" id="btn-contact-owner">Contact Info</button>' +
//                         '</div>' +
//                     '</div>' +
//                     '<div id="rent-workspace">' +
//                         '<div class="listings-buttons-container">' +
//                             '<button type="button" id="btn-rent-workspace">Rent Workspace</button>' +
//                         '</div>' +
//                     '</div>' +
                    
//                 '</div>' +
//                 '<div id="owner-info-listings">' +
//                     '<div id="owner-name-listings"></div>' +
//                     '<div id="owner-phone-listings"></div>' +
//                     '<div id="owner-email-listings"></div>' +
//                     '<button type="button" id="btn-cancel-owner-info">Cancel</button>' +
//                 '</div>' +
//             '</div>';
            
//             // creates an array help match the workspace child index to the data.workspacesAll array index
//             let temp = {propertyIndex: i, workIndex: j};
            
            
//             // put all workspace box html into the DOM for each array element in data.workspacesAll
//             if (currentUser.owner){
//                 workspaceIndex.push(temp);
//                 $('#put-workspaces-here').after(elemOwner);
//             } else {
//                 // only show unrented workspaces
//                 if (data.workspacesAll[i][j].Available){
//                     workspaceIndex.push(temp);
//                     $('#put-workspaces-here').after(elemCoworker);
//                 }
//             }
            
            
//         }
//     }
    
//     return workspaceIndex;
    
// }

// const workspaceIndex = workspaceDisplay();

// // assigns a workspace to the coworkers rent array
// function rentWorkspace(childIndex) {
//     index = (childIndex + 1 - workspaceIndex.length) * -1;
//     const propertyIndex = workspaceIndex[index].propertyIndex;
//     const workIndex = workspaceIndex[index].workIndex; 
//     data.workspacesAll[propertyIndex][workIndex].Available = false;
//     localStorage.setItem('workspaces', JSON.stringify(data.workspacesAll)); 
    
//     const user = currentUser.userid;
//     const workspace = data.workspacesAll[propertyIndex][workIndex].WorkSpaceID;
//     const rentedTemp = {
//         UserID: user,
//         WorkspaceID: workspace
//     };

//     rentedWorkspaces.push(rentedTemp);
//     localStorage.setItem('rentedSpaces', JSON.stringify(rentedWorkspaces));

// }

// function buttons(){
//     const editPropertyButton = document.querySelectorAll('#btn-edit-property');
//     const removePropertyButton = document.querySelectorAll('#btn-remove-property');
//     const editWorkspaceButton = document.querySelectorAll('#btn-edit-workspace');
//     const removeWorkspaceButton = document.querySelectorAll('#btn-remove-workspace');
//     const editFormContainer = document.querySelectorAll('.edit-form-container');
//     const propertySureContainer = document.querySelectorAll('.are-you-sure-property');
//     const editWorkspaceContainer = document.querySelectorAll('#office-container-listings');
//     const editPropertyCancel = document.querySelectorAll('#btn-cancel-property');
//     const editPropertySubmit = document.querySelectorAll('#btn-submit-property');
//     const removePropertyCancel = document.querySelectorAll('#btn-sure-cancel-property');
//     const removePropertyRemove = document.querySelectorAll('#btn-sure-remove-property');
//     const editWorkspaceCancel = document.querySelectorAll('#btn-cancel-workspace');
//     const editWorkspaceSubmit = document.querySelectorAll('#btn-submit-workspace');
//     const propertyName = document.querySelectorAll('.pName-property-edit');
//     const propertyAddress = document.querySelectorAll('.pAddress-property-edit');
//     const propertyNeighborhood = document.querySelectorAll('.pNeighborhood-property-edit');
//     const propertySqft = document.querySelectorAll('.pSquareFoot-property-edit');
//     const workspaceType = document.querySelectorAll('.type');
//     const workspaceSeats = document.querySelectorAll('.seats');
//     const workspaceSmoking = document.querySelectorAll('#smoking');
//     const workspaceDate = document.querySelectorAll('#date');
//     const workspaceLease = document.querySelectorAll('#lease');
//     const workspacePrice = document.querySelectorAll('.price');
//     const parking = document.querySelectorAll('#garage');
//     const transit = document.querySelectorAll('#transit');
//     const workspaceSureContainer = document.querySelectorAll('.are-you-sure-workspace');
//     const removeWorkspaceCancel = document.querySelectorAll('#btn-sure-cancel-workspace');
//     const removeWorkspaceRemove = document.querySelectorAll('#btn-sure-remove-workspace');
//     const contactOwnerButton = document.querySelectorAll('#btn-contact-owner');
//     const contactOwnerInfo = document.querySelectorAll('#owner-info-listings');
//     const contactOwnerName = document.querySelectorAll('#owner-name-listings');
//     const contactOwnerPhone = document.querySelectorAll('#owner-phone-listings');
//     const contactOwnerEmail = document.querySelectorAll('#owner-email-listings');
//     const contactOwnerCancel = document.querySelectorAll('#btn-cancel-owner-info');
//     const rentWorkspaceButton = document.querySelectorAll('#btn-rent-workspace');

//     //console.log(editFormContainer);

//     // displays the edit property form
//     editPropertyButton.forEach((element, index) => {
//         element.addEventListener('click', ()=>{
//             editFormContainer[index].style.display = "block";
//         });
//     });

//     // once displayed the cancel button will hide the edit property form
//     editPropertyCancel.forEach((element, index) => {
//         element.addEventListener('click', ()=>{
//             editFormContainer[index].style.display = "none";
//         });
//     });

//     // submits the edited property for every workspace (needs validation)
//     editPropertySubmit.forEach((element, childIndex) => {
//         element.addEventListener('click', ()=>{
//             // the element child indexes are populated in the opposite order of the workspaceAll indexes
//             // so we need to recitfy the problem with the formula below.
//             index = (childIndex + 1 - workspaceIndex.length) * -1;
//             const propertyIndex = workspaceIndex[index].propertyIndex;
//             const workIndex = workspaceIndex[index].workIndex;
//             data.workspacesAll[propertyIndex].forEach((property, workIndex) => {
//                 if (workIndex > 0) {
//                 // console.log(propertyName[childIndex].value);
//                 // console.log(data.workspacesAll[propertyIndex][workIndex].property[1].propertyName);
//                 data.workspacesAll[propertyIndex][workIndex].property[1].propertyName = propertyName[childIndex].value;
//                 data.workspacesAll[propertyIndex][workIndex].property[1].propertyAddress = propertyAddress[childIndex].value;
//                 data.workspacesAll[propertyIndex][workIndex].property[1].propertyNeighborhood = propertyNeighborhood[childIndex].value;
//                 data.workspacesAll[propertyIndex][workIndex].property[1].propertySquareFoot = propertySqft[childIndex].value;
//                 data.workspacesAll[propertyIndex][workIndex].property[1].propertyParking = parking[childIndex].checked;
//                 data.workspacesAll[propertyIndex][workIndex].property[1].propertyTransit = transit[childIndex].checked;
//                 }  
//             });
//             editFormContainer[childIndex].style.display = "none";
//             localStorage.setItem('workspaces', JSON.stringify(data.workspacesAll));
            
            
//             window.location.assign("listings.html");
//         });
//     });

//     // displays the "are you sure" query to remove a property
//     removePropertyButton.forEach((element, index) => {
//         element.addEventListener('click', ()=>{
//             propertySureContainer[index].style.display = "flex";
//         });
//     });

//     // once displayed, the cancel button will hide the "are you sure" query
//     removePropertyCancel.forEach((element, index) => {
//         element.addEventListener('click', ()=>{
//             propertySureContainer[index].style.display = "none";
//         });
//     });

//     // the remove button will remove all workspaces in the property from data.workspacesAll
//     removePropertyRemove.forEach((element, childIndex) => {
//         element.addEventListener('click', ()=>{
//             // the element child indexes are populated in the opposite order of the workspaceAll indexes
//             // so we need to recitfy the problem with the formula below.
//             index = (childIndex + 1 - workspaceIndex.length) * -1;
//             const propertyIndex = workspaceIndex[index].propertyIndex;
            
//             data.workspacesAll.splice(propertyIndex, 1);
//             propertySureContainer[index].style.display = "none";
//             localStorage.setItem('workspaces', JSON.stringify(data.workspacesAll));
//             window.location.assign("listings.html");
//         });
//     });

//     editWorkspaceButton.forEach((element, index) => {
//         element.addEventListener('click', ()=>{
//             editWorkspaceContainer[index].style.display = "flex";           
//         });
//     });

//     editWorkspaceCancel.forEach((element, index) => {
//         element.addEventListener('click', ()=>{
//             editWorkspaceContainer[index].style.display = "none";
//         });
//     });

//     editWorkspaceSubmit.forEach((element, childIndex) => {
//         element.addEventListener('click', ()=>{
//             index = (childIndex + 1 - workspaceIndex.length) * -1;
//             const propertyIndex = workspaceIndex[index].propertyIndex;
//             const workIndex = workspaceIndex[index].workIndex;
//             data.workspacesAll[propertyIndex][workIndex].workspaceType = workspaceType[childIndex].value;
//             data.workspacesAll[propertyIndex][workIndex].numberOfSeats = workspaceSeats[childIndex].value;
//             data.workspacesAll[propertyIndex][workIndex].smoking = workspaceSmoking[childIndex].checked;
//             data.workspacesAll[propertyIndex][workIndex].dateAvailable = workspaceDate[childIndex].value;
//             data.workspacesAll[propertyIndex][workIndex].leaseLength = workspaceLease[childIndex].value;
//             data.workspacesAll[propertyIndex][workIndex].price = workspacePrice[childIndex].value;

//             editWorkspaceContainer[index].style.display = "none";
//             localStorage.setItem('workspaces', JSON.stringify(data.workspacesAll));
//             window.location.assign("listings.html");
//         });
//     });

//     // displays the "are you sure" query to remove a workspace
//     removeWorkspaceButton.forEach((element, index) => {
//         element.addEventListener('click', ()=>{
//             workspaceSureContainer[index].style.display = "flex";
//         });
//     });

//     // once displayed, the cancel button will hide the "are you sure" query
//     removeWorkspaceCancel.forEach((element, index) => {
//         element.addEventListener('click', ()=>{
//             workspaceSureContainer[index].style.display = "none";
//         });
//     });

//     // the remove button will remove all workspaces in the property from data.workspacesAll
//     removeWorkspaceRemove.forEach((element, childIndex) => {
//         element.addEventListener('click', ()=>{
//             // the element child indexes are populated in the opposite order of the workspaceAll indexes
//             // so we need to recitfy the problem with the formula below.
//             index = (childIndex + 1 - workspaceIndex.length) * -1;
//             const propertyIndex = workspaceIndex[index].propertyIndex;
//             const workIndex = workspaceIndex[index].workIndex;
//             console.log("propertyIndex: ", propertyIndex);
//             console.log("workIndex: ", workIndex);
            
//             data.workspacesAll[propertyIndex].splice(workIndex, 1);
//             propertySureContainer[childIndex].style.display = "none";
//             localStorage.setItem('workspaces', JSON.stringify(data.workspacesAll));
//             window.location.assign("listings.html");
//         });
//     });

//     contactOwnerButton.forEach((element, childIndex) => {
//         element.addEventListener('click', () => {
//             contactOwnerInfo[childIndex].style.display = "flex";

//             var index = (childIndex + 1 - workspaceIndex.length) * -1;
//             const propertyIndex = workspaceIndex[index].propertyIndex;
//             const workIndex = workspaceIndex[index].workIndex;
//             contactOwnerName[childIndex].innerHTML = "Name: " + data.workspacesAll[propertyIndex][workIndex].property[1].propertyOwner.firstName + " " + data.workspacesAll[propertyIndex][workIndex].property[1].propertyOwner.lastName;
//             contactOwnerPhone[childIndex].innerHTML = "Phone: " + data.workspacesAll[propertyIndex][workIndex].property[1].propertyOwner.phone;
//             contactOwnerEmail[childIndex].innerHTML = "Email: " + data.workspacesAll[propertyIndex][workIndex].property[1].propertyOwner.username;
//         });
//     });

//     contactOwnerCancel.forEach((element, index) => {
//         element.addEventListener('click', () => {
//             contactOwnerInfo[index].style.display = "none";
//         });
//     });

//     rentWorkspaceButton.forEach((element, childIndex) => {
//         element.addEventListener('click', ()=> {
//             rentWorkspace(childIndex);
//             window.location.assign("listings.html");
//         });
//     });

// }

// buttons();