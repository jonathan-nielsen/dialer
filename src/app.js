import debug from 'debug';
const appLog = debug('app:config');
const DBLog = debug('app:db');

// Packages
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import flash from 'connect-flash';
import mongoose from 'mongoose';
import session from 'express-session';
appLog('Packages loaded.');

// Routes
import * as routes from './routes';

const app = express();
const dbUrl = `mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

app.use(express.static('public'));
app.set('trust proxy', 1);
app.use(session({
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: false
}));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
appLog('Packages enabled.');

app.on('db-connected', function() {
	// TODO: Readdir recursively, add folder structure as url.
	for (const key in routes) {
		app.use('', routes[key]);
	}

	// 404
	app.use(function(req, res) {
		res.send('<h1>404 - Not found</h1><a href="/">Home</a><br><a href="#" onclick="window.history.back()">Back</a>');
	});

	appLog('Routes added.');

	app.emit('ready');
});

DBLog(`Connecting to db on ${dbUrl}...`);
mongoose.connect(dbUrl).then(() => {
	DBLog('Connected to db.');
	app.emit('db-connected');
}).catch(() => {
	DBLog('Could not connect to db.');
});

export default app;
