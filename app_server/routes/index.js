var express = require('express');
var router = express.Router();


var controllerPlayer = require('../controllers/player');

router.route('/players')
  .get(controllerPlayer.allPlayers)
router.route('/player')
  .post(controllerPlayer.playerCreate);
router.route('/player/:idPlayer')
  .get(controllerPlayer.playerByID)
  .put(controllerPlayer.updatePlayer)
  .delete(controllerPlayer.deletePlayer);


  module.exports = router;