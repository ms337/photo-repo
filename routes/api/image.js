const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

//CDN
const cloudinary = require("cloudinary");
const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
	//using existing cloud storage, can also connect straight to S3 or GCP Cloud Storage
	cloud_name: "texchange",
	api_key: 852474873596592,
	api_secret: "Jb2scvfgedVSMn17DphW05GJFQc",
});

const storage = cloudinaryStorage.createCloudinaryStorage({
	cloudinary: cloudinary,
	folder: "image-repo",
	allowedFormats: ["jpg", "png"],
});

const parser = multer({ storage: storage });

router.post("/", auth, (req, res) => {
	console.log(req);
	const upload = parser.single("file");
	upload(req, res, () => {});

	let newImg = new Image({
		imageURL: req.file.url,
		owner: req.body.user,
		private: req.body.private,
		tags: req.body.tags,
	});

	//Saving to DB
	newImg
		.save()
		.then((img) => {
			res.status(200).json({ success: true });
		})
		.catch((err) => {
			res.status(404).json({ success: false, message: err });
		});
});

module.exports = router;
