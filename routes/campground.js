var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");


router.get("/campgrounds",function(req,res)
{      
     //get all campground from the database
     Campground.find({},function(err,campground)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
          res.render("campgrounds/index",{campgrounds:campground,currentUser:req.user});
    }
});
});
//only register person can add the campground

router.post("/campgrounds",isloggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var discription=req.body.discription;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    
    var newCampgound={name:name,image:image,discription:discription,author:author};
    // store data in database
    Campground.create(newCampgound,function(err,campground)
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                //redirects back to campground page
              res.redirect("/campgrounds");
            }
        });
        
   
});

router.get("/campgrounds/new",isloggedIn,function(req,res){
    res.render("campgrounds/new");
});


router.get("/campgrounds/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampgound){
        if(err)
        {
            console.log(err);
        }
        else{
             res.render("campgrounds/show",{campground:foundCampgound,currentUser:req.user});
        }
    });
   
});

//edit campground route
router.get("/campgrounds/:id/edit",middleware.checkcampgroundownership,function(req, res) {
  
        Campground.findById(req.params.id,function(err,foundCampgound)
             {
                 res.render("campgrounds/edit",{campground:foundCampgound});
             } );
});


//update campground route
router.put("/campgrounds/:id",middleware.checkcampgroundownership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcampgound){
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//delete the campground
router.delete("/campgrounds/:id",middleware.checkcampgroundownership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){res.redirect("/campgrounds")}
        else
        {
            res.redirect("/campgrounds");
        }
    });
});


function isloggedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}

module.exports=router;