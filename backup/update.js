// fix propertyID and workspaceID bugs
// redesign where propertyID and workspaceID are temporarily and finally stored




let property = [0];
let propertyTemp = {};
let workspaceTemp = {};
let workspacesAll = [];
let workspaces = [];
workspaces.push(0);
if (localStorage.getItem('workspaces')){
    workspacesAll = JSON.parse(localStorage.getItem('workspaces'));
    console.log("workspacesAll[0]: ", workspacesAll[workspacesAll.length - 1][0]);
    workspaces[0] = workspacesAll[workspacesAll.length - 1][0];
    property[0] = workspacesAll[workspacesAll.length - 1][1].property[0];
    console.log("property[0]: ", property[0]);
}
console.log("workspaces: ", workspaces);
console.log("workspacesAll: ", workspacesAll);

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (localStorage.getItem("property")){
    property = JSON.parse(localStorage.getItem("property"));
}

function validate(property, pName, pAddress, pNeighborhood, pSquareFoot){
    let valid = true;

    if (pName == "Property Name" || pAddress == "Address" || pNeighborhood == "Neighborhood" || pSquareFoot == "Square Footage"){
        valid = false;
        document.getElementById('invalid-property').innerHTML = "Please enter new info!";
        return valid;
    } else if (pName == "" || pAddress == "" || pNeighborhood == "" || pSquareFoot == ""){
        valid = false;
        document.getElementById('invalid-property').innerHTML = "Please enter valid info!";
    }
    // validate matching properties
    return valid;
}

function workspaceValidate(workspaceType, seatNumber, smoking, startDate, leaseLength, price){
    let valid = true;

    if (workspaceType == "Workspace type" || seatNumber == "# of seats" || startDate == "yyyy-mm-dd" || leaseLength == "Default" || price == "Price"){
        valid = false;
        document.getElementById('invalid-workspace').innerHTML = "Please enter new info!";
        return valid;
    } else if (pName == "" || pAddress == "" || pNeighborhood == "" || pSquareFoot == ""){
        valid = false;
        document.getElementById('invalid-property').innerHTML = "Please enter valid info!";
    }
    // validate matching workspaces
    return valid;
}

let buttonPush = ()=> {
    

    const cancelButton = document.getElementById('btn-cancel-property');
    const createButton = document.getElementById('btn-create-property');
    const addButton = document.getElementById('btn-addworkspace');
    const deleteButton = document.getElementById('btn-deleteworkspace');
    const submitButton = document.getElementById('btn-finalize');

    cancelButton.addEventListener('click', ()=>{
        document.getElementById('pName').value = "Property Name";
        document.getElementById('pAddress').value = "Address";
        document.getElementById('pNeighborhood').value = "Neighborhood";
        document.getElementById('pSquareFoot').value = "Square Footage";
        document.getElementById('garage').checked = false;
        document.getElementById('transit').checked = false;
        document.getElementById('invalid-property').innerHTML = "";
    });
    
    createButton.addEventListener('click', ()=>{
        const pName = document.getElementById('pName').value;
        const pAddress = document.getElementById('pAddress').value;
        const pNeighborhood = document.getElementById('pNeighborhood').value;
        const pSquareFoot = document.getElementById('pSquareFoot').value;
        const garage = document.getElementById('garage').checked;
        const transit = document.getElementById('transit').checked;
        const owner = currentUser;
        const propertyID = property[0];
        //property counter
        property[0]++;    
        
        
        const isValid = validate(property, pName, pAddress, pNeighborhood, pSquareFoot);
        console.log(isValid);
        if (isValid){
        // create a jagged array by adding the contents of this temp object 
        // to the contents of the permanent array.
            propertyTemp = {
                propertyName: pName,
                propertyAddress: pAddress,
                propertyNeighborhood: pNeighborhood,
                propertySquareFoot: pSquareFoot,
                propertyParking: garage,
                propertyTransit: transit,
                propertyOwner: owner,
                propertyID: propertyID,
            }
            property.push(propertyTemp);
            document.getElementById('office-container').style.display = `flex`;
            console.log("property: ", property);
            console.log("propertyTemp: ", propertyTemp);
        }
    });

    addButton.addEventListener('click', ()=>{
        // removes the delete + add bug
        let deleteAdd = false;
        if (workspaces[workspaces.length-1].workspaceID == workspaces[0]) deleteAdd = true;
        
        const workspaceType = document.getElementById('type').value;
        const seatNumber = document.getElementById('seats').value;
        const smoking = document.getElementById('smoking').checked;
        const startDate = document.getElementById('date').value;
        const leaseLength = document.getElementById('lease').value;
        const price = document.getElementById('price').value;
        const propertyInfo = property;
        // workspaceID equals workspace counter
        const workspaceID = workspaces[0];
        // ID counter
        workspaces[0]++;
        // validate
        let isValid = workspaceValidate(workspaceType, seatNumber, smoking, startDate, leaseLength, price);
        if (isValid){
            if (deleteAdd == false){
                workspaceTemp = {
                    workspaceType: workspaceType,
                    numberOfSeats: seatNumber,
                    smoking: smoking,
                    dateAvailable: startDate,
                    leaseLength: leaseLength,
                    price: price,
                    property: propertyInfo,
                    WorkSpaceID: workspaceID,
                }
                // workspaceTemp.push(workspaceType);
                // workspaceTemp.push(seatNumber);
                // workspaceTemp.push(smoking);
                // workspaceTemp.push(startDate);
                // workspaceTemp.push(leaseLength);
                // workspaceTemp.push(price);
                // workspaceTemp.push(propertyInfo);
                // workspaceTemp.push(workspaceID);
                workspaces.push(workspaceTemp);                                                             
            }
            const elem1 = '<div class="new-space"><div class="photo"><i class="fa fa-camera"></div></i><div class="space-info"><div class="space-type"><p><input type="text" id="type" value="Workspace type" onfocus="' + "value=''" + '"></p><p><input type="text" id="seats" value="# of seats" onfocus="' + "value=''" + '"></p><div><input type="checkbox" id="smoking"><label for="smoking">Smoking</label></div></div><div class="space-availability"><p><input type="date" id="date"></p><p><label for="lease">Lease Length</label><select id="lease" name="lease"><option value="Default">--choose--</option><option value="One day">One Day</option><option value="One week">One Week</option><option value="One month">One Month</option></select></p><p><input type="text" id="price" value="Price" onfocus="' + "value='$'" + '"></p></div></div></div>';
            document.getElementById('invalid-workspace').innerHTML = "";
            $('br').after(elem1);
            console.log(workspaces);
             
        }
    });

    deleteButton.addEventListener('click', ()=>{
  
        // check with workspaces ID match for data removal
        if (workspaces[0] > 0 && workspaces[workspaces.length-1].workspaceID == workspaces[0]){
            workspaces.pop();
        }
        console.log(workspaces);
        $('div').remove('.new-space:nth-child(2)');
        workspaces[0]--;
    });

    submitButton.addEventListener('click', ()=>{
        console.log("workspaces: ", workspaces);
        console.log("workspacesAll: ", workspacesAll);
        workspacesAll.push(workspaces);
        localStorage.setItem("workspaces", JSON.stringify(workspacesAll));
        //window.location.assign("listings.html");
    });
    
}

buttonPush();