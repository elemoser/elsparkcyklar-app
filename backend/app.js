const express = require("express");
const app = express();
const port = 1338;

app.get("/", (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})