const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create schema

const ImageSchema = new Schema(
	{
		imageURL: { type: String, required: false },
		owner: { type: String, ref: "User", required: "True" },
		private: { type: Boolean, required: true },
		tags: [{ type: String }],
	},
	{ timestamps: true }
);

//ImageSchema.index()

module.exports = mongoose.model("Image", ImageSchema);

// Image.find({ $text: { $search: req.query.search } }, { score: { $meta: "textScore" } })
// 	.sort({ score: { $meta: "textScore" } })
// 	.limit(100)
// 	.then(items => res.json(items));
