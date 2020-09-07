const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const login = require("./routes/api/login");
const images = require("./routes/api/image");

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
app.use("/api/image", images);

//Serve static assets for client in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (request, reponse) => {
		reponse.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

//Setup port and run server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
