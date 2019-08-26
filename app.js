const express = require("express");
const bodyParser = require("body-parser");
const mongojs = require("mongojs");
const path = require("path");

const app = express();

const db = mongojs("goaltracker", ["goals"]);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client")));

// index route
app.get("/", (req, res) => {
  res.send("It works!");
});

// GET: goals
app.get("/goals", (req, res) => {
  db.goals.find((err, docs) => {
    if (err) {
      res.send(err);
    } else {
      console.log("Getting Goals...");
      res.json(docs);
    }
  });
});

// POST: new goals
app.post("/goals", (req, res) => {
  db.goals.insert(req.body, (err, doc) => {
    if (err) {
      res.send(err);
    } else {
      console.log("Adding Goals...");
      res.json(doc);
    }
  });
});

// PUT: update goal
app.put("/goals/:id", (req, res) => {
  db.goals.findAndModify(
    {
      query: { _id: mongojs.ObjectID(req.params.id) },
      update: {
        $set: {
          name: req.body.name,
          type: req.body.type,
          deadline: req.body.deadline
        }
      },
      new: true
    },
    (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        console.log("Updating Goals...");
        res.json(doc);
      }
    }
  );
});

// DELETE: remove a goal
app.delete("/goals/:id", (req, res) => {
  db.goals.remove({ _id: mongojs.ObjectID(req.params.id) }, (err, doc) => {
    if (err) {
      res.send(err);
    } else {
      console.log("Removing Goal");
      res.json(doc);
    }
  });
});

app.listen(3000);
console.log("Running on port 3000");
