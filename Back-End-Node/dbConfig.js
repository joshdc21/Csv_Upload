require("dotenv").config();
const sql = require("mssql/msnodesqlv8");

const config = {
  connectionString: `Driver={SQL Server};Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};Uid=${process.env.DB_USER};Pwd=${process.env.DB_PASS};TrustServerCertificate=Yes;`
};

module.exports = { sql, config };