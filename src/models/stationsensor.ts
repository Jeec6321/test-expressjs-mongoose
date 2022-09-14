import { model, Schema, Document } from "mongoose";
import mongoose from "mongoose";

interface IStationSensor extends Document {
  name: string;
}

const StationSensorSchema = new Schema({
  name: {
    type: String,
  },
  station: {
    type: mongoose.Types.ObjectId, ref: "station"
  }
});

const StationSensorModel = model<IStationSensor>(
  "stationsensor",
  StationSensorSchema
);

export { StationSensorModel, IStationSensor, StationSensorSchema };
