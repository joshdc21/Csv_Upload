const express = require("express");
const { sql, config } = require("../dbConfig");

const router = express.Router();

router.get("/join", async (req, res) => {
  try {
    const pool = await sql.connect(config);

    // Only execute the stored procedure
    await pool.request().execute("getFullInfo");

    res.status(200).json({ message: "Stored procedure executed successfully" });
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
