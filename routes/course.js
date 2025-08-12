const { Router } = require("express");
const courseRouter = Router();
const { purchaseModel } = require("../db");
const { userMiddleware } = require("../middlewares/user");
const { courseModel } = require("../db");

courseRouter.post("/purchase", userMiddleware, async function (req, res) {

    const userId = req.userId;
    const courseId = req.body.courseId;

    // should check that the user has actually paid the price. 
    await purchaseModel.create({
        userId,
        courseId
    })

    // We would expect the user to pay the money.
    res.json({
        message: "You have successfully bought the course."
    })
})

courseRouter.get("/preview", async function (req, res) {
    const courses = await courseModel.find({
        
    })

    res.json({
        message: "showing all courses endpoint.",
        courses
    })
})

module.exports = {
    courseRouter: courseRouter
}