const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path")

// Configuration
require("./config/db")();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}))



// Middleware:
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use('/images', express.static(path.join(__dirname, 'Images')));

app.get('/test', (req, res) => {
  res.json({
    msg: "test success"
  })
})


// Routes
app.use(`/api/v1`, require("./routes/user"));
app.use('/post/v1', require('./routes/post'));


app.get('*', (req, res) => {
  res.status(404).send('Not Found GET');
});

app.post('*', (req, res) => {
  res.status(404).send('Not Found POST');
});


const port = process.env.PORT || 2000;

app.listen(port, () => {
  console.log("server listening on port : http://localhost:" + port);
});
