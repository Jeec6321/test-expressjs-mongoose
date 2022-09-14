import mongoose from "mongoose";

require('dotenv').config();

if (!process.env.MONGO_URL) {
  throw new Error("Please add the MONGO_URL environment variable");
}

if (!process.env.DATABASE) {
   throw new Error("Please add the DATABASE environment variable");
}

const COMPLETE_URL = process.env.MONGO_URL + "/" + process.env.DATABASE

console.log("COMPLETE_URL => " + COMPLETE_URL )

mongoose.connect(COMPLETE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

//mongoose.set('debug', true);

database.on(
  "error",
  console.error.bind(console, "❌ mongodb connection error"),
);

database.once("open", () => console.log("✅ mongodb connected successfully"));

mongoose.Promise = Promise;