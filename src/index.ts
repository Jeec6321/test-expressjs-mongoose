import "./lib/db";
import express from "express";
import countryRoute from "./routes/country";
import stationRoute from "./routes/station";
import testRoute from "./routes/test";

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/", async (req, res) => {
  res.json({ message: "Please visit /countries to view all the countries" });
});

app.get("/station/:id", async(req, res) => {
  try {
    return res.status(200).json(
      {
        station: {
          id: req.params['id'],
          name: "Estación E1",
          location: {
            latitude: Math.random() * (10.413216 - 10.3759059) + 10.3759059,
            longitude: Math.random() * (-75.5169459 + 75.4660635) - 75.4660635,
          }
        },
        temperature: Math.random() * (60 - 0) + 0,
        humidity: Math.random() * (100 - 0) + 0,
        precipitation: Math.random() * (10000 - 0) + 0,
        lumens: Math.random() * (300000 - 0) + 0,
        rain: Math.random() * (1000 - 0) + 0,
        direction: Math.random() * (360 - 0) + 0,
        uv: Math.random() * (15 - 0) + 0,
        wind_speed: Math.random() * (160 - 0) + 0,
        rive_height: Math.random() * (20 - 0) + 0,
        earth_movement: Math.random() * (100 + 100) - 100
      }
    )
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error :("})
  }
});

app.use("/countries", countryRoute);

app.use("/stations", stationRoute);

app.use("/test", testRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
