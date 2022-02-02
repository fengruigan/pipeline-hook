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
    let content = "Hi Discord";
    let message = "OK";
    try {
        content = `Repository: ${original.repository.name}
        Pusher: ${original.pusher.name}
        Head Commit:
        ID: ${original.head_commit.id}
        message: ${original.head_commit.message}
        committer: ${original.head_commit ? original.head_commit.committer.name : "Null"}`;
    } catch (err) {
        console.log(err);
    }

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
