var express=require("express");
var app=express();
var bodyParser = require('body-parser');
var mongoose=require("mongoose");
var Campground=require("./models/campground");
var seedDB=require("./seeds");
var Comment=require("./models/comments");
var passport=require("passport");
var LocalStrategy=require("passport-local").Strategy;;
var passportLocalMongoose=require("passport-local-mongoose");
var User=require("./models/user");
var methodOverride=require("method-override");
var flash=require("connect-flash");
app.use(flash());

app.use(methodOverride("_method"));
app.set("view engine","ejs");

mongoose.set('useFindAndModify', false);

mongoose.connect("mongodb://localhost/yelp_camp_v10", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// seedDB();
app.use(bodyParser.urlencoded({ extended: true }));

//passport configuration
app.use(require("express-session")({
  secret: 'i am shivam',
  resave: false,
  saveUninitialized: false
}));

//tell express to use passport
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
    
//using passport local mongoose and in user model hence User.serilaize is serialising the data
// passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 



app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


var commentroutes=require("./routes/comment"),
    campgroundroutes=require("./routes/campground"),
    indexroutes=require("./routes/index");


app.use(commentroutes);
app.use(campgroundroutes);
app.use(indexroutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("yelpcamp server has started");
});