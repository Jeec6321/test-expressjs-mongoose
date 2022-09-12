import "./lib/db";
import express from "express";
import countryRoute from "./routes/country";
import stationRoute from "./routes/station";
import fakesRoute from "./routes/fakes";

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/", async (req, res) => {
  res.json({ message: "Please visit /countries to view all the countries" });
});

//app.use("/countries", countryRoute);

//app.use("/stations", stationRoute);

app.use("/", fakesRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
