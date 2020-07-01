var mongoose = require("mongoose"),
    Campgroud = require("./models/campground"),
    Comment    = require("./models/comment")

    var data =[
        {name: "Forest Camp",
         image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {name: "Lake Camp",
        image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {name: "Mountain Camp",
        image:"https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ];

var seeddb = function(){
    Campgroud.deleteMany({},(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log(`DATA REMOVED`);
            data.map((seed)=>{
                Campgroud.create(seed,(err, campground)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(`ADDDED CAMPGROUND`);
                        Comment.create(
                            {
                                text: "This place is great and I love to spend time here",
                                aurthor: "Harry"
                            },(err, comment)=>{
                                if(err){
                                    console.log(err);
                                }else{
                                    campground.comment.push(comment);
                                    campground.save();
                                    console.log(`NEW COMMENT CREATED`); 
                                }
                            }
                        );
                    }
                });
            });
        }
    });
   
}
module.exports = seeddb;