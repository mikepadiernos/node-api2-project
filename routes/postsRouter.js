// INITIATE EXPRESS
const express = require('express');
let router = express.Router();

// IMPORT DATABASE
const db = require('../data/db');

// HANDLERS FOR ROUTE "/api/posts"
router
	.route('/')
	.get((req, res) => {
		console.log("Posts: Found? ", req.body);
		db.find()
			.then(posts => {
				res.status(200).json(posts);
			})
			.catch(error => {
				res.status(500).json({success: false, message: "No posts found", error})
			})
	})
	.post((req, res) => {
		console.log("Posts: Created? ", req.body);
		const info = req.body;
		db.insert(info)
			.then(post => {
				info.title && info.contents
					? res.status(201).json({success: true, post})
					: res.status(400).json({success: false, message: "Please provide title and content"})
			})
			.catch(error => {res.status(500).json({success: false, message: "Post not created", error})})
	});

// HANDLERS FOR ROUTE "/api/posts/:id"
router
	.route('/:id')
	.get((req, res) => {
		db.findById(req.params.id)
			.then(post => {
				res.status(200).json(post)
			})
			.catch(error => {res.status(500).json({success: false, message: "Posts not found", error})})
	})
	.put((req, res) => {
		const {id} = req.params;
		const info = req.body;
		db.insert(id, info)
			.then(post => {
				info.title && info.contents && post
					? res.status(200).json({success: true, post})
					: res.status(404).json({success: false, message: "Post not found"})
			})
			.catch(error => {res.status(500).json({success: false, message: "Post not updated", error})})
	})
	.delete((req, res) => {
		const {id} = req.params;
		db.remove(id)
			.then(post => {
				post
					? res.status(204).end()
					: res.status(404).json({success: false, message: "Post not found"})
			})
			.catch(error => {res.status(500).json({success: false, message: "Posts not removed", error})})
	});

// HANDLERS FOR ROUTE "/api/posts/:id/comments"
router
	.route('/:id/comments')
	.get((req, res) => {})
	.delete((req, res) => {});

module.exports = router;