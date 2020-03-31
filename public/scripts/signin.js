/* Functionality Fixes
    - update Validation
*/

//let currentUser = {};
// fetch('http://localhost:3030/user_data')
//     .then((res) => res.json())
//     .then((data) => {
//         function validate(userArray, username, password){
//             let valid = true;
//             //matching default values
//             if (username == "email" || password == "password"){
//                 valid = false;
//                 document.getElementById('invalid-signin').innerHTML = "Please enter new info!";
//                 return valid;
//             //empty fields
//             } else if (username == "" || password == ""){
//                 valid = false;
//                 document.getElementById('invalid-signin').innerHTML = "Please enter valid info!";
//                 return valid;
//             }
//             //matching username and password
//             for (let i = 3; i < userArray.length; i += 7){
//                 console.log(userArray[i]);
//                 console.log(username);
//                 console.log(userArray[i+1]);
//                 console.log(password);
//                 if (username === userArray[i] && password === userArray[i+1]){
//                     valid = true;
//                     const currentUser = {firstName: userArray[i-3], 
//                                          lastName: userArray[i-2],
//                                          phone: userArray[i-1],
//                                          username: userArray[i],
//                                          password: userArray[i+1],
//                                          owner: userArray[i+2], 
//                                          userid: userArray[i+3], };
//                     localStorage.setItem("currentUser", JSON.stringify(currentUser));
//                     break;
//                 } else {
//                     valid = false;
//                 }
//             }
//             if (!valid){
//                 document.getElementById('invalid-signin').innerHTML = "username or password not found!";
//             }
            
            
//             return valid;
//         }
        
        let buttonPush = ()=> {
            const cancelButton = document.getElementById('btn-cancel-signin');
            //const submitButton = document.getElementById('btn-submit-signin');
        
            cancelButton.addEventListener('click', ()=>{
                document.getElementById('username').value = "email";
                document.getElementById('password').value = "password";
                document.getElementById('invalid-signin').innerHTML = "";
            });
            //retrieveData();
            //console.log(user);
            // submitButton.addEventListener('click', ()=>{
            //     const username = document.getElementById('username').value;
            //     const password = document.getElementById('password').value;
            //     const isValid = validate(user, username, password);
            //     if (isValid){
                    
            //         //go to Listings page
            //         window.location.assign("listings.html");
            //     }
            // });
            
        }
        
        buttonPush();
    

// function validate(userArray, username, password){
//     let valid = true;
//     //matching default values
//     if (username == "email" || password == "password"){
//         valid = false;
//         document.getElementById('invalid-signin').innerHTML = "Please enter new info!";
//         return valid;
//     //empty fields
//     } else if (username == "" || password == ""){
//         valid = false;
//         document.getElementById('invalid-signin').innerHTML = "Please enter valid info!";
//         return valid;
//     }
//     //matching username and password
//     for (let i = 3; i < userArray.length; i += 7){
//         console.log(userArray[i]);
//         console.log(username);
//         console.log(userArray[i+1]);
//         console.log(password);
//         if (username === userArray[i] && password === userArray[i+1]){
//             valid = true;
//             const currentUser = {firstName: userArray[i-3], 
//                                  lastName: userArray[i-2],
//                                  phone: userArray[i-1],
//                                  username: userArray[i],
//                                  password: userArray[i+1],
//                                  owner: userArray[i+2], 
//                                  userid: userArray[i+3], };
//             localStorage.setItem("currentUser", JSON.stringify(currentUser));
//             break;
//         } else {
//             valid = false;
//         }
//     }
//     if (!valid){
//         document.getElementById('invalid-signin').innerHTML = "username or password not found!";
//     }
    
    
//     return valid;
// }

// let buttonPush = ()=> {
//     const cancelButton = document.getElementById('btn-cancel-signin');
//     const submitButton = document.getElementById('btn-submit-signin');

//     cancelButton.addEventListener('click', ()=>{
//         document.getElementById('username').value = "email";
//         document.getElementById('password').value = "password";
//         document.getElementById('invalid-signin').innerHTML = "";
//     });
//     retrieveData();
//     //console.log(user);
//     submitButton.addEventListener('click', ()=>{
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;
//         const isValid = validate(user, username, password);
//         if (isValid){
            
//             //go to Listings page
//             window.location.assign("listings.html");
//         }
//     });
    
// }

// buttonPush();