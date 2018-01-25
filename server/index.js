const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  app = express(),
  massive = require("massive");
require("dotenv").config();
const port = process.env.PORT || 3001;

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    dbInstance
      .run("select * from todos")
      .then(c => {
        if (!c.length) {
          dbInstance.init_db();
        }
      })
      .catch(dbInstance.init_db);
    app.set("db", dbInstance);
  })
  .catch(console.log);

app.use(cors());
app.use(bodyParser.json());

app.get("/api/todos", (req, res) => {
  app
    .get("db")
    .run("select * from todos")
    .then(todos => res.json(todos));
});

const path = require("path");
app.use("/", express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, function() {
  console.log("Server listening on port", port);
});
