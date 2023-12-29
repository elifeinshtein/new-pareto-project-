require('dotenv').config()

const express =require('express');
const app = express();
const PORT =3000;
const pool = require("./prodAndCartDB");

app.use(express.json())

const prodAndCartRouter = require('./routes/prodAndCart')
app.use('./prodAndCart')

app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
