import express from 'express';
import { authRequired } from 'modules/auth';
import path from 'path';

const router = express.Router();

router.get('/home', authRequired, home);

function home(req, res) {
	res.sendFile(path.resolve(__dirname, '../..', 'html/home.html'));
}

export default router;
