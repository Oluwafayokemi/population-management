/**
 * @file LocationSchema
 */
// Modules
import mongoose from "mongoose";

const Schema = mongoose.Schema;
// Create the Location Schema.
const LocationSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true,
  },
  male_population: {
    type: Number,
    required: false,
  },
  female_population: {
    type: Number,
    required: false,
  },
  total_population: {
    type: Number,
    required: false,
  },
  parent_location: {
    type: String,
    required: false,
  },
});

const LocationModel = mongoose.model("Location", LocationSchema);

export default LocationModel;