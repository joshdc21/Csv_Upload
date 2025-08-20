const express = require("express");
const { sql, config } = require("../dbConfig");

const router = express.Router();

router.get("/results", async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request().query("SELECT TOP 1000 * FROM ProcessedResults");

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Error fetching results:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
