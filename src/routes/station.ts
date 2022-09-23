import { Router } from "express";
import { StationModel, IStation } from "../models/station";
import { MeasureModel } from "../models/measure"
import { Codes, ErrorTemplate, ResponseTemplate } from "../utils/responseTemplate"

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

        const station = await StationModel.findOne({_id: id}).exec();

        if (!station) {
          return ResponseTemplate(200, res, ErrorTemplate(Codes.STATION_NOT_FOUND, {message: "Station " + id + "not found" }), false)
        }

        const lastMeasure = await MeasureModel.findOne({imei: station.imei, success_record: true}).sort({created_at: -1}).exec()

        if (!lastMeasure) {
          return ResponseTemplate(200, res, ErrorTemplate(Codes.LAST_MEASURE_ERROR, {message: "Last measure not found" }), false)
        }

        return ResponseTemplate(200, res, lastMeasure, true)
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

