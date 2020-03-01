const express = require("express");
const mongojs = require("mongojs");

const app = express();

const databaseURL = "workoutTrackerDB";
const collections = ["workoutPlans"];

