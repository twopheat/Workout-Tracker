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

app.post("/submit", ({body}, res) => {



  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// THIS route is being a bugger, cannot get it to show me the corrent workout
app.get("/goBtn", async (req, res) => {
  const workouts = await workouts.find({});
  res.render("profile", {workouts});
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
