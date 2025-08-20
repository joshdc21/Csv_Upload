const express = require("express");
const { sql, config } = require("../dbConfig");

const router = express.Router();

let poolPromise = null;
async function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(config);
  }
  return poolPromise;
}

async function refreshProcessedResults(pool) {
  // console.log("Executing stored procedure getFullInfo");
  await pool.request().execute("getFullInfo");
  // console.log("Stored procedure completed");
}

router.get("/customers-by-location", async (req, res) => {
  try {
    const pool = await getPool();
    await refreshProcessedResults(pool); 
    const result = await pool.request().query("SELECT * FROM CustomersByLocation");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching customers by location:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/age-distribution", async (req, res) => {
  try {
    const pool = await getPool();
    await refreshProcessedResults(pool);
    const result = await pool.request().query("SELECT * FROM AgeDistribution ORDER BY Age");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching Age Distribution:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/order-by-category", async (req, res) => {
  try {
    const pool = await getPool();
    await refreshProcessedResults(pool);
    const result = await pool.request().query("SELECT * FROM OrdersByCategory");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching Order by category:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/customer-join-month", async (req, res) => {
  try {
    const pool = await getPool();
    await refreshProcessedResults(pool);
    const result = await pool.request().query("SELECT * FROM CustomersByJoinMonth ORDER BY Month");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching customers join month:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
