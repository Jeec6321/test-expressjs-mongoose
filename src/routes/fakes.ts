import { Router } from "express";

const routes = Router();

routes.get("/fake", async (req, res) => {
  return res.status(200).json({ message: "All is good!!" });
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
  try {
    return res.status(200).json({
      station: {
        id: req.params["id"],
        name: "Estación E1",
        location: {
          latitude: Math.random() * (10.413216 - 10.3759059) + 10.3759059,
          longitude: Math.random() * (-75.5169459 + 75.4660635) - 75.4660635,
        },
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
      earth_movement: Math.random() * (100 + 100) - 100,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error :(" });
  }
});

routes.get("/station/AA1d", async (req, res) => {
  try {
    return res.status(200).json({
      station: {
        id: "AA1d",
        name: "Estación 1",
        location: {
          latitude: 10.4370837,
          longitude: -75.5090177,
        },
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
      earth_movement: Math.random() * (100 + 100) - 100,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error :(" });
  }
});

routes.get("/station/YY3D2", async (req, res) => {
  try {
    return res.status(200).json({
      station: {
        id: "YY3D2",
        name: "Estación 2",
        location: {
          latitude: 10.419338,
          longitude: -75.471564,
        },
      },
      temperature: Math.random() * (60 - 30) + 30,
      humidity: Math.random() * (100 - 50) + 50,
      precipitation: Math.random() * (10000 - 5000) + 5000,
      lumens: Math.random() * (300000 - 150000) + 0,
      rain: Math.random() * (1000 - 500) + 500,
      direction: Math.random() * (360 - 0) + 0,
      uv: Math.random() * (15 - 7.5) + 7.5,
      wind_speed: Math.random() * (160 - 80) + 160,
      rive_height: Math.random() * (20 - 10) + 10,
      earth_movement: Math.random() * (50 + 50) - 50,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error :(" });
  }
});

routes.get("/station/YY3D2", async (req, res) => {
  try {
    return res.status(200).json({
      station: {
        id: "UY3F2",
        name: "Estación 3",
        location: {
          latitude: 10.308277,
          longitude: -75.502495,
        },
      },
      temperature: Math.random() * (60 - 42) + 42,
      humidity: Math.random() * (100 - 70) + 70,
      precipitation: Math.random() * (10000 - 7000) + 7000,
      lumens: Math.random() * (300000 - 210000) + 210000,
      rain: Math.random() * (1000 - 700) + 700,
      direction: Math.random() * (360 - 0) + 0,
      uv: Math.random() * (15 - 10.5) + 10.5,
      wind_speed: Math.random() * (160 - 112) + 112,
      rive_height: Math.random() * (20 - 14) + 14,
      earth_movement: Math.random() * (70 + 70) - 70,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error :(" });
  }
});

routes.get("/station/ZX3VF", async (req, res) => {
  try {
    return res.status(200).json({
      station: {
         id: "ZX3VF",
        name: "Estación 4",
        location: {
          latitude: 10.356986,
          longitude: -75.511188,
        },
      },
      temperature: Math.random() * (60 - 55) + 55,
      humidity: Math.random() * (100 - 91) + 91,
      precipitation: Math.random() * (10000 - 9100) + 9100,
      lumens: Math.random() * (300000 - 280000) + 280000,
      rain: Math.random() * (1000 - 910) + 910,
      direction: Math.random() * (360 - 0) + 0,
      uv: Math.random() * (15 - 14) + 14,
      wind_speed: Math.random() * (160 - 144) + 144,
      rive_height: Math.random() * (20 - 18.1) + 18.1,
      earth_movement: Math.random() * (90 + 90) - 90,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error :(" });
  }
});

routes.get("/sensor-history", async (req, res) => {
  try {
    var array = [];

    for (var i = 0; i < 30; i++) {
      var object = {
        value: 0,
        color: ""
      }

      object.value = Math.random() * (100 - 0) + 0

      if (object.value < 70) {
        object.color = "34a853";
      } else if (object.value < 80 && object.value > 70) {
        object.color = "fbbc05"
      } else if (object.value < 90 && object.value > 80) {
        object.color = "fa5901"
      } else if (object.value > 90) {
        object.color = "FF0000"
      }

      array.push(object)
    }


    return res.status(200).json(array);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error :(" });
  }
});

export default routes;
