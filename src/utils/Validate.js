export function validateSignup(data){
    let emailRegex = /^[a-zA-Z0-9,_-]+\@[a-zA-Z0-9,-_]+\.[a-zA-Z]{2,4}$/;
    const {firstname,lastname,email,password} = data;
    if((!firstname || !lastname || !email || !password)){
        throw new Error("Fields cannot be emprty");
    }
    else if(firstname.length < 6 || lastname.length < 6){
        throw new Error("Firstname and lastName atleast 6 characters long");
    }
    else if(!emailRegex.test(email)){
        throw new Error("Please enter a valid email");
    }
 }

 export function validateSignin(data){
    const {email,password} = data;
    if(!email || !password){
        throw new Error("Fields cannot be emprty")
    }
    
 }

 export function validateProfileData(data){
    let requiredFields = ["firstname","lastname"];
    return Object.keys(data).every(key => requiredFields.includes(key));
 }