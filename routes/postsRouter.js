// INITIATE EXPRESS
const express = require('express');
let router = express.Router();

// IMPORT DATABASE
const db = require('../data/db');

router
	.route('/')
	.get((req, res) => {
		console.log("Posts: Found? ", req.body);

		db.find()
			.then(posts => {
				res.status(200).json(posts);
			})
			.catch(error => {
				res.status(500).json({success: false, message: "No posts information found", error})
			})
	})
	.post((req, res) => {
		console.log("Posts: Created? ", req.body);

		const info = req.body;

		db.insert(info)
			.then(post => {
				info.title || info.contents
					? res.status(201).json({success: true, post})
					: res.status(400).json({success: false, message: "Please provide a title and content"})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "Post can not be created", error})
			})
	});

router
	.route('/:id')
	.get(() => {})
	.post(() => {})
	.delete(() => {})


router
	.route('/:id')
	.get(() => {})
	.put(() => {});

module.exports = router;