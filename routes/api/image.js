const express = require("express");
const router = express.Router();

const Queue = require("bull");
const testUserQueue = new Queue("test-user-queue");

const auth = require("../../middleware/auth");

//Image Model
const Image = require("../../models/Image");

//CDN
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { route } = require("./login");

cloudinary.config({
	//using existing cloud storage, can also connect straight to S3 or GCP Cloud Storage
	cloud_name: "texchange",
	api_key: 852474873596592,
	api_secret: "Jb2scvfgedVSMn17DphW05GJFQc",
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "image-repo",
		format: async (req, file) => "png", // supports promises as well
	},
});

const parser = multer({ storage: storage });

router.get("/recents", auth, (req, res) => {
	const { user } = req.body;
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
