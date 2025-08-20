const express = require("express");
const cors = require("cors");

const uploadRoute = require("./routes/upload");
const joinRoute = require("./routes/join");
const dashboardMetaRoute = require("./routes/dashboardmeta");
const spStatusRoute = require("./routes/spStatus")
const results = require("./routes/results")
const downloadResult = require("./routes/downloadResult")

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoute);
app.use("/api", joinRoute);
app.use("/api", dashboardMetaRoute); 
app.use("/api", spStatusRoute)
app.use("/api", results)
app.use("/api", downloadResult)


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
