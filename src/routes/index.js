var { Router } = require('express');
var router = Router();

/* GET home page. */
router.get('/', (req, res) => {
	res.send('Welcome!');
});

module.exports = router;
