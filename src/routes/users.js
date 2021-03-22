var { Router } = require('express');
var router = Router();

const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', usersController.getAllUsers);
router.get('/candidates/:skills', usersController.candidateSkills);
router.get('/:id', usersController.getOneUser);
router.post('/:id/:nombre/:skills', usersController.idNombreSkillsParams);
router.post('/addUser', usersController.addUser);
router.delete('/deleteUser/:id', usersController.deleteUser);
router.post('/verifyUser', usersController.verifyUser);


module.exports = router;
