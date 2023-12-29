const Pool = require("pg").Pool;

const pool = new Pool ({
user:process.env.user,
password: String(process.env.password),
database: "prodAndCartDB",
host :"localhost" ,
port :5432

});
module.exports = pool;