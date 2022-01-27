const express = require("express"),
    app = express(),
    axios = require("axios").default;

app.use(express.json());
require("dotenv").config();

app.get("/", (req, res) => {
    res.send("hi");
});

app.post("/", (req, res) => {
    console.log(req.body);
    let msg = {};
    msg.content = JSON.stringify(req.body);
    axios.post(process.env.DISCORD_HOOK, msg);
    res.send("OK");
});

app.listen(process.env.PORT || 8000, () => {
    console.log("server up");
});
