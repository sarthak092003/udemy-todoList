const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
var items = [];
var workItems = [];
app.use(bodyParser.urlencoded({ extends: true }));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";
  var options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  var todayString = today.toLocaleDateString("en-US", options);
  switch (currentDay) {
    case 0:
      day = "Sunday";

      break;
    case 1:
      day = "Monday";

      break;
    case 2:
      day = "Tuesday";

      break;
    case 3:
      day = "Wednesday";

      break;
    case 4:
      day = "Thursday";

      break;
    case 5:
      day = "Friday";

      break;
    case 6:
      day = "Saturday";

      break;

    default:
      break;
  }
  res.render("list", { title: todayString, newItems: items });
});

app.get("/work", (req, res) => {
  res.render("list", { title: "Work", newItems: workItems });
});

app.post("/", (req, res) => {
  if (req.body.button === "Work") {
    workItems.push(req.body.add);
    res.redirect("/work");
  } else {
    items.push(req.body.add);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
