const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const login = require("./routes/api/login");
const images = require("./routes/api/image");

const Queue = require("bull");

//Setting up cached queue

const app = express();
app.use(express.json());

//Connecting to MongoDB instance running in Atlas, using URI provided in config
const db = config.get("mongoURI"); //MongoURI specified in config file
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

//Routes
app.use("/api/login", login);
app.use("/api/images", images);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/client/index.html");
});

//Setup port and run server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
