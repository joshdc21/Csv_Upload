const express = require("express");
const { sql, config } = require("../dbConfig");
const { format } = require("@fast-csv/format");

const router = express.Router();

router.get("/results/download", async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request().query("SELECT * FROM ProcessedResults");

    res.setHeader("Content-Disposition", "attachment; filename=processed_results.csv");
    res.setHeader("Content-Type", "text/csv");

    const csvStream = format({ headers: true });
    csvStream.pipe(res);
    result.recordset.forEach(row => csvStream.write(row));
    csvStream.end();

  } catch (err) {
    console.error("Error downloading results:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;