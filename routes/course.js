
const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/purchase", function (req, res) {
    // we would expect the user to pay the money.
    res.json({
        message: "user wanted to purchased course endpoint."
    })
})

courseRouter.get("/preview", function (req, res) {
    res.json({
        message: "showing all courses endpoint."
    })
})

module.exports = {
    courseRouter: courseRouter
}