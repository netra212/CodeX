const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middlewares/admin");
const { courseModel } = require("./db");

adminRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body; // TODO: adding zod validation.
    // TODO: hash the password so plaintext pw is not stored in the DB.

    // TODO: Put inside a try catch block.
    try {
        await adminModel.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })

    } catch (e) {
        console.log("signup has failed.");
    }

    res.json({
        message: "admin signup succeeded."
    })
})

adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    // TODO: Ideally password should be hashed, and hence you can't compare the user provided password and the database password. 
    const admin = await adminModel.findOne({ // return either user, or undefined. 
        email: email,
        password: password
    });

    if (admin) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);

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

adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })

    res.json({
        message: "course created",
        courseId: course._id
    })
})

adminRouter.put("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    // 

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },
        {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    })

    res.json({
        message: "course updated",
        courseId: course._id
    })
})

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    })

    res.json({
        message: "course updated",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}