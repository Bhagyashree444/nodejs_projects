const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(res => console.log("Connection successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats =[
   {
      from : "Howard",
      to : "Berny",
      msg : "No man can say that he got the star from the space for you",
      created_at : new Date()
   },
    {
      from : "Amy",
      to : "Penny",
      msg : "Omg Penny, you look so pretty",
      created_at : new Date()
   },
    {
      from : "Penny",
      to : "Amy",
      msg : "Ohh, Ammy can i remove this painting",
      created_at : new Date()
   },
    {
      from : "Sheldon",
      to : "Leonard",
      msg : "Ain't i the smartest",
      created_at : new Date()
   },
    {
      from : "Raj",
      to : "Howard",
      msg : "Does this pink dress look good on me",
      created_at : new Date()
   },
    {
      from : "Howard",
      to : "Berny",
      msg : "Can i go to my Raj's place",
      created_at : new Date()
   },
    {
      from : "Leonard",
      to : "Penny",
      msg : "Do you want to have a cup of coffee",
      created_at : new Date()
   },
    {
      from : "Penny",
      to : "Sheldon",
      msg : "can I have your wifi password",
      created_at : new Date()
   },
    {
      from : "Berny",
      to : "Penny",
      msg : "Howard proposed to me",
      created_at : new Date()
   },
]


Chat.insertMany(allChats);


