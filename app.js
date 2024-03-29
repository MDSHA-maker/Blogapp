var express=require("express"),
methodoverride=require("method-override"),
bodyparser=require("body-parser"),
mongoose=require("mongoose"),
app=express();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodoverride("_method"));
//model config

var blogSchema=new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type:Date, default:Date.now}
    
});

var Blog=mongoose.model("Blog",blogSchema);

//all seven routes resful routes
app.get("/blogs",function(req,res) {
    Blog.find({},function(err,blogs)
    {if(err)
        {
            console.log("something went wrong");
            
        }
        else{
            res.render("index",{blogs:blogs});
            
        }        
        
    });
   
})



app.get("/",function(req,res) {
    res.redirect("/blogs");
    
})


//new route

app.get("/blogs/new",function(req,res){
    
    res.render("new");
    
})
//create route
app.post("/blogs/",function(req,res){
    Blog.create(req.body.blog,function(err,newBlog){
        if(err)
        {
            res.render("new");
        }
        else{
            res.redirect("/blogs")
            
        }
        
    })
    
    
})

//SHow route
app.get("/blogs/:id",function(req,res){
   // res.render("",)
   Blog.findById(req.params.id,function(err,foundblog){
       if(err)
       {
           app.redirect("/blogs");
       }
       else{
           res.render("show",{blog:foundblog});
       }
       
   })
    
})

//EDIT ROute
app.get("/blogs/:id/edit",function(req,res){
    //res.send("edit"+req.params.id);
 Blog.findById(req.params.id, function(err,foundblog){
       if(err)
       {
           res.redirect("/blogs");
           
       }
       else
       {
            res.render("edit",{blog:foundblog});
           
       }
        
        
    });
  
    
})
//update route 
app.put("/blogs/:id",function(req,res){
   // res.send("Updated route"+req.params.id+req.body.blog);
    //res.redirect("/blogs/"+req.params.id);
   Blog.findByIdAndUpdate(req.params.id,req.body.blog,{new: true},function(err,updatedblog){
        
        if(err)
        {
            res.redirect("/blogs");
        }
        else
        {
        res.redirect("/blogs/"+req.params.id);
            
        }
        
        
    });
    
});

//DELETE route
app.delete("/blogs/:id",function(req,res){
       Blog.findByIdAndRemove(req.params.id,req.body.blog,function(err,updatedblog){
        
        if(err)
        {
            res.redirect("/blogs");
        }
        else
        {
            res.redirect("/blogs");
            
        }
        
        
    });
    
    
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Server is running"); 
    
});




