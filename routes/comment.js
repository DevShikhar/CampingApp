var express = require("express"),
    router  = express.Router(),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");



router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn ,(req, res)=>{
    Campground.findById(req.params.id, (err, campgrounds)=>{
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campgrounds:campgrounds});
        }
    })
    
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn ,(req, res)=>{
    Campground.findById(req.params.id, (err, campgrounds)=>{
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment, (err, comment)=>{
                if(err){
                    console.log(err);
                }else{
                    comment.aurthor.id = req.user._id; 
                    comment.aurthor.username = req.user.username;
                    comment.save();
                    campgrounds.comment.push(comment);
                    campgrounds.save();
                    res.redirect("/campgrounds/"+campgrounds._id);
                   
                }
            })        
        }
    })
});

router.get("/campgrounds/:id/comments/:comm_id/edit", middleware.commentOwnership, (req,res)=>{
    Campground.findById(req.params.id, (err, campgrounds)=>{
        if(err){
            console.log(err);
        }else{
            res.render("comments/edit", {campgrounds: campgrounds, comm_id: req.params.comm_id});
        }
    })
});

router.put("/campgrounds/:id/comments/:comm_id", middleware.commentOwnership, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comm_id, req.body.comment, (err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })
});

router.delete("/campgrounds/:id/comments/:comm_id", middleware.commentOwnership, (req, res)=>{
    Comment.findByIdAndDelete(req.params.comm_id, (err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("back");
        }
    })
});


module.exports = router;