const express = require("express");
const app = express();
const path = require("path");


const port = 3000;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})

app.get("/ig/:username",(req,res)=>{
//basics
//     const followersName = ["adam","bob","steve","abc"];
//     const { username } = req.params;
//     //console.log(username);
//     const followers = Math.floor(Math.random() * 200) + 1;
//     const following = Math.floor(Math.random() * 400) + 1;
//     //1
//    // res.render("home.ejs",{username :username ,followers :followers ,following : following });
//    //2
//     res.render("instagram.ejs",{username  ,followers  ,following, followersName });

//data.json
let {username} = req.params;
const instaData = require("./data.json");
const data = instaData[username];
if(data)
{
    res.render("instagram2.ejs",{data})
}
else
{
    res.render("error.ejs");
}

//console.log(data);

})