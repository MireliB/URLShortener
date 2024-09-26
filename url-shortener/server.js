const express = require("express");
const cors = require("cors");
const urlRouter = require("./routes/url.route");
const metricsRouter = require("./routes/metrics.route");
const initMongo = require("./db/db");
const initCleanup = require("./utils/init-cleanup");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

initMongo();
initCleanup();

app.use(express.json());

app.use("/url", urlRouter);
app.use("/metrics", metricsRouter);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
