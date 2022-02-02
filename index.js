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
    let ref = original.ref;
    let split = ref.split("/");
    let branch = split[split.length - 1];
    if (branch !== "main") return;
    // repository
    //     full_name
    //     url
    // pusher
    //     name
    // head_commit
    //     id
    //     author
    //     timestamp
    //     message
    //     commiter
    //         name
    let content = "Hi Discord";
    let message = "OK";
    try {
        let headCommitInfo = `
            ID: ${original.head_commit.id}
            Timestamp: ${original.head_commit.timestamp}
            Author: ${original.head_commit.author.username}
            Message: ${original.head_commit.message}
            Committer: ${original.head_commit.committer.name}`;
        content = `Repository: **${original.repository.name}**
        Repo URL: ${original.repository.url}
        Pusher: ${original.pusher.name}
        Head Commit: ${original.head_commit !== null ? headCommitInfo : "Null"}`;
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
