const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const DB = "JobForm";
const URL = "mongodb+srv://mansoor:mansoor123@cluster0.ybuuf.mongodb.net/test?authSource=admin&replicaSet=atlas-qox0hn-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
require('dotenv').config();
app.use(cors());
app.use(express.json());

app.post("/Registration", async function(req,res){
    
    console.log(req.body)
    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);  
    await db.collection("Userdetails").insertOne(req.body);
            await connection.close();
            res.json({
                message: "User Registerd"
            })
        
      } catch (error) {
        console.log(error);
      }
})

app.get("/Result", async function(req,res){
  try {
      let connection = await mongodb.connect(URL);
      let db = connection.db(DB);
      let userdata = await db.collection("Userdetails").find().toArray();
      res.json(userdata);
      await connection.close();
    } catch (error) {
      console.log(error);
    }
  }
)

app.delete("/Delete/:id", async function (req, res) {
  try {
      let connection = await mongodb.connect(URL);
      let db = connection.db(DB);
      await db.collection("Userdetails").deleteOne({ _id: mongodb.ObjectID(req.params.id)})
      await connection.close()
      res.json({
          message: "Deleted"
      })
  } catch (error) {
      console.log(error)
  }
})

app.listen(process.env.PORT|| 5000);
