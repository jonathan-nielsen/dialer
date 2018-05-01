import {} from 'dotenv/config';
import debug from 'debug';
import app from 'app';
import http from 'http';
import socketIo from 'socket.io';
import Twilio from 'twilio';
import Number from 'models/Number';

const log = debug('app:server');
const IOLog = debug('app:io');
const httpServer = http.Server(app);
const io = socketIo(httpServer);
const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

app.on('ready', () => {
	log('Starting server...');

	io.on('connection', socket => {
		IOLog('a user connected');

		socket.on('disconnect', () => {
			IOLog('user disconnected');
		});

		socket.on('dial', async () => {
			IOLog('Getting number...');
			const number = await Number.findOne();

			IOLog(`Dialing ${number.number}...`);

			client.calls.create({
				url: 'http://demo.twilio.com/docs/voice.xml',
				to: '+46' + number.number.substring(1, number.number.length),
				from: process.env.TWILIO_NUMBER,
			}).then(call => console.log(call.sid));
		});
	});

	const server = httpServer.listen(process.env.PORT, () => {
		log(`Server running on port ${process.env.PORT}.`);
		app.emit('server-running');
	});

	app.on('close', () => {
		log('Server closed.');
		server.close();
	});
});

export default app;
