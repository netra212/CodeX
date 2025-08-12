const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const userRouter = Router();

const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middlewares/user");
const course = require("./course");

userRouter.post("/signup", async function (req, res) {

    const { email, password, firstName, lastName } = req.body; // TODO: adding zod validation.
    // TODO: hash the password so plaintext pw is not stored in the DB.

    // TODO: Put inside a try catch block.
    try {
        await userModel.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })

    } catch (e) {
        console.log("signup has failed.");
    }

    res.json({
        message: "signup succeeded."
    })
})

userRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    // TODO: Ideally password should be hashed, and hence you can't compare the user provided password and the database password. 
    const user = await userModel.findOne({ // return either user, or undefined. 
        email: email,
        password: password
    });

    if (user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);

        // Do cookie logic here. 

        // token based authentication. 
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }

    res.json({
        message: "signin endpoint."
    })
})

userRouter.get("/purchases", userMiddleware, async function (req, res) {

    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    })

    let purchaseCourseIds = [];
    for(let i = 0; i < purchases.length; i++){
        purchaseCourseIds.push(purchases[i].courseId);
    }   

    console.log(purchases);
    const courseData = await courseModel.find({
        _id: { $in: purchaseCourseIds }
    })

    res.json({
        purchases,
        courseData
    })
})

module.exports = {
    userRouter: userRouter
}