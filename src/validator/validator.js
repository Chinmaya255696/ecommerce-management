const mongoose = require("mongoose")
// request-body validation (required: true)

const isValidRequestBody= function(reqbody){
    if(Object.keys(reqbody).length === 0){
        return false;
    }
    return true
}

// string validation (required: true)

const isValidString = function(value){
    if(typeof value === "undefined" || typeof value === null )return false 
    if(typeof value === "string" && value.trim().length==0 )return false 
    if(typeof value === "string") return true
}

// email validation 

const isValidEmail = function(email){

    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(email) //  return a boolean
}

// password validation

const isValidPassword = function(password){
    if(password.length >= 8 && password.length <=15){return true}
    return false
}

// pincode validation

const isValidPincode = function(pin){

        const pattern = /^\d{6}$/;
        return pattern.test(pin); //  return a boolean
   
}

//phone no validation
const isValidPhone = function (phone) {
    const pattern = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    return pattern.test(phone); // returns a boolean
  };

//objectId validation
const isValidObjectId = function (objectId) {
    var pattern = /^[0-9a-fA-F]{24}$/;
    return pattern.test(objectId); // returns a boolean
}

//image validation
const isValidImg = (img) => {
    const reg = /image\/png|image\/jpeg|image\/jpg/;
    return reg.test(img);
  };

  module.exports = { isValidRequestBody, isValidEmail, isValidString, isValidPincode, isValidPassword, isValidPhone, isValidObjectId, isValidImg };