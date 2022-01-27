const express = require("express"),
    app = express();

app.get("/", (req, res) => {
    res.send("hi");
});

app.listen(8000, () => {
    console.log("server up");
});
