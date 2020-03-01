const express = require("express");
const mongojs = require("mongojs");

const app = express();

const databaseURL = "workoutTrackerDB";
const collections = ["workoutPlans"];

const db = mongojs(databaseURL, collections);

db.on("error", error => {
    console.log("Database Error:", error);
});

app.get("/", (req, res) => {
    res.send("Workout Tracker: pick a /day [monday, tuesday, wednesday, thursday, friday] OR choose a /muscle-group [biceps, triceps, cobras, deltoids, quads] to get started.");
});

app.get("/all", (req, res) => {
    db.workoutPlans.find({}, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
app.get("/monday", (req, res) => {
    db.workoutPlans.find({ item: "Monday" }, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
app.get("/tuesday", (req, res) => {
    db.workoutPlans.find({ item: "Tuesday" }, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
app.get("/wednesday", (req, res) => {
    db.workoutPlans.find({ item: "Wednesday" }, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
app.get("/thursday", (req, res) => {
    db.workoutPlans.find({ item: "Thursday" }, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
app.get("/friday", (req, res) => {
    db.workoutPlans.find({ item: "Friday" }, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});

app.get("/biceps", (req, res) => {
    db.workoutPlans.find({ workout: "biceps" }, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
app.get("/triceps", (req, res) => {
    db.workoutPlans.find({ workout: "triceps" }, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
app.get("/cobras", (req, res) => {
    db.workoutPlans.find({ workout: "cobras" }, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
app.get("/deltoids", (req, res) => {
    db.workoutPlans.find({ workout: "deltoids" }, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
app.get("/quads", (req, res) => {
    db.workoutPlans.find({ workout: "quads" }, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});
app.listen(3000, () => {
    console.log("App running on port 3000!");
});
