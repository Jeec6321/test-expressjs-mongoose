import { Router } from "express";
import { StationSensorModel, IStationSensor } from "../models/stationsensor";

const routes = Router();

routes.get("/all", async (req, res) => {
    try {
        const stations: IStationSensor[] = await StationSensorModel.find().populate({
            path: "station"
        }).exec();
        return res.json(stations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
});

export default routes;
