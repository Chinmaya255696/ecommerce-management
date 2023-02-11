const userModel = require("../models/userModel"); //requiring model

// requiring all packages
const { aws} = require("aws-sdk");
const aws1 = require("../aws/aws");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// importing all the validation file and destrucing all the valiadtion as per the project requirement

let {
  isValidRequestBody,
  isValidEmail,
  isValidString,
  isValidPincode,
  isValidPassword,
  isValidPhone,
  isValidObjectId,
  isValidImg,
} = require("../validator/validator");


// creating User-Registation(signup) Api

exports.signup = async (req, res) => {
  try {
    let data = req.body;
    let file = req.files;

    const { firstName, middleName, lastName, email, password, address } = data;

//     // body empty
//     if (!isValidRequestBody(data))
//       return res
//         .status(400)
//         .send({ status: false, message: "Provide the User's Data" });

//     //Validating FirstNames
//     if (!isValidString(firstName)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Provide the First Name in Feild" });
//     }

//     if (!/^[a-zA-Z ]{2,30}$/.test(firstName)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Enter valid Fname" });
//     }

//     //Validating lastNames
//     if (!isValidString(lastName)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Provide the last Name in Feild" });
//     }
//     if (!/^[a-zA-Z ]{2,30}$/.test(lastName)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Enter valid lastname" });
//     }

//     //Phone validation

//     if (!isValidString(phone)) {
//       return res.status(400).send({
//         status: false,
//         message: "Phone Number Feild is Required",
//       });
//     }
//     if (!isValidPhone(phone)) {
//         return res.status(400).send({
//           status: false,
//           message:
//             "Phone Number should be a valid Indian Phone Number",
//         });
//       }
//     let PhoneCheck = await userModel.findOne({ phone: phone.trim() });

 
//       if (PhoneCheck) {
//         return res
//           .status(400)
//           .send({
//             status: false,
//             message: `This No ${phone} is Already Registered`,
//           });
//       }
  

//     //email validation
//     if (!isValidString(email)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Provide the EmailId Feild" });
//     }
//     if (!isValidEmail(email)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Provide the Valid EmailId " });
//     }

//     let checkmail = await userModel.findOne({ email: email });
//     if (checkmail) {
//       return res
//         .status(400)
//         .send({ status: false, message: `${email} is Already Registered` });
//     }

//     if (!isValidString(password)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Provide the Password " });
//     }
//     if (!isValidPassword(password)) {
//       return res.status(400).send({
//         status: false,
//         message: "Password Length must be in btwn 8-15 chars only",
//       });
//     }

//     //decrypted password create using "bcrypt package"

//     const saltRounds = 10;
//     const encryptedPassword = await bcrypt.hash(password, saltRounds);
//     data.password = encryptedPassword;

//     //adress validation

//     if (address) {
//       let objAddress = JSON.parse(address); // convert text into javascript object ,
//       // Make sure the text is in JSON format, or else you will get a syntax error.

//       // shipping address validation
//       if (objAddress.shipping) {
//         if (!isValid(objAddress.shipping.street)) {
//           return res.status(400).send({
//             status: false,
//             message: "Please provide street name in shipping address",
//           });
//         }
//         if (!isValidString(objAddress.shipping.city))
//           return res.status(400).send({
//             status: false,
//             message: "Please provide city name in shipping address",
//           });
//         if (!isValidPincode(objAddress.shipping.pincode))
//           return res.status(400).send({
//             status: false,
//             message: "Please provide valid pincode in shipping address",
//           });  
//       }
//       else{res.status(400).send({
//         status: false,
//         message:
//           "Please Provide Shipping Address In Address Feild",
//       });}

//       // billing address validation

//       if (objAddress.billing) {
//         if (!isValid(objAddress.billing.street)) {
//           return res.status(400).send({
//             status: false,
//             message: "Please provide street name in shipping address",
//           });
//         }
//         if (!isValidString(objAddress.billing.city))
//           return res.status(400).send({
//             status: false,
//             message: "Please provide city name in billing address",
//           });
//         if (!isValidPincode(objAddress.billing.pincode))
//           return res.status(400).send({
//             status: false,
//             message: "Please provide valid pincode in billing address",
//           });  
//       }
//       else{res.status(400).send({
//         status: false,
//         message:
//           "Please Provide billing Address In Address Feild",
//       });}

//       data.address = objAddress
//     }else {
//         return res.status(400).send({ status: true, message: "Please Provide The Address" });
//       }

//       // profile image validation
//       if(file.length==0){
//         return res.status(400).send({  
//             status: false,
//             message: "Please Provide The Profile Image",})
//       }
// if(file && file.length >0){
//     if(!isValidImg(file[0].mimetype))
//     return res.status(400).send({
//         status: false,
//         message: "Image Should be of JPEG/ JPG/ PNG",
//       }); 
// }
// //store the profile image in aws and creating profile image url via "aws package" 
// const newurl = await aws1.uploadFile(file[0])
// data.profileImage = newurl

 //after checking all the validation,then creating the user data
 const created = await userModel.create(data);
 return res
   .status(201)
   .send({
     status: true,
     message: "User Created Succefully",
     data: created,
   });
 
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// exports.signin = async (req, res) => {
//   try {
//     let data = req.body;
//    let {email, password} = data

//    let emailCheck = await userModel.findOne({email:email})
//    if(!emailCheck){
//     res.status(400).send({status:false , message:"This email is not exist"})
// }

//   } catch (error) {
//     res.status(500).send({ message: error });
//   }
// };
