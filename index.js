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
    let original = req.body;
    // repository
    //     full_name
    // pusher
    //     name
    // head_commit
    //     id
    //     message
    //     commiter
    //         name
    let content = `Repository: ${original.repository.name}
    Pusher: ${original.pusher.name}
    Head Commit:
        ID: ${original.head_commit.id}
        message: ${original.head_commit.message}
        commiter: ${original.head_commit.commiter.name}`;

    let message = "OK";
    let msg = {};
    msg.content = content;
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
