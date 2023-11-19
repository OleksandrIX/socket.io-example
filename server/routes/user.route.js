const {connect, getAllUsers} = require("../controllers/userController");
const router = require('express').Router();

router.get('/getAllUsers', getAllUsers)
router.post('/connect', connect)

module.exports = router