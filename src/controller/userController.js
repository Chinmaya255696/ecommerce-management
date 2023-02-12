const userModel = require("../models/userModel"); //requiring model

// requiring all packages
const { aws } = require("aws-sdk");
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

const signup = async (req, res) => {
  try {
    let data = req.body;
    let file = req.files;

    const { firstName, middleName, lastName, email, phone, password, address } =
      data;

    // body empty
    if (!isValidRequestBody(data))
      return res
        .status(400)
        .send({ status: false, message: "Provide the User's Data" });

    //Validating FirstNames
    if (!isValidString(firstName)) {
      return res
        .status(400)
        .send({ status: false, message: "Provide the First Name in Feild" });
    }

    if (!/^[a-zA-Z ]{2,30}$/.test(firstName)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid Fname" });
    }

    //Validating lastNames
    if (!isValidString(lastName)) {
      return res
        .status(400)
        .send({ status: false, message: "Provide the last Name in Feild" });
    }
    if (!/^[a-zA-Z ]{2,30}$/.test(lastName)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid lastname" });
    }

    //Phone validation

    if (!isValidString(phone)) {
      return res.status(400).send({
        status: false,
        message: "Phone Number Feild is Required",
      });
    }
    if (!isValidPhone(phone)) {
      return res.status(400).send({
        status: false,
        message: "Phone Number should be a valid Indian Phone Number",
      });
    }
    let PhoneCheck = await userModel.findOne({ phone: phone.trim() });

    if (PhoneCheck) {
      return res.status(400).send({
        status: false,
        message: `This No ${phone} is Already Registered`,
      });
    }

    //email validation
    if (!isValidString(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Provide the EmailId Feild" });
    }
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Provide the Valid EmailId " });
    }

    let checkmail = await userModel.findOne({ email: email });
    if (checkmail) {
      return res
        .status(400)
        .send({ status: false, message: `${email} is Already Registered` });
    }

    if (!isValidString(password)) {
      return res
        .status(400)
        .send({ status: false, message: "Provide the Password " });
    }
    if (!isValidPassword(password)) {
      return res.status(400).send({
        status: false,
        message: "Password Length must be in btwn 8-15 chars only",
      });
    }

    //decrypted password create using "bcrypt package"

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hashSync(password, saltRounds);
    data.password = encryptedPassword;

    //adress validation

    if (data.address) {
      console.log(address);
      // shipping address validation
      if (data.address.shipping) {
        if (!isValidString(data.address.shipping.street)) {
          {
            return res.status(400).send({
              status: false,
              message: "Please provide street name in shipping address",
            });
          }
        }
        if (!isValidString(data.address.shipping.city)) {
          return res.status(400).send({
            status: false,
            message: "Please provide city name in shipping address",
          });
        }
        if (!isValidPincode(data.address.shipping.pincode)) {
          return res.status(400).send({
            status: false,
            message: "Please provide valid pincode in shipping address",
          });
        }
      }
      if (!data.address.shipping) {
        return res.status(400).send({
          status: false,
          message: "Please Provide Shipping Address In Address Feild()",
        });
      }

      // billing address validation

      if (data.address.billing) {
        if (!isValidString(data.address.billing.street)) {
          return res.status(400).send({
            status: false,
            message: "Please provide street name in shipping address",
          });
        }
        if (!isValidString(data.address.billing.city))
          return res.status(400).send({
            status: false,
            message: "Please provide city name in billing address",
          });
        if (!isValidPincode(data.address.billing.pincode))
          return res.status(400).send({
            status: false,
            message: "Please provide valid pincode in billing address",
          });
      }

      if (!data.address.billing) {
        return res.status(400).send({
          status: false,
          message: "Please Provide billing Address In Address Feild",
        });
      }

      //   data.address = data.address
    }
    if (!data.address) {
      return res
        .status(400)
        .send({ status: false, message: "Please Provide The Address" });
    }

    //       // profile image validation
    //       if(!file){
    //         return res.status(400).send({
    //             status: false,
    //             message: "Please Provide The Profile Image",})
    //       }
    // // if(file && file.length >0){
    // //     if(!isValidImg(file[0]))
    // //     return res.status(400).send({
    // //         status: false,
    // //         message: "Image Should be of JPEG/ JPG/ PNG",
    // //       });
    // // }
    //store the profile image in aws and creating profile image url via "aws package"
    // const newurl = await aws1.uploadFile(file[0])
    // data.profileImage = newurl

    //after checking all the validation,then creating the user data
    const created = await userModel.create(data);
    return res.status(201).send({
      status: true,
      message: "User Created Succefully",
      data: data,
    });
    console.log(data);
    console.log(created);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// User Login 
const signin = async (req, res) => {
  try {
    let data = req.body;
    let { email, password } = data;

    // body empty
    if (!isValidRequestBody(data))
      return res
        .status(400)
        .send({ status: false, message: "Provide the User's Data" });

    //email validation
    if (!isValidString(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Provide the EmailId Feild" });
    }
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Provide the Valid EmailId " });
    }

    //password valiadtion
    if (!isValidString(password)) {
      return res
        .status(400)
        .send({ status: false, message: "Provide the Password " });
    }
    if (!isValidPassword(password)) {
      return res.status(400).send({
        status: false,
        message: "Password Length must be in btwn 8-15 chars only",
      });
    }

    //checking Login Credentials

    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .send({
          status: false,
          message: `"Invalid User, Login Credentials Doesn't Matched"`,
        });
    }
    //checking req body password and DB's decryptPassword is same or not using "bcrypt package"

    let decryptPassword = user.password;
    const pass = await bcrypt.compare(password, decryptPassword);

    if (!pass) {
      return res
        .status(400)
        .send({ status: false, message: "Password Incorrect" });
    }

    // creating tokens here
    const token = jwt.sign({ userId: user._id }, "MbFastChe-46", {
      expiresIn: "72hr",
    });
    //restrucing response and set token

    let obj = {
      userId: user._id,
      token: token,
    };

    res.setHeader("Authorization", "Bearer" + token);

    return res.status(201).send({
      status: true,
      message: "User LoggedIn Succesfully",
      data: obj,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

//Get User API

const getUser = async function(req, res){
    try {
        
        
    } catch (error) {
    return res.status(500).send({ message:error})
    }
}
module.exports = { signup, signin };
