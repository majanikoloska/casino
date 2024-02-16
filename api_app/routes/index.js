var express = require('express');
var router = express.Router();


var controllerPlayer = require('../controllers/player');
var controllerGame = require('../controllers/game');

router.route('/players')
  .get(controllerPlayer.allPlayers)
router.route('/players/:pagination/:currentPage')
  .get(controllerPlayer.allPlayersPagination)
router.route('/player')
  .post(controllerPlayer.playerCreate);
router.route('/playerGames/:idPlayer/:pagination/:currentPage')
  .get(controllerPlayer.gamesByPlayer)
router.route('/player/:idPlayer')
  .get(controllerPlayer.playerByID)
  .put(controllerPlayer.updatePlayer)
  .delete(controllerPlayer.deletePlayer);

router.route('/games')
  .get(controllerGame.allGames)
router.route('/games/:pagination/:currentPage')
  .get(controllerGame.allGamesPagination)
router.route('/game')
  .post(controllerGame.gameCreate);
router.route('/game/:idGame')
  .get(controllerGame.gameByID)
  .put(controllerGame.updateGame)
  .delete(controllerGame.deleteGame);


module.exports = router;