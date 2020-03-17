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
		// console.log("Posts: Created? ", req.body);
		const info = req.body;
		db.insert(info)
			.then(post => {
				!info.title && !info.contents
					? res.status(400).json({success: false, message: "Please provide title and content"})
					: res.status(201).json({success: true, post})
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
				!info.title && !info.contents && post
					? res.status(404).json({success: false, message: "Post not found"})
					: res.status(200).json({success: true, post})
			})
			.catch(error => {res.status(500).json({success: false, message: "Post not updated", error})})
	})
	.delete((req, res) => {
		const {id} = req.params;
		db.findById(id)
			.then(post => {
				!post
					? res.status(404).json({success: false, message: "Post not found"})
					: db.remove(id)
						.then(del => {
							if (del) {res.status(200).json({success: true, post})}
						})
						.catch(error => {res.status(500).json({success: false, message: 'Posts not removed', error});
						})
			})
			.catch(error => {res.status(500).json({success: false, message: "Posts not removed", error})})
	});

// HANDLERS FOR ROUTE "/api/posts/:id/comments"
router
	.route('/:id/comments')
	.get((req, res) => {
		const {id} = req.params;
		// console.log("Params: ", req.params);
		// console.log("Request: ", req);
		// console.log("ID: ", id);
		db.findPostComments(id)
			.then(post => {
				console.log("Post: ", post);
				!post
					? res.status(404).json({success: false, message: "Post not found"})
					: res.status(200).json(post)
			})
			.catch(error => {res.status(500).json({success: false, message: "Posts not removed", error})})

	})
	.post((req, res) => {
		const id = req.params.id;
		const info = req.body;
		let newComment = {
			text: info.text,
			post_id: id
		};
		!info.text
			? res.status(400).json({ success: false, Message: 'Please provide text' })
			: db.findById(id)
					.then(post => {
						// console.log("Post: ", post);
						!post
							? res.status(404).json({success: false, message: "Post not found"})
							:	db.insertComment(newComment)
									.then(({ id }) => {
										console.log("Comment: ", newComment);
										db.findCommentById(id)
											.then(comment => {
												res.status(201).json(comment)
											})
									})
									.catch(error => {
										res.status(500).json({success: false, message: 'Comment not created',	error	})
									})
						})
			});

router
	.route('/:pid/comments/:id')
	.get((req, res) => {
		const postId = req.params.pid;
		const id = req.params.id;
		// const info = req.body;
		db.findCommentById(id)
			.then(comment => {
				// console.log("Comment: ", comment);
				// console.log("Post ID: ", postId);
				// console.log("Comment Post ID: ", comment[0].post_id);
				Number(postId) !== comment[0].post_id
					? res.status(404).json({success: false, message: "Comment not found"})
					: res.status(200).json(comment)
		})
		.catch(error => {
			res.status(500).json({success: false, message: 'Comment not found',	error	})
		})
	})
	.delete((req, res) => {
		db.removeComment(req.params.id)
			.then(comment => {
				res.status(200).json({success: true, message: "Comment deleted", comment})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "Comment not deleted", error})
			})
	});

module.exports = router;