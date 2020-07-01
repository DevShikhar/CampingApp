var express = require("express"),
    router  = express.Router(),
    User    = require("../models/user"),
    passport= require("passport")

router.get("/", (req, res)=>{ 
   
    res.render("landing"); 
})

router.get("/register", (req, res)=>{
    res.render("register");
});

router.post("/register", (req, res)=>{
   var newUser = new User({username:req.body.username});
   User.register(newUser, req.body.password, (err, newuser)=>{
       if(err){
           req.flash("error", err.message);
           return res.redirect("/register");
       }
       passport.authenticate("local")(req, res, ()=>{
           req.flash("success", "Welcome to YalpCamp, "+ newuser.username);
           res.redirect("/campgrounds")
       })
   })

});

router.get("/login", (req, res)=>{
    res.render("login");
});

router.post("/login", passport.authenticate("local", ({
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
})), (req, res)=>{
    
});

router.get("/logout", (req, res)=>{
    req.logout();
    req.flash("success", "You are Logged Out!!")
    res.redirect("/campgrounds");
});

module.exports = router;