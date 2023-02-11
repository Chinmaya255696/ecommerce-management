const mongoose = require("mongoose");



const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    username: {
      type: String,
      trim: true,
      unique: true,

       default:Math.random()
    },
    firstName: {
      type: String,
      requierd: true,
      trim: true,
},
middleName:{
  type: String,
  trim: true
},
    lastName: {
      type: String,
      requierd: true,
      trim: true,
  
    },

    email: {
      type: String,
      requierd: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim:true
    },
    createdOn: {
      type: String,
      lowercase: true, //try to remove this
       default:Date.now()
    },
    phone: { 
      type: String, //error cheack
      required:true,
      unique: true,
      trim:true,
     },
    profileImage: { 
      type: String,
      trim:true,
      unique:true
     },
     address:{
      shipping:{
        street:{type:String, required:true, trim:true },
        city:{type:String, required:true, trim:true},
        pincode:{type:String, required:true, trim:true}
      },
      billing:{
        street:{type:String, required:true, trim:true },
        city:{type:String, required:true, trim:true},
        pincode:{type:String, required:true, trim:true}
      }
     }
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
