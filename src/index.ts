import "./lib/db";
import express from "express";
import countryRoute from "./routes/country";
import sensorRoute from "./routes/sensor";
import stationRoute from "./routes/station";
import stationSensorRoute from "./routes/stationsensor"
import fakesRoute from "./routes/fakes";
import suscribeRoute from "./routes/suscribe"
import cors from 'cors';
import http from 'http'

require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.raw({ type: "application/vnd.custom-type" }));

app.use(express.text({ type: "text/html" }));

//app.use("/countries", countryRoute);

app.use("/sensor", sensorRoute);

app.use("/station", stationRoute);

app.use("/station-sensor", stationSensorRoute)

app.use("/suscribe", suscribeRoute)

app.use("/fake", fakesRoute);

const server = http.createServer(app);

export const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  }
});

export const socket = io.on("connection", function(socket: any) {
  console.log("a user connected");
  // whenever we receive a 'message' we log it out
  socket.on("alarm", function(message: any) {
    console.log("alarm" + message);
  });
});

const PORT = process.env.PORT || 3333

server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});