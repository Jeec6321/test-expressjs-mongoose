import { Router } from "express";
import { SensorModel, ISensor } from "../models/sensor";

const routes = Router();

routes.get("/all", async (req, res) => {
    try {
        const stations: ISensor[] = await SensorModel.find().exec();
        return res.json(stations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
})

export default routes;

