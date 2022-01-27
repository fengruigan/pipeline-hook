const express = require("express"),
    app = express(),
    axios = require("axios").default;

app.get("/", (req, res) => {
    res.send("hi");
});

// app.post("/", (req, res) => {
//     console.log(req.body);
//     let msg = {};
//     msg.content = req.body;
//     axios.fetch(DISCORD_HOOK, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: msg,
//     });
// });

app.listen(process.env.PORT || 8000, () => {
    console.log("server up");
});
