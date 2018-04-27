import express from 'express';
import User from 'models/User';

const router = express.Router();
const Joi = require('joi');

const schema = Joi.object().keys({
	email: Joi.string().email(),
	password: Joi.string(),
	remember_me: Joi.any(),
}).required();

router.post('/authenticate', authenticate);

async function authenticate(req, res) {
	const result = Joi.validate(req.body, schema);
	const rememberMe = !!req.body.remember_me;

	if (result.error !== null) {
		req.flash('email', req.body.email);
		req.flash('rememberMe', rememberMe);
		req.flash('error', result.error.message);
		return res.redirect('/');
	}

	try {
		const user = await User.authenticate(req.body);

		if (rememberMe) {
			res.cookie('userId', user._id, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });
		} else {
			req.session.userId = user._id;
		}

	} catch (err) {
		req.flash('email', req.body.email);
		req.flash('rememberMe', rememberMe);
		req.flash('error', err.message);
		return res.redirect('/');
	}

	res.redirect('/home');
}

export default router;
