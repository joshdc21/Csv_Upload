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


// const express = require("express");
// const { sql, config } = require("../dbConfig");

// const router = express.Router();

// router.post("/upload", async (req, res) => {
//   let csvData = req.body;

//   if (!Array.isArray(csvData)) {
//     return res.status(400).json({ error: "Expected an array of objects" });
//   }

//   const allowedKeys = ["customerID"];
//   const firstRow = csvData[0];
//   const originalKeys = Object.keys(firstRow);

//   const renameMap = {};
//   originalKeys.forEach((key, index) => {
//     if (!allowedKeys.includes(key) && index < 2) {
//       renameMap[key] = allowedKeys[index];
//     } else {
//       renameMap[key] = key;
//     }
//   });

//   csvData = csvData.map(row => {
//     const newRow = {};
//     for (const key in row) {
//       const newKey = renameMap[key] || key;
//       newRow[newKey] = row[key];
//     }
//     return newRow;
//   });

//   try {
//     const pool = await sql.connect(config);
//     await pool.request().query("TRUNCATE TABLE CustomerIDs");

//     for (const row of csvData) {
//       // console.log("Row to insert:", row.customerID);
//       await pool.request()
//         .input("customerID", sql.VarChar(20), row.customerID)
//         .query("INSERT INTO CustomerIDs (customerID) VALUES (@customerID)");
//     }

//     res.status(200).json({ message: "Data inserted and processed successfully" });
//   } catch (err) {
//     console.error("Upload failed:", err.message || err);
//     res.status(500).json({ error: err.message, details: err });
//   }
// });

// module.exports = router;