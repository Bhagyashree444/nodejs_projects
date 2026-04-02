const {faker} = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require('uuid');


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}))
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));

const port = 8080;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password:'MyYear2026*'
});

let getRandomUser = () => {
  return [
     faker.string.uuid(),
     faker.internet.username(),
     faker.internet.email(),
     faker.internet.password(),
    
  ];
}

//route - get count
app.get("/",(req,res) => {
    let q = "SELECT count(*) from user";
    try{
           connection.query(q,(error,result)=>{
            if(error) throw error;
          //console.log(result);
          //  console.log(result[0]["count(*)"]);
           let count = result[0]["count(*)"];
           res.render("home.ejs",{count});
           
           })
    }catch(error){
        console.log(error);
        res.send("Some error in DB");
    }
});

//route - show 
app.get("/user",(req,res)=>{
    let q = "SELECT id,username,email FROM USER ORDER BY username asc";
    try{

      connection.query(q,(error,result)=>{
        if(error) throw error;
        //console.log(result);
        res.render("showusers.ejs",{result});
       })
   }
    catch(error)
    {
      console.log(error);
      res.send("Some issue in DB");
    }
})

//route - edit user
app.get("/user/:id/edit",(req,res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try{
        connection.query(q,(error,result)=>{
           if(error) throw error;
           console.log(result);
           let user = result[0]
           res.render("edit.ejs",{user});
        })
  }catch(error)
  {
     console.log(error);
     res.send("Some issue in DB");
  }

    
})

//route - update user in DB
app.patch("/user/:id",(req,res)=>{
   let {id} = req.params;
   let {password : formPass, username : newUsername} = req.body;
   let q = `SELECT * FROM user WHERE id='${id}'`;
   try{
         connection.query(q,(error,result)=>{
           if(error) throw error;
           console.log(result);
           let user = result[0];
           if(formPass != user.password)
           {
              res.send("Wrong Password");
           }
           else{
              let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
              try{
                    connection.query(q2,(error,result)=>{
                      if(error) throw error;
                      res.redirect("/user");
                        //res.send(result);
                        // console.log(result);
                    })
              }catch(error)
              {
                  console.log(error);
                  res.send("Some issue in DB");
              }
           }
           
        }) 
   }catch(error)
   {
       console.log(error);
       res.send("Some issue in DB");
   }
})

//route - to open form for new user
app.get("/user/new",(req,res)=>{
    res.render("create.ejs");
})


//route - add a new user in DB
app.post("/user",(req,res)=>{
    let {username : Newusername , email : Newemail, password : Newpassword } = req.body;
    try{
         let q = "INSERT INTO user (id,username,email,password) VALUES ?";
         let values = [[uuidv4(),Newusername,Newemail,Newpassword]];

         connection.query(q,[values],(error,result)=>{
             if(error) throw error;
             console.log(result);
             res.redirect("/user");
         })
    }catch(error)
    {
        console.log(error);
        res.send("Some issue in DB");
    }
})

//route - open delete ejs for deleteing a user
app.get("/user/:id/delete",(req,res)=>{
  let {id} = req.params;
   try{
       let q = `SELECT * FROM USER WHERE id = '${id}'`;
       connection.query(q,(error,result)=>{
           if(error) throw error;
           console.log(result);
           let user = result[0];
           res.render("delete.ejs",{user});
       })
   }catch(error)
   {
      console.log(error);
      res.send("User not found");
   }
})

//route - delete a user from DB
app.delete("/user/:id",(req,res)=>{
    let {id} = req.params;
    let {password : formPass} = req.body;

    try{
        let q = `SELECT * from user WHERE id='${id}'`;
        connection.query(q,(error,result)=>{
            if(error) throw error;
            console.log(result);
            console.log(formPass);
            let user = result[0];
            console.log(user.password);

            if(formPass != user.password)
            {
               res.send("Wrong Password");
            }
            else{
                  let q = `DELETE from user WHERE id='${id}'`;

                   try{
                        connection.query(q,(error,result)=>{
                        if(error) throw error;
                        console.log(result);
                        res.redirect("/user");
                         })
                      }catch(error)
                      {
                         console.log(error);
                          res.send("Some issue in DB");
                        }
                        
                }
            })
      }catch(error)
      {
          console.log(error);
          res.send("User not found");
      }
    })


//Server listening
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});

//1) Writing Query
//  let q = "INSERT INTO user (id,username,email,password) VALUES ?";

//2) adding one user
//let u = [["12545","12545_newuser","abc245@gmail.com","abcdedgwg"]];

//adding more than 1 user
//let users = [["125","125_newuser","abc2@gmail.com","abcde"],["126","126_newuser","abc3@gmail.com","abcdef"]];

//3) Pushing to DB
// try{
//      connection.query(q,[u],(error,result) =>{
//           if(error) throw error;
//           console.log(result);
//         //   console.log(result.length);
//         //   console.log(result[0]);
//         //   console.log(result[1]);
//        })
//     }
// catch(error)
// {
//     console.log(error);
// }



//Inserting fake data
//1) Query above
//2) Storing fake data in an array
// let data = [];
// for(let i=1;i<=100;i++)
// {
//     data.push(getRandomUser()); //100 fake users
// }

//3) Pushing fake data in DB
// try{
//      connection.query(q,[data],(error,result) =>{
//           if(error) throw error;
//           console.log(result);
//         //   console.log(result.length);
//         //   console.log(result[0]);
//         //   console.log(result[1]);
//        })
//     }
// catch(error)
// {
//     console.log(error);
// }

// connection.end();



