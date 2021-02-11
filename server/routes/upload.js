const express = require("express");
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const s3 = new aws.S3({
	accessKeyId: process.env.AWS_KEY,
	secretAccessKey: process.env.AWS_SECRET
});

const upload = multer({
	storage: multerS3({
		s3,
		bucket: process.env.BUCKET,
		acl: 'public-read',
		metadata: function (req, file, cb) {
			cb(null, {fieldName: file.fieldname});
		},
		key: function (req, file, cb) {
			cb(null, file.originalname)
		}
	})
});

router.post("/", upload.array('photos', 10), function (req, res, next) {	
	res.status(200).send({ message: "Upload Successful!" });
});

module.exports = router;
