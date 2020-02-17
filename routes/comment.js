var express=require("express");
var router=express.Router();
var passport=require("passport");
var Campground=require("../models/campground");
var Comment=require("../models/comments");
var middleware=require("../middleware");

//=====================
//COMMENT ROUTES
//=====================

router.get("/campgrounds/:id/comments/new",middleware.isloggedIn,function(req, res) {
    //find by id
    Campground.findById(req.params.id,function(err,campground)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
             res.render("comments/new",{campground:campground});
        }
    });
  
});

router.post("/campgrounds/:id/comments",middleware.isloggedIn,function(req,res){
    //look up using an id
    Campground.findById(req.params.id,function(err, campground) {
        if(err)
        {
            console.log(err);
        }
        else{
            Comment.create(req.body.comment,function(err,comment)
            {
                if(err)
                {
                    console.log(err);
                }
                else{
                    //add username and id to comments
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//EDIT routes
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkcommentownership,function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundcomment) {
        if(err)
        {
            res.redirect("back");
        }
        else{
           res.render("comments/edit",{campground_id:req.params.id, comment:foundcomment});     
        }
    });
});
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkcommentownership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment){
        if(err)
        {
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkcommentownership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err)
        {
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});




module.exports=router;