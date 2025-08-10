
const { Router } = require("express");
const adminRouter = Router();

adminRouter.use(adminMiddleware);

adminRouter.post("/signup", function(req, res){
    res.json({
        message: "Admin signup."
    })
})

adminRouter.post("/signin", function(req, res){
    res.json({
        message: "signin endpoint."
    })
})

adminRouter.post("/course", function(req, res){
    res.json({
        message: "course endpoint."
    })
})

adminRouter.put("/change_course", function(req, res){
    res.json({
        message: "course change endpoint."
    })
})

adminRouter.get("/course/bulk", function(req, res){
    res.json({
        message: "get course in bulk"
    })
})

module.exports = {
    adminRouter: adminRouter
}