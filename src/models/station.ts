import { model, Schema, Document } from "mongoose";
import mongoose from "mongoose"

interface IStation extends Document {
    name: string;
    location: object;
    mac: string;
    imei: string
}

const StationSchema = new Schema({
    name: {
        type: String
    },
    location: {
        type: Object
    },
    sensors: [{
       type: mongoose.Types.ObjectId, ref: "sensor"
    }],
    mac: {
        type: String
    },
    imei: {
        type: String
    }
});

const StationModel = model<IStation>("station", StationSchema);

export { StationModel, IStation, StationSchema };
