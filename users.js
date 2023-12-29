require('dotenv').config()

const express =require('express');
const app = express();
const PORT =5000;
const pool = require("./usersDB");

app.use(express.json())

//get All users
app.get("/users" ,async(req ,res)=>{
    try {
        const allUsers = await pool.query("SELECT * FROM user");
        res.json(allUsers.rows); 
    }catch (err) {
        console.error(err.message);
    }
});

//get one user
app.get("/users/:userID" ,async(req ,res)=>{
    const {userID} = req.params;
    try {
        const oneUser = await pool.query("SELECT * FROM user WHERE userID =$1" ,[userID]);
        res.json(oneUser.rows[0]); 
    }catch (err) {
        console.error(err.message);
    }
});

//update a user
app.put("/users/:userID" ,async(req ,res)=>{
    try {
        const {userID} =req.params;
        const {email} =req.body
        const updateUser = await pool.query("Update user SET email = $1 WHERE userID =$2" ,[email ,userID]); 
        res.json("user was updated!"); 
    }catch (err) {
        console.error(err.message);
    }
});

//delete a user 
app.delete("/users/:userID" ,async(req ,res)=>{
    try {
        const {userID} =req.params;
        const deleteUser = await pool.query("DELETE FROM user WHERE userID =$1" ,[userID]); 
        res.json("user was deleted!"); 
    }catch (err) {
        console.error(err.message);
    }
});

//create a user
app.post("/users" ,async(req ,res)=>{
    try {
        const {userID} =req.body;
        const newUser =await pool.query("INSERT INTO user(userID) VALUES ($1) RETURNING *" ,[userID]); 
        res.json(newUser.rows[0]); 
    }catch (err) {
        console.error(err.message);
    }
});

app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
