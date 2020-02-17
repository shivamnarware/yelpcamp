var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");




router.get("/",function(req,res)
{
    res.render("landing");
});



//auth routes
//show up the sign up form
router.get("/register",function(req, res) {
    res.render("register");
});

//handling user sign up
router.post("/register",function(req,res){
    req.body.username;
    req.body.password;
    User.register(new User({username:req.body.username}),req.body.password,function(err,user)
    {
        if(err){
            console.log(err);
            return res.render("register");
        }
        else
        {
            //log the user in,take care of session,store correct information,use serialise method
           passport.authenticate("local")(req,res,function(){
               res.redirect("/campgrounds");
           }) ;
        }
    });
});

//login routes
//render login page
router.get("/login",function(req, res) {
    res.render("login");
});

//login logic
//middleware
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req, res){
    
});

router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});





module.exports=router;