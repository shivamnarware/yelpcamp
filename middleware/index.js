var middlewareObj={};
var Campground=require("../models/campground");
var Comment=require("../models/comments");


middlewareObj.checkcampgroundownership=function(req,res,next)
{
     if(req.isAuthenticated())
    {
 Campground.findById(req.params.id,function(err,foundCampgound)
    {
        if(err)
        {
            res.redirect("back");
        }
        else
        {
               if(foundCampgound.author.id.equals(req.user._id))
               {
                   next();
               }
               else{
                   res.redirect("back");
               }
                
        }
    });
    }
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkcommentownership=function(req,res,next)
{
     if(req.isAuthenticated())
    {
 Comment.findById(req.params.comment_id,function(err,foundComment)
    {
        if(err)
        {
            res.redirect("back");
        }
        else
        {
               if(foundComment.author.id.equals(req.user._id))
               {
                   next();
               }
               else{
                   res.redirect("back");
               }
                
        }
    });
    }
    else{
        res.redirect("back");
    }
};

middlewareObj.isloggedIn=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    console.log("hitt");
    res.redirect("/login");
};


module.exports=middlewareObj;