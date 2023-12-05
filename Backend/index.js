const express = require("express")
const app = express()


app.get("/", (req, res) => {
    res.json({
        msg: "hello index.js"
    })
})

app.listen(2000, () => {
    console.log("listen")
})