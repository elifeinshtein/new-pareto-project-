require('dotenv').config()

const express =require('express');
const app = express();
const PORT =4000;
const pool = require("./purchasesDB");

app.use(express.json())

//get All purchases
app.get("/purchases" ,async(req ,res)=>{
    try {
        const allPurchases = await pool.query("SELECT * FROM purchase");
        res.json(allPurchases.rows); 
    }catch (err) {
        console.error(err.message);
    }
});

//get one purchase
app.get("/purchases/:orderID" ,async(req ,res)=>{
    const {orderID} = req.params;
    try {
        const onePurchase = await pool.query("SELECT * FROM purchase WHERE orderID =$1" ,[orderID]);
        res.json(onePurchase.rows[0]); 
    }catch (err) {
        console.error(err.message);
    }
});

//update a purchase
app.put("/purchases/:orderID" ,async(req ,res)=>{
    try {
        const {orderID} =req.params;
        const {orderDate} =req.body
        const updateMakat = await pool.query("Update purchase SET orderDate = $1 WHERE orderID =$2" ,[orderDate ,orderID]); 
        res.json("purchase was updated!"); 
    }catch (err) {
        console.error(err.message);
    }
});

//delete a purchase 
app.delete("/purchases/:orderID" ,async(req ,res)=>{
    try {
        const {orderID} =req.params;
        const deleteMakat = await pool.query("DELETE FROM purchase WHERE orderID =$1" ,[orderID]); 
        res.json("purchase was deleted!"); 
    }catch (err) {
        console.error(err.message);
    }
});

//create a purchase
app.post("/purchases" ,async(req ,res)=>{
    try {
        const {orderID} =req.body;
        const newPurchase =await pool.query("INSERT INTO purchase(orderID) VALUES ($1) RETURNING *" ,[orderID]); 
        res.json(newPurchase.rows[0]); 
    }catch (err) {
        console.error(err.message);
    }
});

app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
