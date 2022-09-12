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
  var min = 0;
  var max = 1;
  const id = req.params["id"];

  switch (id) {
    case "AA1d":
      min = 0;
      max = 0.1;
      break;
    case "YY3D2":
      min = 0.51;
      max = 0.7;
      break;
    case "UY3F2":
      min = 0.71;
      max = 0.9;
      break;
   case "ZX3VF":
      min = 0.91;
      max = 1;
      break;
  }

  try {
    return res.status(200).json({
      station: {
        id: id,
        name: "Estación " + id,
        location: {
          latitude: 10.4370837,
          longitude: -75.5090177,
        },
      },
      temperature: getFakeValue(Math.random() * (60 * max - 60 * min) + 60 * min, 60),
      humidity: getFakeValue(Math.random() * (100 * max - 100 * min) + 100 * min, 100),
      precipitation: getFakeValue(Math.random() * (10000 * max - 10000 * min) + 10000 * min, 10000),
      lumens: getFakeValue(Math.random() * (300000 * max - 3000000 * min) + 3000000 * min, 300000),
      rain: getFakeValue(Math.random() * (1000 * max - 1000 * min) + 1000 * min, 1000),
      direction: getFakeValue(Math.random() * (360 * max - 360 * min) + 360 * min, 360),
      uv: getFakeValue(Math.random() * (15 * max - 15 * min) + 15 * min, 15),
      wind_speed: getFakeValue(Math.random() * (160 * max - 160 * min) + 160 * min, 160),
      rive_height: getFakeValue(Math.random() * (20 * max - 20 * min) + 20 * min, 20),
      earth_movement: getFakeValue(Math.random() * (100 * max + 100 * min) - 100 * min, 100),
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
    value: valueIn,
    color: "",
  };

  if (object.value < max * 0.5) {
    object.color = "34a853";
  } else if (object.value < max*0.7 && object.value > max*0.51) {
    object.color = "fbbc05";
  } else if (object.value < max*0.90 && object.value > max*0.71) {
    object.color = "fa5901";
  } else if (object.value > max*0.91) {
    object.color = "FF0000";
  }

  return object;
}

export default routes;
