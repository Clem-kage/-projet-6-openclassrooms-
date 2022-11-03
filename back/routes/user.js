const express = require('express');

const route = express.Router();

const controller = require('../controller/user');




route.post('/signup', controller.signer);

route.post('/login', controller.seConnecter);

module.exports = route; 