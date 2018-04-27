import {} from 'dotenv/config';
import debug from 'debug';
import app from 'app';

const log = debug('app:server');

app.on('ready', () => {
	log('Starting server...');

	const server = app.listen(process.env.PORT, () => {
		log(`Server running on port ${process.env.PORT}.`);
		app.emit('server-running');
	});

	app.on('close', () => {
		log('Server closed.');
		server.close();
	});
});

export default app;
