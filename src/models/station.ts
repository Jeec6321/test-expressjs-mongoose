import { model, Schema, Document } from "mongoose";
import mongoose from "mongoose"

interface IStation extends Document {
    name: string;
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
    }]
});

const StationModel = model<IStation>("station", StationSchema);

export { StationModel, IStation, StationSchema };
