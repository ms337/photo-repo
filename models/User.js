const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create schema

var UserSchema = new Schema({
	email: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
	name: {
		type: String,
		required: true,
	},
});

// creating model to use schema and export it

module.exports = mongoose.model("User", UserSchema);
