// Create the required custom methods at the bottom of this file

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  rep1Name: {
    type: String,
    trim: true
  },

  cardioName: {
    type: String,
    trim: true
  },

  workoutname: {
    type: String,
    trim: true,
    required: "Workout info is Required"
  },

  rep2Name: {
    type: String,
    trim: true
  },

  rep3Name: {
    type: String,
    trim: true
  },

  workoutCreated: {
    type: Date,
    default: Date.now
  },

  lastUpdated: Date,

  fullName: String
});

// setFullName: sets the current workout's `fullName` property to their lastName appended to their `firstName`

// lastUpdatedDate: sets the current workout's `lastUpdated` property to Date.now()

// This creates our model from the above schema, using mongoose's model method
const workout = mongoose.model("workout", workoutSchema);

// Export the workout model
module.exports = workout;
