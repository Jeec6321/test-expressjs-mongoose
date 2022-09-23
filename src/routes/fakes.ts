import { Router } from "express";
import { socket } from "../network";
import { Whatsapp } from "../utils/socialMedia";
import { Get } from "../utils/petitions";
import { Codes, ErrorTemplate, ResponseTemplate } from "../utils/responseTemplate"
import { StationModel } from "../models/station";
import { MeasureModel } from "../models/measure"
require("dotenv").config();

const routes = Router();

routes.get("/simulate-alarm", async (req, res) => {
  const DataPost = {
    degree_phenomenon: "MORADA",
    sensor_phenomenon: "Humedad",
    site_phenomenon: "Barrio Nukaki.",
    latitude_phenomenon: 4.585924,
    longitude_phenomenon: -74.079836,
    value_sensor_phenomenon: 200,
    units_phenomenon: " %",
  };

  Whatsapp(DataPost);

  const data = {
    station: {
      _id: "6321e5fd921bd448d4a69b0c",
      name: "Estación 2",
      location: {
        latitude: 10.4370837,
        longitude: -75.5090177,
      },
    },
    alarm: {
      _id: "3123123",
      type: "ROJA",
      color: "FF0000",
    },
    sensor: {
      _id: "01283123",
      name: "Temperatura",
      value: "45",
      unit: "ºC",
    },
  };

  socket.emit("alarm", JSON.stringify(data));

  return res.status(200).json({ message: "Alarm sent" });
});

routes.get("/save-data/:imei", async (req, res) => {
  try {
    const imei = req.params.imei;

    if (!imei) {
      return ResponseTemplate(200, res, ErrorTemplate(Codes.PARAM_IMEI_ERROR, {message: "Imei not found"}), false)
    }

    const station = await StationModel.findOne({imei: imei})

    if (!station) {
      return ResponseTemplate(200, res, ErrorTemplate(Codes.STATION_NOT_FOUND, {invalid_imei: imei}), false)
    }

    const ecowittApi =
      "https://api.ecowitt.net/api/v3/device/real_time?application_key=" +
      process.env.APPLICATION_KEY +
      "&api_key=" +
      process.env.API_KEY +
      "&imei=" +
      imei +
      "&call_back=all";

    const data = await Get(ecowittApi);

    let success_record = false;

    if (data.msg == "success" && data.data.length != 0) {
      success_record = true;
    }

    let response = {
      imei,
      station_id: station._id,
      measure: data,
      success_record,
    };

    const measure = new MeasureModel(response)

    measure.save()

    return ResponseTemplate(200, res, response, true)
  } catch (error) {
    return ResponseTemplate(500, res, {}, false)
  }
});

routes.post("/same", async (req, res) => {
  try {
    return res.status(200).json(req.body);
  } catch (error) {
    return res.status(200).json({ message: "error 500" });
  }
});

routes.get("/stations", async (req, res) => {
  try {
    return res.status(200).json([
      {
        id: "AA1d",
        name: "Estación 1",
        location: {
          latitude: 10.4370837,
          longitude: -75.5090177,
        },
      },
      {
        id: "YY3D2",
        name: "Estación 2",
        location: {
          latitude: 10.419338,
          longitude: -75.471564,
        },
      },
      {
        id: "UY3F2",
        name: "Estación 3",
        location: {
          latitude: 10.308277,
          longitude: -75.502495,
        },
      },
      {
        id: "ZX3VF",
        name: "Estación 4",
        location: {
          latitude: 10.356986,
          longitude: -75.511188,
        },
      },
      {
        id: "P99R8",
        name: "Estación 5",
        location: {
          latitude: 10.382886,
          longitude: -75.523348,
        },
      },
    ]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error :(" });
  }
});

routes.get("/station/:id", async (req, res) => {
  var min = 0;
  var max = 1;
  const id: string = req.params["id"];

  var location = {
    latitude: 10.382886,
    longitude: -75.523348,
  };

  switch (id) {
    case "AA1d":
      min = 0;
      max = 0.1;

      location.latitude = 10.4370837;
      location.longitude = -75.5090177;
      break;
    case "YY3D2":
      min = 0.51;
      max = 0.7;

      location.latitude = 10.419338;
      location.longitude = -75.471564;
      break;
    case "UY3F2":
      min = 0.71;
      max = 0.9;

      location.latitude = 10.308277;
      location.longitude = -75.502495;
      break;
    case "ZX3VF":
      min = 0.91;
      max = 1;

      location.latitude = 10.356986;
      location.longitude = -75.511188;
      break;
  }

  try {
    return res.status(200).json({
      station: {
        id: id,
        name: "Estación " + id,
        location: location,
      },
      temperature: getFakeValue(
        Math.random() * (60 * max - 60 * min) + 60 * min,
        60
      ),
      humidity: getFakeValue(
        Math.random() * (100 * max - 100 * min) + 100 * min,
        100
      ),
      precipitation: getFakeValue(
        Math.random() * (10000 * max - 10000 * min) + 10000 * min,
        10000
      ),
      lumens: getFakeValue(
        Math.random() * (300000 * max - 300000 * min) + 300000 * min,
        300000
      ),
      rain: getFakeValue(
        Math.random() * (1000 * max - 1000 * min) + 1000 * min,
        1000
      ),
      direction: getFakeValue(
        Math.random() * (360 * max - 360 * min) + 360 * min,
        360
      ),
      uv: getFakeValue(Math.random() * (15 * max - 15 * min) + 15 * min, 15),
      wind_speed: getFakeValue(
        Math.random() * (160 * max - 160 * min) + 160 * min,
        160
      ),
      rive_height: getFakeValue(
        Math.random() * (20 * max - 20 * min) + 20 * min,
        20
      ),
      earth_movement: getFakeValue(
        Math.random() * (100 * max + 100 * min) - 100 * min,
        100
      ),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error :(" });
  }
});

routes.get("/sensor-history", async (req, res) => {
  //if(req.quantity > 50) return res.status(400).json({error: "the maximun quantity is 50"})
  try {
    var array = [];

    for (var i = 0; i < 30; i++) {
      array.push(getFakeValue(Math.random() * (100 - 0) + 0, 100));
    }

    return res.status(200).json(array);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error :(" });
  }
});

function getFakeValue(valueIn: number, max: number) {
  var object = {
    value: parseFloat(valueIn.toFixed(2)),
    color: "",
  };

  if (object.value < max * 0.5) {
    object.color = "34a853";
  } else if (object.value < max * 0.7 && object.value > max * 0.51) {
    object.color = "fbbc05";
  } else if (object.value < max * 0.9 && object.value > max * 0.71) {
    object.color = "fa5901";
  } else if (object.value > max * 0.91) {
    object.color = "FF0000";
  }

  return object;
}

export default routes;
