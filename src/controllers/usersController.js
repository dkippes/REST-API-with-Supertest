const users = [
	{
		id: 1,
		username: 'diego',
		password: 1234
	},
	{
		id: 2,
		username: 'ivan',
		password: 4321
	},
	{
		id: 3,
		username: 'kippes',
		password: 4567
	}
]

const usersController = {
	getAllUsers: (req, res) => {
		res.status(200).json({
			users: users
		})
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
			})
		}
		
		res.status(400).json({
			message: 'User not created'
		});
	},
}

module.exports = usersController;