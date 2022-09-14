import { Router } from "express";
import { StationModel, IStation } from "../models/station";

const routes = Router();

routes.get("/all", async (req, res) => {
    try {
        const stations: IStation[] = await StationModel.find().populate({
            path: "sensor"
        }).exec();
        return res.json(stations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
});

routes.get("/:id", async (req, res) => {
    try {
        const id: String = req.params.id

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(404).json({"message": "Invalid id"})
        }   

        const station = await StationModel.findOne({_id: id}).exec();

        if (!station) {
            return res.status(404).json({"message": "Station " + id + " not found"});
        }

        var min = 0;
        var max = 1;

        let data = {
            station,
            temperature: getFakeValue(Math.random() * (60 * max - 60 * min) + 60 * min, 60),
            humidity: getFakeValue(Math.random() * (100 * max - 100 * min) + 100 * min, 100),
            precipitation: getFakeValue(Math.random() * (10000 * max - 10000 * min) + 10000 * min, 10000),
            lumens: getFakeValue(Math.random() * (300000 * max - 300000 * min) + 300000 * min, 300000),
            rain: getFakeValue(Math.random() * (1000 * max - 1000 * min) + 1000 * min, 1000),
            direction: getFakeValue(Math.random() * (360 * max - 360 * min) + 360 * min, 360),
            uv: getFakeValue(Math.random() * (15 * max - 15 * min) + 15 * min, 15),
            wind_speed: getFakeValue(Math.random() * (160 * max - 160 * min) + 160 * min, 160),
            rive_height: getFakeValue(Math.random() * (20 * max - 20 * min) + 20 * min, 20),
            earth_movement: getFakeValue(Math.random() * (100 * max + 100 * min) - 100 * min, 100),
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
});

function getFakeValue(valueIn: number, max: number) {
  var object = {
    value: parseFloat(valueIn.toFixed(2)),
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

