const express = require("express"),
  app = express();

require("dotenv").config();
app.use(express.json());

// setup routes
const githubRouter = require("./routes/git-hooks");

app.use(express.static(__dirname + "/front-end/build"));
app.use("/api/git-hooks", githubRouter);

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("server up");
});
