export default {
	paths: {
		loggedOut: [{
			method: 'get',
			url: '/',
			expect: {
				code: 200,
				location: '/',
			},
		}, {
			url: '/register',
			method: 'get',
			expect: {
				code: 200,
				location: '/register',
			},
		}, {
			url: '/home',
			method: 'get',
			expect: {
				code: 302,
				location: '/',
			},
		}],
		loggedIn: [{
			url: '/',
			method: 'get',
			expect: {
				code: 302,
				location: '/home',
			},
		}, {
			url: '/register',
			method: 'get',
			expect: {
				code: 302,
				location: '/home',
			},
		}, {
			url: '/home',
			method: 'get',
			expect: {
				code: 200,
				location: '/home',
			},
		}],
	},
};
