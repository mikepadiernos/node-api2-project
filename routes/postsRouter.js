// INITIATE EXPRESS
const express = require('express');
let router = express.Router();

// IMPORT DATABASE
const db = require('../data/db');

router
	.route('/')
	.get(() => {})
	.post(() => {});

router
	.route('/:id')
	.get(() => {})
	.put(() => {});

module.exports = router;