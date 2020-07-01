var Campground = require("../models/campground"),
    Comment    = require("../models/comment");

var middlewareObj = {};

middlewareObj.campOwnership = (req, res, next)=>{
    if(req.isAuthenticated()){

        Campground.findById(req.params.id, (err, foundCamp)=>{
            if(err){
                console.log(err);
            }else{
                        if(req.user._id.equals(foundCamp.aurthor.id)){
                          return next();
                        }else{
                            req.flash("error", "You are NOT authorised")
                            res.redirect("/campgrounds/"+ req.params.id);
                        }

            }
        });
    }else{
        res.flash("error", "Please LOGIN to proceed!!")
        res.redirect("/login");
    } 
};

middlewareObj.commentOwnership = (req, res, next)=>{
    if(req.isAuthenticated()){

        Comment.findById(req.params.comm_id, (err, foundComment)=>{
            if(err){
                console.log(err);
            }else{
                        if(req.user._id.equals(foundComment.aurthor.id)){
                          return next();
                        }else{
                            req.flash("error", "You are NOT authorised")
                            res.redirect("/campgrounds/"+ req.params.id);
                        }

            }
        });
    }else{
        res.flash("error", "Please LOGIN to proceed!!")
        res.redirect("/login");
    } 
};

middlewareObj.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please LOGIN to proceed!!");
    res.redirect("/login");
};


module.exports = middlewareObj;
