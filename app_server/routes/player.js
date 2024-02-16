const express = require('express');
const router = express.Router();

var controllerPlayer = require('../controllers/player');

router.get("/players", controllerPlayer.playersList);


// export the router module so that server.js file can use it
module.exports = router;