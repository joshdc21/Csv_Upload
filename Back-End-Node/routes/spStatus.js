const express = require("express");
const { sql, config } = require("../dbConfig");

const router = express.Router();

router.get('/status', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const latestResult = await pool.request().query('SELECT TOP 1 * FROM ProcessedResults');

    res.json({ success: latestResult.recordset.length > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
