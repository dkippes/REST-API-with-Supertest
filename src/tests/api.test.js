const request =  require('supertest');

const app = require('../app');

/**
 * "GET/users"
 */

describe("GET /users", () => {
	it('respond with json containing a list of all users', done => {
		request(app)
			.get('/users')
			.set('Accept', 'application/json') // Headers
			.expect('Content-Type', /json/) // Headers
			.expect(200, done)
	});
});

/**
 * "GET/users/:id"
 */
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
			.expect({
				"user": {
					"id": 1,
					"username": "diego",
					"password": 1234,
					skills: [
						"sql",
						"python"
					]
				}
			})
			.end((err) => {
				if(err) return done(err);
				done();
			});
	});

	it('respond with json "User not found"', done => {
		request(app)
			.get('/users/55')
			.set('Accept', 'application/json') // Headers
			.expect('Content-Type', /json/) // Headers
			.expect(404)
			.expect({
				message: 'User not found'
			})
			.end((err) => {
				if(err) return done(err);
				done();
			});
	});
});

/**
 * "POST/users/addUser"
 */
describe("POST /users/addUser", () => {
	it('respond with code 206 which is Partial Content', done => {
		const data = {
			"user": "new user",
			"password": "mypassword"
		}
		request(app)
			.post('/users/addUser')
			.send(data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(206)
			.expect({
				message: 'Partial Content'
			})
			.end(err => {
				if (err) return done(err);
				done();
			});
	});

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
			.expect({
				message: 'User created'
			})
			.end(err => {
				if (err) return done(err);
				done();
			});
	});

	it('respond with code 400 on bad request', done => {
		const data = {
			"username": "",
			"password": ""
		}
		request(app)
			.post('/users/addUser')
			.send(data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});
});

/**
 * "DELETE/users/deleteUser/:id"
 */
 describe("POST /users/deleteUser/:id", () => {
	it('respond with json "User deleted"', done => {
		request(app)
			.delete('/users/deleteUser/1')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

	it('respond with json "User not found"', done => {
		request(app)
			.delete('/users/deleteUser/4')
			.set('Accept', 'application/json') // Headers
			.expect('Content-Type', /json/) // Headers
			.expect(404)
			.expect({
				message: 'User not found'
			})
			.end((err) => {
				if(err) return done(err);
				done();
			});
	});
});

/**
 * "GET/users/candidates/?searchs=skills=..."
 */
 describe("GET /users/candidates?searchs=", () => {
	it('respond with code 200:', done => {
		request(app)
			.get('/users/candidates/searchs?skills=mongodb,express,javascript')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

	it('respond with code 404 "User not Found":', done => {
		request(app)
			.get('/users/candidates/searchs?skills=express,javascript')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(404, done);
	});
});