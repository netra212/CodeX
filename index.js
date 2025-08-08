
const express = require("express");

const app = express();

app.use(express.json());

// middleware for user. 
function user_auth(req, res, next){

}

// middleware for admin. 
function admin_auth(req, res, next){

}

app.post("/user/signup", function(req, res){
    res.json({
        message: "signup endpoint."
    })
})
 
app.post("/user/signin", function(req, res){
    res.json({
        message: "signin endpoint."
    })
})

app.get("/user/purchases", function(req, res){
    res.json({
        message: "purchase endpoint."
    })
})

app.post("/course/purchase", function (req, res) {
    // we would expect the user to pay the money.
    res.json({
        message: "user wanted to purchased course endpoint."
    })
})  
 
app.get("/courses", function(req, res){
    res.json({
        message: "showing all courses endpoint."
    })
})
