import { model, Schema, Document } from "mongoose";

interface IMeasure extends Document {
  imei: String,
  stations_id: String,
  measure: Object,
  success_record: Boolean
}

const MeasureSchema = new Schema({
  imei: {
    type: String
  },
  station_id: {
    type: String
  },
  measure: {
    type: Object
  },
  success_record: {
      type: Boolean
  }
}, 
{ timestamps: { createdAt: 'created_at' } });

const MeasureModel = model<IMeasure>("measure", MeasureSchema);

export { MeasureModel, IMeasure };
