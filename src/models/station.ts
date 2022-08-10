import { model, Schema, Document } from "mongoose";

interface IStation extends Document {
    name: string;
    iso2code: string;
}

const StationSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }
});

const StationModel = model<IStation>("Station", StationSchema);

export { StationModel, IStation };
