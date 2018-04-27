import express from 'express';
import { authRequired } from 'modules/auth';

const router = express.Router();

router.get('/home', authRequired, home);

function home(req, res) {
	res.send('<h1>Home</h1><a href="/logout">Logout</a>');
}

export default router;
