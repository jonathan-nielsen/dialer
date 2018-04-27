import express from 'express';
import { homeRedirectIfAuth } from 'modules/auth';

const router = express.Router();

router.get('/', homeRedirectIfAuth, index);

function index(req, res) {
	const error = req.flash('error');
	const [ email ] = req.flash('email');
	const [ rememberMe ] = req.flash('rememberMe');

	let html = `<h1>Login</h1> <form action="/authenticate" method="post"> <input type="email" name="email" placeholder="Email..."${email && ` value="${email}"`}><br><input type="password" name="password" placeholder="Password..."><br><label for="remember-me">Remember me <input type="checkbox" id="remember-me" name="remember_me" ${rememberMe && 'checked'}/></label> <button type="submit">Submit</button> </form> <p><a href="/register">Register</a></p>`;

	if (error) {
		html += `<p>${error}</p>`;
	}

	res.send(html);
}

export default router;