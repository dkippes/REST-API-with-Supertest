const usersController = {
	getAllUsers: (req, res) => {
		return res.json('all users sent');
	},

	getOneUser: (req, res) => {

		if(req.params.id === "1") {
			return res.json('User 1 Found');
		}
		return res.status(404).json("User not found");
	},

	addUser: (req, res) => {
		const { username, password } = req.body;

		if(username && password) {
			return res.status(201).json("User created")
		}
		res.status(400).json("User not created");
	},
}

module.exports = usersController;