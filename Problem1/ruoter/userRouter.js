const express = require("express")

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

require("dotenv").config();

const { redisClient } = require("../config/redis");
const { userModel } = require("../model/usermodel")

const {logger} = require("../logger/logger")

const userRouter = express.Router();


const { authentication } = require("../middleware/authentication")

userRouter.post("/register", async (req, res) => {
    let user = req.body;
    try {
        let temp = await userModel.findOne({ "email": user.email });
        if (temp) return res.send("Already Registered")

        bcrypt.hash(user.password, 5, async (err, hash) => {
            if (err) return res.send("Something Wrong");
            else {
                user.password = hash;
                //logger.log("info", `${req.url},${req.method}`);
                user = new userModel(user)
                await user.save()

                res.send("New user has been Entered")
            }
        })

    } catch (err) {
        res.send({ "error": err.message });
    }
})


userRouter.post("/login", async (req, res) => {
    try {
        let user = req.body;

        let ank = await userModel.findOne({ "email": user.email });
        if (!ank) return res.send("user is not register")
       bcrypt.compare(ank.password, user.password, async (err, decoded) => {
            if (err) return res.send({ "error": "wrong password" });
            let token = jwt.sign({ userid: ank._id }, process.env.JWT_TOKEN, { expiresIn: 60 });
            await redisClient.setEx("token", 60, token);

            res.send("Loggin Successfully ")

            console.log(ank)
        })

    } catch (err) {
        res.send({ "error": err.message });
    }
})


userRouter.get("/logout", authentication, async (req, res) => {
    let token = await redisClient.get("token")

    await redisClient.rPush("blackListToken", token);
    let arr = await redisClient.lRange("blackListToken", 0);
    console.log(arr)

    res.send("Logout from user Successfully")
})

module.exports = {
    userRouter
}