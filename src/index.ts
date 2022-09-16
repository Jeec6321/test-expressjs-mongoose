import "./lib/db";
import express from "express";
import countryRoute from "./routes/country";
import sensorRoute from "./routes/sensor";
import stationRoute from "./routes/station";
import stationSensorRoute from "./routes/stationsensor"
import fakesRoute from "./routes/fakes";
import suscribeRoute from "./routes/suscribe"

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(express.raw({ type: "application/vnd.custom-type" }));

app.use(express.text({ type: "text/html" }));

//app.use("/countries", countryRoute);

app.use("/sensor", sensorRoute);

app.use("/station", stationRoute);

app.use("/station-sensor", stationSensorRoute)

app.use("/suscribe", suscribeRoute)

app.use("/fake", fakesRoute);

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
