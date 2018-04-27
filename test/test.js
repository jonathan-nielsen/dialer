import {} from 'dotenv/config';

import { expect } from 'chai';
import app from 'server';
import request from 'supertest';
import config from './config';

const { paths } = config;
const req = request.agent(app);
const credentials = {
	email: 'jonathan.nielsen93@gmail.com',
	password: 'ctbpkta2'
};

before(done => {
	app.on('server-running', () => {
		// eslint-disable-next-line no-console
		console.log('\n  -----------------------\n       Start testing\n  -----------------------\n');
		done();
	});
});

describe('Logged out', () => {
	for (const path of paths.loggedOut) {
		testCodeAndLocation(path);
	}
});

describe('Logged in', () => {
	before(done => {
		req.post('/authenticate')
			.send(credentials)
			.end((err, response) => {
				expect(response.statusCode).to.equal(302);
				expect(response.header.location).to.equal('/home');
				done();
			});
	});

	for (const path of paths.loggedIn) {
		testCodeAndLocation(path);
	}

	after(done => {
		req.post('/logout').end(() => {
			done();
		});
	});
});

function testCodeAndLocation(path) {
	describe(`${path.method.toUpperCase()} ${path.url}`, () => {
		const redirect = path.url !== path.expect.location ? ` and redirect to ${path.expect.location}` : '';

		it(`should return a ${path.expect.code} response${redirect}`, done => {
			req[path.method](path.url).end((err, response) => {
				expect(response.statusCode).to.equal(path.expect.code);

				if (redirect) {
					expect(response.header.location).to.equal(path.expect.location);
				}
				done();
			});
		});
	});
}

describe('API', () => {
	describe('GET /api/user', () => {
		it('Should return an array', done => {
			req.get('/api/user').end((err, response) => {
				expect(response.body).to.be.an('array').that.does.not.include('password');
				done();
			});
		});
	});

	describe('GET /api/user/5ada6b18dac3c7cacc6dbd12', () => {
		it('Should return an object and should not include password property', done => {
			req.get('/api/user/5ada6b18dac3c7cacc6dbd12').end((err, response) => {
				expect(response.body).to.be.an('object').that.does.not.have.property('password');
				done();
			});
		});
	});
});

after(() => {
	app.emit('close');
});
