import { model, Schema, Document } from "mongoose";

interface ISuscribe extends Document {
    name: String;
    email: String;
    whatsapp: String;
    accept_terms: Boolean;
    whatsapp_verified: Boolean;
    email_verified: Boolean;
    hash_whatsapp: String;
    hash_email: String;
}

const SuscribeSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    whatsapp: {
       type: String,
       unique: true
    },
    accept_terms: {
        type: Boolean
    },
    whatsapp_verified: {
        type: Boolean
    },
    email_verified: {
        type: Boolean
    },
    hash_whatsapp: {
        type: String
    },
    hash_email: {
        type: String
    }
});

const SuscribeModel = model<ISuscribe>("suscribe", SuscribeSchema);

export { SuscribeModel, ISuscribe, SuscribeSchema };
