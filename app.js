const express    = require("express"),
      bodyParser = require("body-parser"),
      app        = express(),
      mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      Comment    = require("./models/comment"),
      User       = require("./models/user"),
      passport   = require("passport"),
      LocalStrategy = require("passport-local"),
      session    = require("express-session"),
      methodOverride = require("method-override"),
      flash      = require("express-flash"),
      seeddb     = require("./seeds");
     

const campRoutes      =   require("./routes/campgrounds"),
      commentRoutes   =   require("./routes/comment"),
      authRoutes      =   require("./routes/index"),
      sessionStore    = new session.MemoryStore;


require('dotenv').config();  
var url = "mongodb+srv://shikhar_user1:"+ process.env.DBKEY +"@cluster0.mtyig.mongodb.net/Cluster0?retryWrites=true&w=majority"
mongoose.connect(process.env.URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"))
app.set("view engine","ejs");

app.use(session({
    secret: "kanha like radha",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.error =  req.flash("error");
    res.locals.success =  req.flash("success");
    
    next();
});

app.use(methodOverride("_method"));
app.use(campRoutes);
app.use(commentRoutes);
app.use(authRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server started at ${process.env.PORT}`)
})

