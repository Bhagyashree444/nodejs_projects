const express = require('express');
const app = express();
const path = require('path');
const { v4 : uuidv4 } = require('uuid');
const methodOverride = require('method-override');


const port = 8080;

app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

app.set('view engine','ejs');
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"/public")));

let posts = [
    {
        id : uuidv4(),
        username : "Ava",
        content : "I love coding!"
    },
    {
        id : uuidv4(),
        username : "Kriti",
        content : "Hardwork is important to achieve success"
    },
    {
        id : uuidv4(),
        username : "Rashmika",
        content : "I love Acting!"
    }
]

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})

app.get("/posts",(req,res)=>{
    res.render(`index.ejs`,{posts});
})

app.get("/posts/new", (req,res)=>{
    res.render(`new.ejs`);
})

app.post("/posts",(req,res)=>{
    //console.log(req.body);
    let id = uuidv4();
    let {username, content} = req.body;
    //let newpost = {username : username, content : content};
    //posts.push(newpost);
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
      let {id} = req.params;
      //console.log(id)
      let post = posts.find((p)=>{
          return p.id === id
      } )
     res.render("show.ejs",{post});
})

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    console.log(id);
    console.log(newContent);
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    posts = posts.filter((p)=> id !== p.id);
    //res.send("Delete successfull");
    res.redirect("/posts");
})