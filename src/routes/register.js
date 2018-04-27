import express from 'express';
import debug from 'debug';
import User from 'models/User';
import { homeRedirectIfAuth } from 'modules/auth';

const router = express.Router();
const log = debug('routes:register');
const Joi = require('joi');

const schema = Joi.object().keys({
	email: Joi.string().email(),
	password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*]{6,30}$/),
	confirm_password: Joi.any().valid(Joi.ref('password')).options({
		language: { any: { allowOnly: 'must match password' } }
	})
}).required();

router.get('/register', homeRedirectIfAuth, registerPage);
router.post('/register', register);

function registerPage(req, res) {
	log(`${req.method} ${req.originalUrl}`);

	const error = req.flash('error');
	const [ email ] = req.flash('email');
	let html = `<h1>Register</h1> <form action="/register" method="post"> <input type="email" name="email" placeholder="Email..."${email && ` value="${email}"`}> <input type="password" name="password" placeholder="Password..."> <input type="password" name="confirm_password" placeholder="Confirm password..."> <button type="submit">Submit</button> </form><p><a href="/">Login</a></p>`;

	if (error) {
		html += `<p>${error}</p>`;
	}

	res.send(html);
}

async function register(req, res) {
	log(`${req.method} ${req.originalUrl}`);

	const result = Joi.validate(req.body, schema);

	if (result.error !== null) {
		return flash(result.error.message);
	}

	try {
		const user = await User.create(req.body);
		req.session.userId = user._id;
	} catch (err) {
		return flash(err.message);
	}

	res.redirect('/home');

	function flash(msg) {
		req.flash('error', msg);
		req.flash('email', req.body.email);
		res.redirect('/register');
	}
}

export default router;
