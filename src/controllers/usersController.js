const users = require('../database/users');
var jwt = require('jwt-simple');
var secret = 'isSecret';

const usersController = {

	getAllUsers: (req, res) => {
		res.status(200).json({
			users: users
		});
	},



	getOneUser: (req, res) => {

		for(let i=0; i < users.length; i++) {
			if(req.params.id == users[i].id) {
				return res.status(200).json({
					user: users[i]
				});
			}	
		}

		return res.status(404).json({
			message: 'User not found'
		});
	},



	addUser: (req, res) => {
		const { username, password } = req.body;

		if(typeof username === "undefined" || typeof password === "undefined") {
			return res.status(206).json({
				message: 'Partial Content'
			});
		}

		if(username && password) {
			return res.status(201).json({
				message: 'User created'
			});
		}
		
		res.status(400).json({
			message: 'User not created'
		});
	},



	deleteUser: (req, res) => {
		const { id } = req.params;

		for(let i=0; i < users.length; i++) {
			if(users[i].id == id) {
				return res.status(200).json({
					message: 'User deleted'
				});
			}
		}

		return res.status(404).json({
			message: 'User not found'
		});

	},


	
	verifyUser: async (req, res) => {
		// TOKEN USER 1 - Use it in Postman
		// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJkaWVnbyIsInBhc3N3b3JkIjoxMjM0fQ.tlJGO2GdAG7bUDaEdVFGFoCKw9jXqi2xx-50KYsPSY0

		const { authorization } = req.headers

		// If auth does not come in the header
		if(typeof authorization == "undefined") {
			return res.status(404).json({
				message: 'Token not found'
			});
		}

		// If auth does not start with Bearer
		if(!authorization.startsWith('Bearer ')) {
			return res.status(405).json({
				message: 'Method Not Allowed'
			});
		}
		
		// It will try to get the token
		try {
			const token = authorization.split(' ')[1]
			const decoded = jwt.decode(token, secret);
			
			return res.status(200).json({
				user: decoded
			});
		} catch {
			return res.status(401).json({
				message: 'Unauthorized'
			});
		}

	},



	candidateSkills: async (req, res) => {
		// res.json(req.query);
		// It's return { "skills": "mongodb,express,javascript" }
		
		if(typeof req.query.skills == "undefined" || req.query == {}) {
			return res.status(204).json({
				message: 'No content'
			});		
		}

		const skillsArray = req.query.skills.split(',');
		
		for(let i=0; i < users.length; i++) {
			
			if(users[i].skills.length == skillsArray.length) {
				const userSkillSorted = users[i].skills.sort().toString();
				const skillsSorted = skillsArray.sort().toString();
				
				if (skillsSorted == userSkillSorted) {
					return res.status(200).json({
						user: users[i]
					});
				}
			}

		}

		return res.status(404).json({
			message: 'User not found'
		});		
		
	},



	idNombreSkillsParams: (req, res) => {
		//const idParams = req.params.id;
		//const nombreParams = req.params.nombre;
		console.log(req.params);
		res.json('bien');
	}
}

module.exports = usersController;