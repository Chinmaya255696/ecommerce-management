const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");

// routes
const userRoute = require("././routes/user");

const app = express();

const bodyParser = require("body-parser");
//enviormental variable or you can say constance.
env.config();

app.use(bodyParser.json());

app.use("/", userRoute);

//Mongodb connection
//mongodb+srv://ChinuECart:<password>@cluster0.ocvqgdj.mongodb.net/test

// "mongodb+srv://ChinuECart:GXVDXZ0MYKoDw6lS@cluster0.ocvqgdj.mongodb.net/test"
mongoose
  .connect(
    "mongodb+srv://Jagcho:71nEXJtXcYfVx8T6@cluster0.5bg4mzz.mongodb.net/group",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("MonoDb is connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT, () => {
  console.log(`The server is running on the port ${process.env.PORT}`);
});




// app.use(bodyParser.urlencoded({ extended:true}));

// app.get("/" , (req,res) => {
// res.status(200).send({message:"hello from server"})
// })

// app.post('/data',(req,res) => {
//     let a =req.body
//     res.status(200).send({message:a})
// })
