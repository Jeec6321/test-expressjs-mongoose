import { Router } from "express";
import { StationModel, IStation } from "../models/station";

const routes = Router();

routes.get("/", async (req, res) => {
    try {
        const stations: IStation[] = await StationModel.find().exec();
        return res.json(stations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
});

export default routes;

