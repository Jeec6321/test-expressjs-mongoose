import { model, Schema, Document } from "mongoose";

interface ISensor extends Document {
  name: string;
}

const SensorSchema = new Schema({
  name: {
    type: String
  }
});

const SensorModel = model<ISensor>("Sensor", SensorSchema);

export { SensorModel, ISensor };
