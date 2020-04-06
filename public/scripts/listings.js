/* Functionality Fixes
    - Fix filtered rental bug
    - display owner only when user is owner
    
    
  
    - Implement ratings display
    
     
    
    
    - display photos
*/
let currentUser = {};
fetch('http://localhost:3030/user_data')
    .then((res) => res.json())
    .then((data) => {
        console.log("data: ", data);
        currentUser = data.currentUser[0];
        displayArray = [];
        let propertyIndex = 0;
        console.log("currentUser.usertype: ", currentUser.usertype);
        function setPage(){
            // changes navbar display based on usertype
            if (currentUser.usertype == "owner"){
                document.getElementById('links').innerHTML = "<li><a href='http://localhost:3030/listings'>Listings</a></li><ul><li><a href='http://localhost:3030/update'>Update</a></ul>";
            }
            if (currentUser.fname != undefined){
                document.getElementById('signIn').innerHTML = "<li><a href='http://localhost:3030/account' id='welcome'>Welcome, " + currentUser.fname + "</a></li>"
            } else {
                document.getElementById('signIn').innerHTML = "<li><a href='http://localhost:3030/signIn'>Sign In</a></li>"
            }

            // intitializing the displayArray
            
            data.workspacesAll.forEach((workspace, index) => {
                if (index > 0) {
                    displayArray.push(workspace);
                    console.log("display on load: ", displayArray);
                };
            });
            
        };
        setPage();

        // Filter Drop Down boxes
        function filters() {
            workspaceBox = document.querySelectorAll('#workspace-box'); 
            const propertyNameFilter = document.getElementById('property-name-filter');
            const propertyAddressFilter = document.getElementById('property-address-filter');
            const propertyNeighborhoodFilter = document.getElementById('property-neighborhood-filter');
            const propertySqftFilter = document.getElementById('property-sqft-filter');
            const workspaceTypeFilter = document.getElementById('workspace-type-filter');
            const workspaceDateFilter = document.getElementById('workspace-date-available-filter');
            const workspacePriceFilter = document.getElementById('workspace-price-filter');
            const workspaceLeaseFilter = document.getElementById('workspace-lease-filter');
            const workspaceSeatsFilter = document.getElementById('workspace-seats-filter');
            const propertyGarageFilter = document.getElementById('garage');
            const propertyTransitFilter = document.getElementById('transit');
            const workspaceSmokingFilter = document.getElementById('smoking');


            // fill in values for the drop down boxes
            let dropDownValues = [];
            data.workspacesAll.forEach((workspaces, index) => {
                if (index > 0){
                    //console.log("filter workspace: ", workspace);
                    let notUnique = dropDownValues.includes(workspaces.property[1].propertyName);
                    if (!notUnique){
                        dropDownValues.push(workspaces.property[1].propertyName);
                        propertyNameFilter.innerHTML += `<option value="${workspaces.property[1].propertyName}">${workspaces.property[1].propertyName}</option>`;
                    }
                }
            });
            dropDownValues = [];
            data.workspacesAll.forEach((workspaces, index) => {
                if (index > 0){
                    //console.log("filter workspace: ", workspace);
                    notUnique = dropDownValues.includes(workspaces.property[1].propertyAddress);
                    if (!notUnique){
                        dropDownValues.push(workspaces.property[1].propertyAddress);
                        propertyAddressFilter.innerHTML += `<option value="${workspaces.property[1].propertyAddress}">${workspaces.property[1].propertyAddress}</option>`;
                    }
                }
            });
            dropDownValues = [];
            data.workspacesAll.forEach((workspaces, index) => {
                if (index > 0){
                    //console.log("filter workspace: ", workspace);
                    notUnique = dropDownValues.includes(workspaces.property[1].propertyNeighborhood);
                    if (!notUnique){
                        dropDownValues.push(workspaces.property[1].propertyNeighborhood);
                        propertyNeighborhoodFilter.innerHTML += `<option value="${workspaces.property[1].propertyNeighborhood}">${workspaces.property[1].propertyNeighborhood}</option>`;
                    }
                }
            });
            dropDownValues = [];
            data.workspacesAll.forEach((workspaces, index) => {
                if (index > 0){
                    //console.log("filter workspace: ", workspace);
                    notUnique = dropDownValues.includes(workspaces.property[1].propertySquareFoot);
                    if (!notUnique){
                        dropDownValues.push(workspaces.property[1].propertySquareFoot);
                        propertySqftFilter.innerHTML += `<option value="${workspaces.property[1].propertySquareFoot}">${workspaces.property[1].propertySquareFoot}</option>`;
                    }
                }
            });
            dropDownValues = [];
            data.workspacesAll.forEach((workspaces, index) => {
                if (index > 0){
                    //console.log("filter workspace: ", workspace);
                    notUnique = dropDownValues.includes(workspaces.workspaceType);
                    if (!notUnique){
                        dropDownValues.push(workspaces.workspaceType);
                        workspaceTypeFilter.innerHTML += `<option value="${workspaces.workspaceType}">${workspaces.workspaceType}</option>`;
                    }
                }
            });
            dropDownValues = [];
            data.workspacesAll.forEach((workspaces, index) => {
                if (index > 0){
                    //console.log("filter workspace: ", workspace);
                    notUnique = dropDownValues.includes(workspaces.workspaceType);
                    if (!notUnique){
                        dropDownValues.push(workspaces.workspaceType);
                        workspaceDateFilter.innerHTML += `<option value="${workspaces.dateAvailable}">${workspaces.dateAvailable}</option>`;
                    }
                }
            });


            // once a drop down box has been selected, filter the display to match the selection
            propertyNameFilter.addEventListener('change', () => {
                console.log("displayArray before: ", displayArray);
                //console.log("propertyNameFilter.value: ", propertyNameFilter.value);
                newDisplay = data.workspacesAll.filter((element, index) => {
                    //console.log("element: ", element);
                    if (index > 0) return element.property[1].propertyName == propertyNameFilter.value;
                });
                
                displayArray = newDisplay;
                console.log("workspaceBox: ", workspaceBox);
                workspaceBox.forEach(() => {
                    $('#workspace-box').remove();
                });
                console.log("displayArray after: ", displayArray);
                workspaceIndex = workspaceDisplay();
            });
            propertyAddressFilter.addEventListener('change', () => {
                console.log("displayArray before: ", displayArray);
                //console.log("propertyNameFilter.value: ", propertyNameFilter.value);
                newDisplay = data.workspacesAll.filter((element, index) => {
                    //console.log("element: ", element);
                    if (index > 0) return element.property[1].propertyAddress == propertyAddressFilter.value;
                });
                
                displayArray = newDisplay;
                console.log("workspaceBox: ", workspaceBox);
                workspaceBox.forEach(() => {
                    
                    $('#workspace-box').remove();
                });
                console.log("displayArray after: ", displayArray);
                workspaceIndex = workspaceDisplay();
            });
            propertyNeighborhoodFilter.addEventListener('change', () => {
                console.log("displayArray before: ", displayArray);
                //console.log("propertyNameFilter.value: ", propertyNameFilter.value);
                newDisplay = data.workspacesAll.filter((element, index) => {
                    //console.log("element: ", element);
                    if (index > 0) return element.property[1].propertyNeighborhood == propertyNeighborhoodFilter.value;
                });
                
                displayArray = newDisplay;
                console.log("workspaceBox: ", workspaceBox);
                workspaceBox.forEach(() => {
                    
                    $('#workspace-box').remove();
                });
                console.log("displayArray after: ", displayArray);
                workspaceIndex = workspaceDisplay();
            });
            propertySqftFilter.addEventListener('change', () => {
                console.log("displayArray before: ", displayArray);
                //console.log("propertyNameFilter.value: ", propertyNameFilter.value);
                newDisplay = data.workspacesAll.filter((element, index) => {
                    //console.log("element: ", element);
                    if (index > 0) return element.property[1].propertySquareFoot == propertySqftFilter.value;
                });
                
                displayArray = newDisplay;
                console.log("workspaceBox: ", workspaceBox);
                workspaceBox.forEach(() => {
                    
                    $('#workspace-box').remove();
                });
                console.log("displayArray after: ", displayArray);
                workspaceIndex = workspaceDisplay();
            });
            workspaceTypeFilter.addEventListener('change', () => {
                console.log("displayArray before: ", displayArray);
                //console.log("propertyNameFilter.value: ", propertyNameFilter.value);
                newDisplay = data.workspacesAll.filter((element, index) => {
                    //console.log("element: ", element);
                    if (index > 0) return element.workspaceType == workspaceTypeFilter.value;
                });
                
                displayArray = newDisplay;
                console.log("workspaceBox: ", workspaceBox);
                workspaceBox.forEach(() => {
                    
                    $('#workspace-box').remove();
                });
                console.log("displayArray after: ", displayArray);
                workspaceIndex = workspaceDisplay();
            });
            workspaceDateFilter.addEventListener('change', () => {
                console.log("displayArray before: ", displayArray);
                //console.log("propertyNameFilter.value: ", propertyNameFilter.value);
                newDisplay = data.workspacesAll.filter((element, index) => {
                    //console.log("element: ", element);
                    if (index > 0) return parseInt(element.dateAvailable.replace(/[-,]+/g, "")) > parseInt(workspaceDateFilter.value.replace(/[-,]+/g, ""));
                });
                
                displayArray = newDisplay;
                console.log("workspaceBox: ", workspaceBox);
                workspaceBox.forEach(() => {
                    
                    $('#workspace-box').remove();
                });
                console.log("displayArray after: ", displayArray);
                workspaceIndex = workspaceDisplay();
            });
            workspacePriceFilter.addEventListener('change', () => {
                console.log("displayArray before: ", displayArray);
                //console.log("propertyNameFilter.value: ", propertyNameFilter.value);
                newDisplay = data.workspacesAll.filter((element, index) => {
                    //console.log("element: ", element);
                    if (index > 0) {
                        if (workspacePriceFilter.value == "500") return parseInt(element.price.replace(/[$,]+/g, "")) <= 500;
                        else if (workspacePriceFilter.value == "501-1000") return parseInt(element.price.replace(/[$,]+/g, "")) > 500 && parseInt(element.price.replace(/[$,]+/g, "")) <= 1000;
                        else if (workspacePriceFilter.value == "1001-2000") return parseInt(element.price.replace(/[$,]+/g, "")) > 1000 && parseInt(element.price.replace(/[$,]+/g, "")) <= 2000;
                        else if (workspacePriceFilter.value == "2001") return parseInt(element.price.replace(/[$,]+/g, "")) > 2000;
                    }
                    
                });
                
                displayArray = newDisplay;
                console.log("workspaceBox: ", workspaceBox);
                workspaceBox.forEach(() => {
                    
                    $('#workspace-box').remove();
                });
                console.log("displayArray after: ", displayArray);
                workspaceIndex = workspaceDisplay();
            });
            workspaceLeaseFilter.addEventListener('change', () => {
                console.log("displayArray before: ", displayArray);
                //console.log("propertyNameFilter.value: ", propertyNameFilter.value);
                newDisplay = data.workspacesAll.filter((element, index) => {
                    //console.log("element: ", element);
                    if (index > 0) return element.leaseLength == workspaceLeaseFilter.value;
                });
                
                displayArray = newDisplay;
                console.log("workspaceBox: ", workspaceBox);
                workspaceBox.forEach(() => {
                    
                    $('#workspace-box').remove();
                });
                console.log("displayArray after: ", displayArray);
                workspaceIndex = workspaceDisplay();
            });
            workspaceSeatsFilter.addEventListener('change', () => {
                console.log("displayArray before: ", displayArray);
                //console.log("propertyNameFilter.value: ", propertyNameFilter.value);
                newDisplay = data.workspacesAll.filter((element, index) => {
                    //console.log("element: ", element);
                    if (index > 0) {
                        if (workspaceSeatsFilter.value == "1") return parseInt(element.numberOfSeats) <= 1;
                        else if (workspaceSeatsFilter.value == "2-20") return parseInt(element.numberOfSeats) > 1 && parseInt(element.numberOfSeats) <= 20;
                        else if (workspaceSeatsFilter.value == "21-250") return parseInt(element.numberOfSeats) > 20 && parseInt(element.numberOfSeats) <= 250;
                        else if (workspaceSeatsFilter.value == "251") return parseInt(element.numberOfSeats) > 250;
                    }
                    
                });
                
                displayArray = newDisplay;
                console.log("workspaceBox: ", workspaceBox);
                workspaceBox.forEach(() => {
                    
                    $('#workspace-box').remove();
                });
                console.log("displayArray after: ", displayArray);
                workspaceIndex = workspaceDisplay();
            });
            propertyGarageFilter.addEventListener('change', () => {
                console.log("displayArray before: ", displayArray);
                //console.log("propertyNameFilter.value: ", propertyNameFilter.value);
                newDisplay = data.workspacesAll.filter((element, index) => {
                    //console.log("element: ", element);
                    if (index > 0) return element.property[1].propertyParking == true;
                });
                
                displayArray = newDisplay;
                console.log("workspaceBox: ", workspaceBox);
                workspaceBox.forEach(() => {
                    
                    $('#workspace-box').remove();
                });
                console.log("displayArray after: ", displayArray);
                workspaceIndex = workspaceDisplay();
            });
            propertyTransitFilter.addEventListener('change', () => {
                console.log("displayArray before: ", displayArray);
                //console.log("propertyNameFilter.value: ", propertyNameFilter.value);
                newDisplay = data.workspacesAll.filter((element, index) => {
                    //console.log("element: ", element);
                    if (index > 0) return element.property[1].propertyTransit == true;
                });
                
                displayArray = newDisplay;
                console.log("workspaceBox: ", workspaceBox);
                workspaceBox.forEach(() => {
                    
                    $('#workspace-box').remove();
                });
                console.log("displayArray after: ", displayArray);
                workspaceIndex = workspaceDisplay();
            });
            workspaceSmokingFilter.addEventListener('change', () => {
                console.log("displayArray before: ", displayArray);
                //console.log("propertyNameFilter.value: ", propertyNameFilter.value);
                newDisplay = data.workspacesAll.filter((element, index) => {
                    //console.log("element: ", element);
                    if (index > 0) return element.smoking == true;
                });
                
                displayArray = newDisplay;
                console.log("workspaceBox: ", workspaceBox);
                workspaceBox.forEach(() => {
                    
                    $('#workspace-box').remove();
                });
                console.log("displayArray after: ", displayArray);
                workspaceIndex = workspaceDisplay();
            });
        }
        
        // Sort the display based on an Ascending button push
        function sortArrayAsc(index){
            console.log("Display before sort: ", displayArray);
            // switch/case based on asc button index
            switch (index) {
                case 0:
                    displayArray.sort(function (a,b) { 
                        var x = a.property[1].propertyName.toLowerCase();
                        var y = b.property[1].propertyName.toLowerCase();
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    break;
                case 1: 
                    displayArray.sort(function (a,b) { 
                        var x = a.property[1].propertyAddress.toLowerCase();
                        var y = b.property[1].propertyAddress.toLowerCase();
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    break;
                case 2: 
                    displayArray.sort(function (a,b) { 
                        var x = a.property[1].propertyNeighborhood.toLowerCase();
                        var y = b.property[1].propertyNeighborhood.toLowerCase();
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    break;
                case 3: 
                    displayArray.sort(function (a,b) { 
                        var x = parseInt(a.property[1].propertySquareFoot);
                        var y = parseInt(b.property[1].propertySquareFoot);
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    break;
                case 4: 
                    displayArray.sort(function (a,b) { 
                        var x = a.workspaceType.toLowerCase();
                        var y = b.workspaceType.toLowerCase();
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    break;
                case 5: 
                    displayArray.sort(function (a,b) { 
                        var x = parseInt(a.dateAvailable.replace(/[-,]+/g, ""));
                        var y = parseInt(b.dateAvailable.replace(/[-,]+/g, ""));
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    break;
                case 6: 
                    displayArray.sort(function (a,b) { 
                        var x = parseInt(a.price.replace(/[$,]+/g, ""));
                        var y = parseInt(b.price.replace(/[$,]+/g, ""));
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    break;
                case 7: 
                    displayArray.sort(function (a,b) {
                        function leaseConvert(value){
                            switch (value){
                                case "day":
                                    return 1;
                                case "week":
                                    return 7;
                                case "month":
                                    return 30;
                            }
                        } 
                        var x = leaseConvert(a.leaseLength.toLowerCase());
                        var y = leaseConvert(b.leaseLength.toLowerCase());
                        
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    break;
                case 8: 
                    displayArray.sort(function (a,b) { 
                        var x = parseInt(a.numberOfSeats);
                        var y = parseInt(b.numberOfSeats);
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    break;
            };
            
            
            console.log("Display after sort: ", displayArray)
        };

        function sortArrayDesc(index){
            console.log("Display before sort: ", displayArray);
            switch (index) {
                case 0:
                    displayArray.sort(function (a,b) { 
                        var x = a.property[1].propertyName.toLowerCase();
                        var y = b.property[1].propertyName.toLowerCase();
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    displayArray.reverse();
                    break;
                case 1: 
                    displayArray.sort(function (a,b) { 
                        var x = a.property[1].propertyAddress.toLowerCase();
                        var y = b.property[1].propertyAddress.toLowerCase();
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    displayArray.reverse();
                    break;
                case 2: 
                    displayArray.sort(function (a,b) { 
                        var x = a.property[1].propertyNeighborhood.toLowerCase();
                        var y = b.property[1].propertyNeighborhood.toLowerCase();
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    displayArray.reverse();
                    break;
                case 3: 
                    displayArray.sort(function (a,b) { 
                        var x = parseInt(a.property[1].propertySquareFoot);
                        var y = parseInt(b.property[1].propertySquareFoot);
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    displayArray.reverse();
                    break;
                case 4: 
                    displayArray.sort(function (a,b) { 
                        var x = a.workspaceType.toLowerCase();
                        var y = b.workspaceType.toLowerCase();
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    displayArray.reverse();
                    break;
                case 5: 
                    displayArray.sort(function (a,b) { 
                        var x = parseInt(a.dateAvailable.replace(/[-,]+/g, ""));
                        var y = parseInt(b.dateAvailable.replace(/[-,]+/g, ""));
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    displayArray.reverse();
                    break;
                case 6: 
                    displayArray.sort(function (a,b) { 
                        var x = parseInt(a.price.replace(/[$,]+/g, ""));
                        var y = parseInt(b.price.replace(/[$,]+/g, ""));
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    displayArray.reverse();
                    break;
                case 7: 
                    displayArray.sort(function (a,b) {
                        function leaseConvert(value){
                            switch (value){
                                case "day":
                                    return 1;
                                case "week":
                                    return 7;
                                case "month":
                                    return 30;
                            }
                        } 
                        var x = leaseConvert(a.leaseLength.toLowerCase());
                        var y = leaseConvert(b.leaseLength.toLowerCase());
                        
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    displayArray.reverse();
                    break;
                case 8: 
                    displayArray.sort(function (a,b) { 
                        var x = parseInt(a.numberOfSeats);
                        var y = parseInt(b.numberOfSeats);
                        if (x < y) return -1;
                        if (x > y) return 1;
                        return 0;    
                    });
                    displayArray.reverse();
                    break;
                }
            console.log("Display after sort: ", displayArray);
        };
        /////
        // Filter and Sort buttons
        //
        // - Sort buttons can be done in Switch/Case with querySelectorAll
        // - Filter dropdowns needs to search through workspacesAll to populate values
        // - Need a submit button? 
        // - Need to remember filter and sort values 
        // - Need to display from a display array
        //
        /////

        

        function workspaceDisplay(){
            console.log("data.workspacesAll: ", data.workspacesAll);
            let parking, transit;
            let workspaceIndex = [];
            //fix array iterations
            for (let i = 0; i < displayArray.length; i++) {
                  
            
                if (displayArray[i].property[1].propertyParking) {
                    parking = "Yes";
                } else {
                    parking = "No";
                }
                if (displayArray[i].property[1].propertyTransit) {
                    transit = "Yes";
                } else {
                    transit = "No";
                }
                if (displayArray[i].smoking){
                    smoking = "Yes";
                } else {
                    smoking = "No";
                }
    
                // pass all html for each workspace box into a string variable
                const elemOwner = '<div id="workspace-box">' +
                    '<div id="listings-workspace">' +
                        '<div id="photo-listings"><i class="fa fa-camera"></i></div>' +
                        '<div id="property-info">' +
                            '<h2 id="property-title">' + displayArray[i].property[1].propertyName + ' - ' + displayArray[i].workspaceType + '</h2>' +
                            '<div id="property-address-listings">' +
                                '<p>' + displayArray[i].property[1].propertyAddress + '</p>' +
                                '<p>' + displayArray[i].property[1].propertyNeighborhood + '</p>' +
                                '<p>'+ displayArray[i].property[1].propertySquareFoot + ' SqFT</p>' +
                                '<div id="parking-transit">' +
                                    '<p>Parking: ' + parking + '</p>' +
                                    '<p>Transit: ' + transit + '</p>' +
                                '</div>' +
                            '</div>    ' +
                        '</div>' +
                        '<div id="workspace-container-listings">' +
                            '<div id="workspace-info">' +
                                '<p>Owner: ' + displayArray[i].property[1].propertyOwner.fname + " " + displayArray[i].property[1].propertyOwner.lname + '</p>' +
                                '<p>Seats: ' + displayArray[i].numberOfSeats + '</p>' +
                                '<p>Available: ' + displayArray[i].dateAvailable + '</p>' +
                                '<p>Price: ' + displayArray[i].price + '/' + displayArray[i].leaseLength + '</p>' +
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
                            '<button type="submit" id="btn-submit-property">Submit</button>' +
                        '</div>' +
                    '</div>' +
    
                    // hidden Are you Sure? Property Remove Container
                    '<div class="are-you-sure-property">' +
                        '<p>Are you sure? This will erase all workspaces in the property.</p>' +
                        '<p><button type="button" id="btn-sure-cancel-property">Cancel</button></p>' +
                        '<p><button type="submit" id="btn-sure-remove-property">Remove</button></p>' +
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
                                '<button type="submit" id="btn-submit-workspace">Submit</button>' +
                            '</div>' +
                            
                        '</div>   ' +
                     
    
                    // hidden Are you Sure? Worksapce Remove Container
                    '<div class="are-you-sure-workspace">' +
                        '<p>Are you sure?</p>' +
                        '<p><button type="button" id="btn-sure-cancel-workspace">Cancel</button></p>' +
                        '<p><button type="submit" id="btn-sure-remove-workspace">Remove</button></p>' +
                    '</div>' +
                '</div>';
    
    
    
    
                const elemCoworker = '<div id="workspace-box">' +
                    '<div id="listings-workspace">' +
                        '<div id="photo-listings"><i class="fa fa-camera"></i></div>' +
                        '<div id="property-info">' +
                            '<h2 id="property-title">' + displayArray[i].property[1].propertyName + ' - ' + displayArray[i].workspaceType + '</h2>' +
                            '<div id="property-address-listings">' +
                                '<p>' + displayArray[i].property[1].propertyAddress + '</p>' +
                                '<p>' + displayArray[i].property[1].propertyNeighborhood + '</p>' +
                                '<p>'+ displayArray[i].property[1].propertySquareFoot + ' SqFT</p>' +
                                '<div id="parking-transit">' +
                                    '<p>Parking: ' + parking + '</p>' +
                                    '<p>Transit: ' + transit + '</p>' +
                                '</div>' +
                            '</div>    ' +
                        '</div>' +
                        '<div id="workspace-container-listings">' +
                            '<div id="workspace-info">' +
                                '<p>Owner: ' + displayArray[i].property[1].propertyOwner.fname + " " + displayArray[i].property[1].propertyOwner.lname + '</p>' +
                                '<p>Seats: ' + displayArray[i].numberOfSeats + '</p>' +
                                '<p>Available: ' + displayArray[i].dateAvailable + '</p>' +
                                '<p>Price: ' + displayArray[i].price + '/' + displayArray[i].leaseLength + '</p>' +
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
                                '<button type="button" class="btn-contact-owner">Contact Info</button>' +
                            '</div>' +
                        '</div>' +
                        '<div id="rent-workspace">' +
                            '<div class="listings-buttons-container">' +
                                '<button type="submit" id="btn-rent-workspace">Rent Workspace</button>' +
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
                let temp = {propertyIndex: displayArray[i].WorkSpaceID};
                console.log("hello");
                console.log("currentUser.usertype: ", currentUser.usertype);
                // put all workspace box html into the DOM for each array element in data.workspacesAll
                if (currentUser.usertype == "owner"){
                    workspaceIndex.push(temp);
                    $('#put-workspaces-here').after(elemOwner);
                } else {
                    // only show unrented workspaces
                    if (displayArray[i].Available){
                        workspaceIndex.push(temp);
                        $('#put-workspaces-here').after(elemCoworker);
                    }
                }
                    
                    
                
            }
            
            return workspaceIndex;
            
        }
        //console.log("hello");
        

        // assigns a workspace to the coworkers rent array
        function rentWorkspace(childIndex) {
            index = (childIndex + 1 - workspaceIndex.length) * -1;
            data.workspacesAll.forEach((element, windex) => {
                if (workspaceIndex[index].propertyIndex == element.WorkSpaceID) {
                    propertyIndex = windex;
                }
            });
            //const workIndex = workspaceIndex[index].workIndex; 
            data.workspacesAll[propertyIndex].Available = false;
            localStorage.setItem('workspaces', JSON.stringify(data.workspacesAll)); 
            
            const user = currentUser.ID;
            const workspace = data.workspacesAll[propertyIndex].WorkSpaceID;
            const rentedTemp = {
                UserID: user,
                WorkspaceID: workspace
            };
            //console.log("rentedTemp: ", rentedTemp);
            data.rentedWorkspaces.push(rentedTemp);
            //localStorage.setItem('rentedSpaces', JSON.stringify(rentedWorkspaces));

        }

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
            const contactOwnerButton = document.querySelectorAll('.btn-contact-owner');
            const contactOwnerInfo = document.querySelectorAll('#owner-info-listings');
            const contactOwnerName = document.querySelectorAll('#owner-name-listings');
            const contactOwnerPhone = document.querySelectorAll('#owner-phone-listings');
            const contactOwnerEmail = document.querySelectorAll('#owner-email-listings');
            const contactOwnerCancel = document.querySelectorAll('#btn-cancel-owner-info');
            const rentWorkspaceButton = document.querySelectorAll('#btn-rent-workspace');
            const ascSortButton = document.querySelectorAll('.btn-ascending');
            const descSortButton = document.querySelectorAll('.btn-descending');
            const workspaceBox = document.querySelectorAll('#workspace-box');
        
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
                    data.workspacesAll.forEach((element, windex) => {
                        if (workspaceIndex[index].propertyIndex == element.WorkSpaceID) {
                            propertyIndex = windex;
                        }
                    });
                    //const workIndex = workspaceIndex[index].workIndex;
                    
                    // console.log(propertyName[childIndex].value);
                    // console.log(data.workspacesAll[propertyIndex].property[1].propertyName);
                    console.log(data);
                    // cycle through all workspaces to find property ids that match the id that was edited
                    data.workspacesAll.forEach((workspace, index) => {
                        
                        if (index > 0) {
                            // console.log("list: ", workspace.property[1].propertyID);
                            // console.log("edited: ", data.workspacesAll[propertyIndex].property[1].propertyID);
                            if (workspace.property[1].propertyID == data.workspacesAll[propertyIndex].property[1].propertyID){
                                data.workspacesAll[index].property[1].propertyName = propertyName[childIndex].value;
                                data.workspacesAll[index].property[1].propertyAddress = propertyAddress[childIndex].value;
                                data.workspacesAll[index].property[1].propertyNeighborhood = propertyNeighborhood[childIndex].value;
                                data.workspacesAll[index].property[1].propertySquareFoot = propertySqft[childIndex].value;
                                data.workspacesAll[index].property[1].propertyParking = parking[childIndex].checked;
                                data.workspacesAll[index].property[1].propertyTransit = transit[childIndex].checked;
                            }
                        }
                    });
                    
                        
                    editFormContainer[childIndex].style.display = "none";
                    //places all the data in a hidden input box to be grabbed by the server editWorkspace POST API
                    const propertyholder = document.getElementById("propertyholder");
                    propertyholder.value = JSON.stringify(data);
                    // localStorage.setItem('workspaces', JSON.stringify(data.workspacesAll));
                    
                    
                    // window.location.assign("listings.html");
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
                    data.workspacesAll.forEach((element, windex) => {
                        if (workspaceIndex[index].propertyIndex == element.WorkSpaceID) {
                            propertyIndex = windex;
                        }
                    });

                    data.workspacesAll.forEach((workspace, index) => {
                        if (index > 0) {
                            // console.log("list: ", workspace.property[1].propertyID);
                            // console.log("edited: ", data.workspacesAll[propertyIndex].property[1].propertyID);
                            if (workspace.property[1].propertyID == data.workspacesAll[propertyIndex].property[1].propertyID){
                                data.workspacesAll.splice(index, 1);
                                propertySureContainer[childIndex].style.display = "none";
                                console.log(data);
                                const propertyholder = document.getElementById("propertyholder");
                                propertyholder.value = JSON.stringify(data);
                                // 
                            }
                        }
                    });
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
                    data.workspacesAll.forEach((element, windex) => {
                        if (workspaceIndex[index].propertyIndex == element.WorkSpaceID) {
                            propertyIndex = windex;
                        }
                    });
                    // console.log("propertyIndex", propertyIndex);
                    // console.log("workspaceType[childIndex].value: ", workspaceType[childIndex].value);
                    // console.log("data.workspacesAll[propertyIndex].workspaceType: ", data.workspacesAll[propertyIndex].workspaceType);
                    //const workIndex = workspaceIndex[index].workIndex;
                    data.workspacesAll[propertyIndex].workspaceType = workspaceType[childIndex].value;
                    data.workspacesAll[propertyIndex].numberOfSeats = workspaceSeats[childIndex].value;
                    data.workspacesAll[propertyIndex].smoking = workspaceSmoking[childIndex].checked;
                    data.workspacesAll[propertyIndex].dateAvailable = workspaceDate[childIndex].value;
                    data.workspacesAll[propertyIndex].leaseLength = workspaceLease[childIndex].value;
                    data.workspacesAll[propertyIndex].price = workspacePrice[childIndex].value;
        
                    editWorkspaceContainer[index].style.display = "none";
                    //console.log("data: ", data);
                    const propertyholder = document.getElementById("propertyholder");
                    propertyholder.value = JSON.stringify(data);
                        
                    // localStorage.setItem('workspaces', JSON.stringify(data.workspacesAll));
                    // window.location.assign("listings.html");
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
                    data.workspacesAll.forEach((element, windex) => {
                        if (workspaceIndex[index].propertyIndex == element.WorkSpaceID) {
                            propertyIndex = windex;
                        }
                    });
                    //const workIndex = workspaceIndex[index].workIndex;
                    console.log("propertyIndex: ", propertyIndex);
                    //console.log("workIndex: ", workIndex);
                    
                    data.workspacesAll.splice(propertyIndex, 1);
                    propertySureContainer[childIndex].style.display = "none";
                    const propertyholder = document.getElementById("propertyholder");
                    propertyholder.value = JSON.stringify(data);

                    // localStorage.setItem('workspaces', JSON.stringify(data.workspacesAll));
                    // window.location.assign("listings.html");
                });
            });
        
            contactOwnerButton.forEach((element, childIndex) => {
                element.addEventListener('click', () => {
                    console.log("hello");
                    contactOwnerInfo[childIndex].style.display = "flex";
                    propertyIndex = 0;
                    var index = (childIndex + 1 - workspaceIndex.length) * -1;
                    //match the id in the display index to a workspace index
                    data.workspacesAll.forEach((element, windex) => {
                        if (workspaceIndex[index].propertyIndex == element.WorkSpaceID) {
                            propertyIndex = windex;
                        }
                    });
                    //propertyIndex = workspaceIndex[index].propertyIndex;
                    //const workIndex = workspaceIndex[index].workIndex;
                    contactOwnerName[childIndex].innerHTML = "Name: " + data.workspacesAll[propertyIndex].property[1].propertyOwner.fname + " " + data.workspacesAll[propertyIndex].property[1].propertyOwner.lname;
                    contactOwnerPhone[childIndex].innerHTML = "Phone: " + data.workspacesAll[propertyIndex].property[1].propertyOwner.phone;
                    contactOwnerEmail[childIndex].innerHTML = "Email: " + data.workspacesAll[propertyIndex].property[1].propertyOwner.username;
                });
            });
        
            contactOwnerCancel.forEach((element, index) => {
                element.addEventListener('click', () => {
                    contactOwnerInfo[index].style.display = "none";
                });
            });
        
            rentWorkspaceButton.forEach((element, childIndex) => {
                element.addEventListener('click', ()=> {
                    console.log("hello");
                    rentWorkspace(childIndex);
                    const propertyholder = document.getElementById("propertyholder");
                    propertyholder.value = JSON.stringify(data);
                    // window.location.assign("listings.html");
                });
            });

            // Sort Buttons
            ascSortButton.forEach((button, childIndex) => {
                button.addEventListener('click', ()=> {
                    sortArrayAsc(childIndex);
                    // removes current display before displaying new sorted display
                    workspaceBox.forEach((element) => {
                        $('#workspace-box').remove();
                    });
                    workspaceIndex = workspaceDisplay();
                    console.log("workspaceIndex: ", workspaceIndex);
                    buttons();
                });
            });

            descSortButton.forEach((button, childIndex) => {
                button.addEventListener('click', ()=> {
                    sortArrayDesc(childIndex);
                    // removes current display before displaying new sorted display
                    workspaceBox.forEach((element) => {
                        $('#workspace-box').remove();
                    });
                    workspaceIndex = workspaceDisplay();
                    console.log("workspaceIndex: ", workspaceIndex);
                    buttons();
                });
            });
        
        };
        var workspaceIndex = workspaceDisplay();
        console.log("workspaceIndex: ", workspaceIndex);
        filters();
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
    
//             if (data.workspacesAll[i].property[1].propertyParking) {
//                 parking = "Yes";
//             } else {
//                 parking = "No";
//             }
//             if (data.workspacesAll[i].property[1].propertyTransit) {
//                 transit = "Yes";
//             } else {
//                 transit = "No";
//             }
//             if (data.workspacesAll[i].smoking){
//                 smoking = "Yes";
//             } else {
//                 smoking = "No";
//             }

//             // pass all html for each workspace box into a string variable
//             const elemOwner = '<div id="workspace-box">' +
//                 '<div id="listings-workspace">' +
//                     '<div id="photo-listings"><i class="fa fa-camera"></i></div>' +
//                     '<div id="property-info">' +
//                         '<h2 id="property-title">' + data.workspacesAll[i].property[1].propertyName + ' - ' + data.workspacesAll[i].workspaceType + '</h2>' +
//                         '<div id="property-address-listings">' +
//                             '<p>' + data.workspacesAll[i].property[1].propertyAddress + '</p>' +
//                             '<p>' + data.workspacesAll[i].property[1].propertyNeighborhood + '</p>' +
//                             '<p>'+ data.workspacesAll[i].property[1].propertySquareFoot + ' SqFT</p>' +
//                             '<div id="parking-transit">' +
//                                 '<p>Parking: ' + parking + '</p>' +
//                                 '<p>Transit: ' + transit + '</p>' +
//                             '</div>' +
//                         '</div>    ' +
//                     '</div>' +
//                     '<div id="workspace-container-listings">' +
//                         '<div id="workspace-info">' +
//                             '<p>Owner: ' + data.workspacesAll[i].property[1].propertyOwner.firstName + " " + data.workspacesAll[i].property[1].propertyOwner.lastName + '</p>' +
//                             '<p>Seats: ' + data.workspacesAll[i].numberOfSeats + '</p>' +
//                             '<p>Available: ' + data.workspacesAll[i].dateAvailable + '</p>' +
//                             '<p>Price: ' + data.workspacesAll[i].price + '/' + data.workspacesAll[i].leaseLength + '</p>' +
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
//                         '<h2 id="property-title">' + data.workspacesAll[i].property[1].propertyName + ' - ' + data.workspacesAll[i].workspaceType + '</h2>' +
//                         '<div id="property-address-listings">' +
//                             '<p>' + data.workspacesAll[i].property[1].propertyAddress + '</p>' +
//                             '<p>' + data.workspacesAll[i].property[1].propertyNeighborhood + '</p>' +
//                             '<p>'+ data.workspacesAll[i].property[1].propertySquareFoot + ' SqFT</p>' +
//                             '<div id="parking-transit">' +
//                                 '<p>Parking: ' + parking + '</p>' +
//                                 '<p>Transit: ' + transit + '</p>' +
//                             '</div>' +
//                         '</div>    ' +
//                     '</div>' +
//                     '<div id="workspace-container-listings">' +
//                         '<div id="workspace-info">' +
//                             '<p>Owner: ' + data.workspacesAll[i].property[1].propertyOwner.firstName + " " + data.workspacesAll[i].property[1].propertyOwner.lastName + '</p>' +
//                             '<p>Seats: ' + data.workspacesAll[i].numberOfSeats + '</p>' +
//                             '<p>Available: ' + data.workspacesAll[i].dateAvailable + '</p>' +
//                             '<p>Price: ' + data.workspacesAll[i].price + '/' + data.workspacesAll[i].leaseLength + '</p>' +
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
//                 if (data.workspacesAll[i].Available){
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
//     data.workspacesAll[propertyIndex].Available = false;
//     localStorage.setItem('workspaces', JSON.stringify(data.workspacesAll)); 
    
//     const user = currentUser.userid;
//     const workspace = data.workspacesAll[propertyIndex].WorkSpaceID;
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
//                 // console.log(data.workspacesAll[propertyIndex].property[1].propertyName);
//                 data.workspacesAll[propertyIndex].property[1].propertyName = propertyName[childIndex].value;
//                 data.workspacesAll[propertyIndex].property[1].propertyAddress = propertyAddress[childIndex].value;
//                 data.workspacesAll[propertyIndex].property[1].propertyNeighborhood = propertyNeighborhood[childIndex].value;
//                 data.workspacesAll[propertyIndex].property[1].propertySquareFoot = propertySqft[childIndex].value;
//                 data.workspacesAll[propertyIndex].property[1].propertyParking = parking[childIndex].checked;
//                 data.workspacesAll[propertyIndex].property[1].propertyTransit = transit[childIndex].checked;
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
//             data.workspacesAll[propertyIndex].workspaceType = workspaceType[childIndex].value;
//             data.workspacesAll[propertyIndex].numberOfSeats = workspaceSeats[childIndex].value;
//             data.workspacesAll[propertyIndex].smoking = workspaceSmoking[childIndex].checked;
//             data.workspacesAll[propertyIndex].dateAvailable = workspaceDate[childIndex].value;
//             data.workspacesAll[propertyIndex].leaseLength = workspaceLease[childIndex].value;
//             data.workspacesAll[propertyIndex].price = workspacePrice[childIndex].value;

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
//             contactOwnerName[childIndex].innerHTML = "Name: " + data.workspacesAll[propertyIndex].property[1].propertyOwner.firstName + " " + data.workspacesAll[propertyIndex].property[1].propertyOwner.lastName;
//             contactOwnerPhone[childIndex].innerHTML = "Phone: " + data.workspacesAll[propertyIndex].property[1].propertyOwner.phone;
//             contactOwnerEmail[childIndex].innerHTML = "Email: " + data.workspacesAll[propertyIndex].property[1].propertyOwner.username;
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