var express = require("express"),
    Campground = require("../models/campground"),
    router  = express.Router(),
    mongoose = require("mongoose"),
    middleware = require("../middleware");



router.get("/campgrounds", (req,res)=>{
    
    Campground.find({},(err, allgrounds)=>{
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/campgrounds",{campgrounds:allgrounds}) 
        }
    })
})
 
router.post("/campgrounds", middleware.isLoggedIn,(req,res)=>{
   
    var name = req.body.name;
    var image = req.body.image;
    var disc  = req.body.description;
    var price = req.body.price;
    var aurthor = {
        id: req.user._id,
        username: req.user.username
    };
    var newGround = {name:name,image:image,description:disc,aurthor:aurthor,price:price};
    Campground.create(newGround,(err, newcre)=>{ 
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
   
})

router.get("/campgrounds/new", middleware.isLoggedIn ,(req, res)=>{
    res.render("campgrounds/new");
})

router.get("/campgrounds/:id",(req, res)=>{
   // var imgid = mongoose.Types.ObjectId(req.params.id);
    Campground.findById(req.params.id).populate("comment").exec((err, foundCamp)=>{
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{foundCamp:foundCamp});
        }
    })
    
});

router.get("/campgrounds/:id/update/new", middleware.campOwnership ,(req, res)=>{
        Campground.findById(req.params.id, (err, foundCamp)=>{
            if(err){
                console.log(err);
            }else{
               res.render("campgrounds/updateCamp", {foundCamp: foundCamp,})
            }
        });
});

router.put("/campgrounds/:id/update", middleware.campOwnership, (req, res)=>{

                Campground.findByIdAndUpdate(req.params.id, req.body.camps, (err, newCamp)=>{
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/campgrounds/" + req.params.id);
                }
                });
    
});

router.delete("/campgrounds/:id", middleware.campOwnership, (req, res)=>{
    Campground.findByIdAndDelete(req.params.id, (err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;