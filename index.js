const express = require("express"),
    app = express(),
    axios = require("axios").default;

app.use(express.json());
require("dotenv").config();

app.get("/", (req, res) => {
    res.send("hi");
});

app.post("/", async (req, res) => {
    console.log(req.body);
    let message = "OK";
    let msg = {};
    msg.content = JSON.stringify(req.body);
    try {
        await axios.post(process.env.DISCORD_HOOK, msg);
    } catch (err) {
        message = "NOT OK";
        console.log(err);
    }
    res.send(message);
});

app.listen(process.env.PORT || 8000, () => {
    console.log("server up");
});
