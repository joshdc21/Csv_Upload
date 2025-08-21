const express = require("express");
const multer = require("multer");
const { sql, config } = require("../dbConfig");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const tempFilePath = path.join(__dirname, `temp-${uuidv4()}.csv`);

  try {
    // Save the uploaded buffer to a temp file
    fs.writeFileSync(tempFilePath, req.file.buffer);

    const pool = await sql.connect(config);

    await pool.request().query("TRUNCATE TABLE CustomerIDs");
    // await pool.request().query("TRUNCATE TABLE ListofIDs");

    // Use BULK INSERT for maximum speed
    // await pool.request().query(`
    //   BULK INSERT ListofIDs
    //   FROM '${tempFilePath.replace(/\\/g, '\\\\')}'
    //   WITH (
    //     FIELDTERMINATOR = ',',
    //     ROWTERMINATOR = '\\n',
    //     FIRSTROW = 2
    //   )
    // `);
    
    await pool.request().query(`
      BULK INSERT CustomerIDs
      FROM '${tempFilePath.replace(/\\/g, '\\\\')}'
      WITH (
        FIELDTERMINATOR = ',',
        ROWTERMINATOR = '\\n',
        FIRSTROW = 2
      )
    `);

    res.json({ message: "Upload Successful" });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ error: err.message });
  } finally {
    // Delete temp file
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
});

module.exports = router;