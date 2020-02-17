var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comments");


var data=[{
    name:"cloud rest",
    image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    discription:"blah blah blah"
},{
       name:"desert mesa",
    image:"https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg",
    discription:"blah blah blah" 
},
{
       name:"cloud rest",
    image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    discription:"blah blah blah" 
}];
function seedDB()
{
    //remove all canpground
    Campground.deleteMany({},function(err)
    {
        // if(err)
        // {
        //     console.log(err);
        // }
        //     console.log("removed campground");
        //     //add few campground
        //          data.forEach(function(seed)
        //             {
        //              Campground.create(seed,function(err,campground)
        //             {
        //               if(err)
        //                   {
        //                   console.log(err);
        //                   }
        //               else{
        //                     console.log("added campground");
        //                      //add few comments
        //                     Comment.create(
        //                         {
        //                             text:"this place is great",
        //                             author:"homer"
        //                         },function(err,comment)
        //                         {
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                         });
                            
        //                     }
        //               });
        //             });
        
        
    });

   
    
    
}

module.exports=seedDB;