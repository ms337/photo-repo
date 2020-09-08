const express = require("express");
const router = express.Router();
const config = require("config");

const auth = require("../../middleware/auth");

//Image Model
const Image = require("../../models/Image");

//CDN
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { route } = require("./login");

//This should be gotten from config
cloudinary.config({
	//using existing cloud storage, can also connect straight to S3 or GCP Cloud Storage
	cloud_name: config.get("cloud_name"),
	api_key: config.get("api_key"),
	api_secret: config.get("api_secret"),
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "image-repo",
		format: async (req, file) => "png", // supports promises as well
	},
});

const parser = multer({ storage: storage });

router.get("/public", (req, res) => {
	Image.find({ private: false })
		.then((images) => {
			let urls = Array();
			images.forEach((image) => urls.push(image.imageURL));
			res.status(200).json({ urls: urls });
		})
		.catch((err) => {
			console.log(err);
			console.log("Could not get images");
		});
});

router.get("/authenticated", auth, (req, res) => {
	console.log(req.user.id);
	Image.find({ $or: [{ private: false }, { owner: req.user.id }] })
		.then((images) => {
			let urls = Array();
			images.forEach((image) => urls.push(image.imageURL));
			res.status(200).json({ urls: urls });
		})
		.catch((err) => {
			console.log(err);
			console.log("Could not get images");
		});
});

router.post("/uploadFile", auth, parser.single("file"), (req, res) => {
	console.log(req.body);
	console.log(req.file);

	let newImg = new Image({
		imageURL: req.file.path,
		owner: req.body.owner,
		private: req.body.private,
		tags: req.body.tags,
	});

	//Saving to DB
	newImg
		.save()
		.then((img) => {
			testUserQueue.add(img);
			res.status(200).json({ success: true });
		})
		.catch((err) => {
			res.status(404).json({ success: false, message: err });
		});
});

//Multiple Files
router.post("/uploadFiles", auth, parser.array("files"), (req, res) => {
	console.log(req.body);
	console.log(req.files);

	filesUploaded = new Array();
	req.files.map((file) => {
		let newImg = new Image({
			imageURL: file.path,
			owner: req.body.owner,
			private: req.body.private,
			tags: req.body.tags,
		});

		//Saving to DB
		newImg
			.save()
			.then((image) => {
				console.log(image.imageURL);
				filesUploaded.push(image.imageURL);
			})
			.catch((err) => {
				res.status(404).json({ success: false, message: err });
			});
	});
	res.status(200).json({ success: true });
});

module.exports = router;
