db.workoutPlans.insertMany([

   { item: "Monday", workout: "biceps", reps: { l: 50, r: 50, uom: "pulls" }},

   { item: "Tuesday", qty: "triceps", reps: { l: 40, r: 40, uom: "extensions" }},

   { item: "Wednesday", qty: "cobras", reps: { l: 25, r: 25, uom: "flexes" }},

   { item: "Thursday", qty: "deltoids", reps: { l: 30, r: 30, uom: "combinations" }},

   { item: "Friday", qty: "quads", reps: { l: 15, r: 15, uom: "thrusts" }}

]);