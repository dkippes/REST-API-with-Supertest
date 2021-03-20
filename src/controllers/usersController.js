const users = require('../database/users');

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
}

module.exports = usersController;