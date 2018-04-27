import express from 'express';

const router = express.Router();

router.get('/logout', logout);

function logout(req, res, next) {
	if (req.session) {
		req.session.destroy(err => (err ? next(err) : res.redirect('/')));
	}

	if (req.cookies.userId) {
		res.clearCookie('userId');
	}
}

export default router;
