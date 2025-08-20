const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const METABASE_SECRET = "5baaececa926f71bdb142d7e777c4c109b13c3b96f9cbe5b1f0e35161f92b4d0";
const METABASE_HOST = "http://192.168.56.1:3001"; 
const DASHBOARD_ID = 33; 

router.get("/dashboard", (req, res) => {
  try {
    const payload = {
      resource: { dashboard: DASHBOARD_ID },
      params: {}, 
      exp: Math.round(Date.now() / 1000) + (10 * 60) // token expires in 10 minutes
    };

    const token = jwt.sign(payload, METABASE_SECRET);
    const embedUrl = `${METABASE_HOST}/embed/dashboard/${token}#bordered=true&titled=true`;

    res.json({ url: embedUrl });
  } catch (err) {
    console.error("Error generating Metabase embed URL:", err);
    res.status(500).json({ error: "Failed to generate embed URL" });
  }
});

module.exports = router;
