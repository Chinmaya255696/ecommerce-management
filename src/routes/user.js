const express = require("express");

const {signup,signin} = require("../controller/userController");

const router = express.Router();



router.post("/signup", signup);

router.post("/signin", signin);

router.all("/****", function (req, res) {
    return res.status(404).send({ status: false, msg: "Check whether the Endpoint is Correct or Not" })
})
module.exports = router;
