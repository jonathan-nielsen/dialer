import debug from 'debug';
import express from 'express';
import Twilio from 'twilio';

const router = express.Router();
const log = debug('routes:call');
const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const { VoiceResponse } = Twilio.twiml;

router.post('/voice', voice);
router.post('/connect', connect);
router.post('/call-failed', callFailed);

function voice(req, res) {
	log('Voice');
	log(req.body);
	res.set('Content-Type', 'text/xml');
	res.send(voiceResponse(req.body.To));
}

function connect(req, res) {
	log('connect');
	res.end();
}

function callFailed(req, res) {
	log('Call failed');
	log(req.body);
	res.end();
}

function voiceResponse(toNumber) {
	const twiml = new VoiceResponse();

	if (toNumber) {
		// Wrap the phone number or client name in the appropriate TwiML verb
		// if is a valid phone number
		const attr = isAValidPhoneNumber(toNumber) ? 'number' : 'client';

		const dial = twiml.dial({
			callerId: '+46406887524',
		});
		dial[attr]({}, toNumber);
	} else {
		twiml.say('Thanks for calling!');
	}

	log(twiml.toString());
	return twiml.toString();
}

function isAValidPhoneNumber(number) {
	return /^[\d+\-() ]+$/.test(number);
}

export default router;
