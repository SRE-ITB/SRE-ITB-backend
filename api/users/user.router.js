const { createUser, deleteUser } = require('./user.controller');
const router = require('express').Router();

router.post('/', createUser);
router.delete('/', deleteUser);

module.exports = router;