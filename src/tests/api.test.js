const request =  require('supertest');

const app = require('../app');

describe("GET /users", () => {
	it('respond with json containing a list of all users', done => {
		request(app)
			.get('/users')
			.set('Accept', 'application/json') // Headers
			.expect('Content-Type', /json/) // Headers
			.expect(200, done);
	});
});

describe("GET /users/:id", () => {
	it('respond with json containing a single user', done => {
		request(app)
			.get('/users/1')
			.set('Accept', 'application/json') // Headers
			.expect('Content-Type', /json/) // Headers
			.expect(200, done);
	});

	it('respond with json "User 1 Found" when ther user exists', done => {
		request(app)
			.get('/users/1')
			.set('Accept', 'application/json') // Headers
			.expect('Content-Type', /json/) // Headers
			.expect(200)
			.expect('"User 1 Found"')
			.end((err) => {
				if(err) return done(err);
				done();
			})
	})

	it('respond with json "User not found"', done => {
		request(app)
			.get('/users/3')
			.set('Accept', 'application/json') // Headers
			.expect('Content-Type', /json/) // Headers
			.expect(404)
			.expect('"User not found"')
			.end((err) => {
				if(err) return done(err);
				done();
			})
	});
});

describe("POST /users/addUser", () => {
	it('respond with 201 created', done => {
		const data = {
			username: 'diego',
			password: '1234'
		}
		request(app)
			.post('/users/addUser')
			.send(data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(201)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});

	it('respond with code 400 on bad request', done => {
		const data = {}
		request(app)
			.post('/users/addUser')
			.send(data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.expect('"User not created"')
			.end(err => {
				if (err) return done(err);
				done();
			});
	});
})

