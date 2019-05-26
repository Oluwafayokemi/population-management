/**
 * @file LocationSchema
 */
// Modules
import mongoose from "mongoose";

const Schema = mongoose.Schema;
// Create the Location Schema.
const LocationSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  male_pupulation: {
    type: Number,
    required: false,
  },
  female_pupulation: {
    type: Number,
    required: false,
  },
  total_pupulation: {
    type: Number,
    required: false,
  },
  parent_location: {
    type: String,
    required: false,
  },
  sub_location: {
    type: String,
    required: false,
  },
});

const LocationModel = mongoose.model("Location", LocationSchema);

export default LocationModel;