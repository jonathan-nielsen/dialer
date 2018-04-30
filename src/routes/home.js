import express from 'express';
import { authRequired } from 'modules/auth';

const router = express.Router();

router.get('/home', authRequired, home);

function home(req, res) {
	res.send('<!DOCTYPE html> <html> <head> <title>Twilio Client Quickstart</title> <link rel="stylesheet" type="text/css" href="/style.css"> </head> <body> <div>Client name: <b class="client"></b></div> <div class="devices"> <h3>Ringtone Devices</h3> <select class="device ringtone" multiple></select> <h3>Speaker Devices</h3> <select class="device speaker" multiple></select> <div> <button class="refresh-devices">Refresh devices</button> </div> </div> <div class="controls"> <p class="instructions">Make a Call:</p> <input class="number" type="text" placeholder="Enter a phone # or client name" /> <button class="button call">Call</button> <button class="button hangup">Hangup</button> <div class="indicators"> <h3>Mic Volume</h3> <div class="volume input"></div> <h3>Speaker Volume</h3> <div class="volume output"></div> </div> </div> <div class="logout"> <a href="/logout">Logout</a> </div> <script src="/twilio.min.js"></script> <script src="/jquery-3.3.1.min.js"></script> <script src="/script.js"></script> </body> </html>');
}

export default router;
