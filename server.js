// Add code to workoutModel.js to complete the model

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const Workout = require("./workoutModel.js");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutTrackerDB", { useNewUrlParser: true });

// Routes

// Route to post our form submission to mongoDB via mongoose
app.post("/submit", ({body}, res) => {
  // Create a new workout using req.body

  // Update this route to run the `setFullName` and `lastUpdatedDate` methods before creating a new Workout
  // You must create these methods in the model.

  Workout.create(body)
    .then(dbWorkout => {
      // If saved successfully, send the the new Workout document to the client
      res.json(dbWorkout);
    })
    .catch(err => {
      // If an error occurs, send the error to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
