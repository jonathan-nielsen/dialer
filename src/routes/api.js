import express from 'express';
import debug from 'debug';

import User from 'models/User';

const router = express.Router();
const log = debug('routes:api');
const types = {
	user: User,
};

router.all('/api/*', (req, res, next) => {
	log(`${req.method} ${req.originalUrl}`);
	next();
});

router.get('/api/:type', async(req, res) => {
	try {
		const result = await types[req.params.type].find();

		res.json(result);
	} catch (err) {
		res.status(500).send({
			description: `Could not find ${req.params.type}.`,
			message: err.message,
			stack: err.stack
		});
	}
});

router.get('/api/:type/:id', async(req, res) => {
	try {
		const result = await types[req.params.type].findById(req.params.id).select('-password');

		res.json(result);
	} catch (err) {
		res.status(500).send({
			description: `Could not find a document with id ${req.params.id} in ${req.params.type}.`,
			message: err.message,
			stack: err.stack
		});
	}
});

router.post('/api/:type', async(req, res) => {
	try {
		const item = new types[req.params.type](req.body);
		const result = await item.save();

		res.json(result);
	} catch (err) {
		res.status(500).send({
			description: `Could not create a document in ${req.params.type}.`,
			message: err.message,
			stack: err.stack
		});
	}
});

router.put('/api/:type/:id', async(req, res) => {
	try {
		req.body.updated = Date.now();
		const result = await types[req.params.type].findOneAndUpdate({
			_id: req.params.id
		}, {
			$set: req.body
		}, {
			new: true
		});

		res.json(result);
	} catch (err) {
		res.status(500).send({
			description: `Could not update a document with id ${req.params.id} in ${req.params.type}.`,
			message: err.message,
			stack: err.stack
		});
	}
});

router.delete('/api/:type/:id', async(req, res) => {
	try {
		const doc = await types[req.params.type].findById(req.params.id);

		if (doc) {
			const result = await doc.remove();
			res.json(result);
		} else {
			throw new Error(`No document with id ${req.params.id} found.`);
		}
	} catch (err) {
		res.status(500).send({
			description: `Could not remove a document with id ${req.params.id} in ${req.params.type}.`,
			message: err.message,
			stack: err.stack
		});
	}
});

export default router;
