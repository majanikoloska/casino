var express = require('express');
var router = express.Router();


var controllerPlayer = require('../controllers/player');
var controllerGame = require('../controllers/game');

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Get a list of all players
 *     description: Retrieving a list of all casino players.
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */

router.route('/players')
  .get(controllerPlayer.allPlayers)
  
/**
 * @swagger
 * /players/{pagination}/{currentPage}:
 *   get:
 *     summary: Get a players list
 *     description: Retrieve a players list with pagination.
 *     parameters:
 *       - name: pagination
 *         in: path
 *         required: true
 *         description: how many players per pager
 *         type: integer
 *       - name: currentPage
 *         in: path
 *         required: true
 *         description: the page we want too see the players
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.route('/players/:pagination/:currentPage')
  .get(controllerPlayer.allPlayersPagination);

/**
 * @swagger
 * /player:
 *   post:
 *     summary: Add a player
 *     description: Add new casino player.
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.route('/player')
  .post(controllerPlayer.playerCreate);

/**
 * @swagger
 * /playerGames/{idPlayer}/{pagination}/{currentPage}:
 *   get:
 *     summary: Get list of games played by a player 
 *     description: Retrieve list of games played by a player with pagination.
 *     parameters:
 *       - name: idPlayer
 *         in: path
 *         required: true
 *         description: ID of the player
 *         type: integer
 *       - name: pagination
 *         in: path
 *         required: true
 *         description: how many players per pager
 *         type: integer
 *       - name: currentPage
 *         in: path
 *         required: true
 *         description: the page we want too see the players
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.route('/playerGames/:idPlayer/:pagination/:currentPage')
  .get(controllerPlayer.gamesByPlayer)

/**
 * @swagger
 * /player/{idPlayer}:
 *   get:
 *     summary: Get a player by ID
 *     description: Retrieve a player by its ID.
 *     parameters:
 *       - name: idPlayer
 *         in: path
 *         required: true
 *         description: ID of the player to retrieve
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Player not found
 */

/**
 * @swagger
 * /player/{idPlayer}:
 *   put:
 *     summary: Update a player by ID
 *     description: Update a player by its ID.
 *     parameters:
 *       - name: idPlayer
 *         in: path
 *         required: true
 *         description: ID of the player to update
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Player not found
 */
/**
 * @swagger
 * /player/{idPlayer}:
 *   delete:
 *     summary: Delete a player by ID
 *     description: Delete a player by its ID.
 *     parameters:
 *       - name: idPlayer
 *         in: path
 *         required: true
 *         description: ID of the player to delete
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Player not found
 */
router.route('/player/:idPlayer')
  .get(controllerPlayer.playerByID)
  .put(controllerPlayer.updatePlayer)
  .delete(controllerPlayer.deletePlayer);
  

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get a list of all games
 *     description: Retrieving a list of all casino games.
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.route('/games')
  .get(controllerGame.allGames)
/**
 * @swagger
 * /games/{pagination}/{currentPage}:
 *   get:
 *     summary: Get a games list
 *     description: Retrieve a games list with pagination.
 *     parameters:
 *       - name: pagination
 *         in: path
 *         required: true
 *         description: how many games per page
 *         type: integer
 *       - name: currentPage
 *         in: path
 *         required: true
 *         description: the page we want too see the games
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.route('/games/:pagination/:currentPage')
  .get(controllerGame.allGamesPagination)
/**
 * @swagger
 * /game:
 *   post:
 *     summary: Add a game
 *     description: Add new casino game.
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.route('/game')
  .post(controllerGame.gameCreate);

/**
 * @swagger
 * /game/{idGame}:
 *   get:
 *     summary: Get a game by ID
 *     description: Retrieve a game by its ID.
 *     parameters:
 *       - name: idGame
 *         in: path
 *         required: true
 *         description: ID of the game to retrieve
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Game not found
 */

/**
 * @swagger
 * /game/{idGame}:
 *   put:
 *     summary: Update a game by ID
 *     description: Update a game by its ID.
 *     parameters:
 *       - name: idGame
 *         in: path
 *         required: true
 *         description: ID of the game to update
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Game not found
 */
/**
 * @swagger
 * /game/{idGame}:
 *   delete:
 *     summary: Delete a game by ID
 *     description: Delete a game by its ID.
 *     parameters:
 *       - name: idGame
 *         in: path
 *         required: true
 *         description: ID of the game to delete
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Game not found
 */
router.route('/game/:idGame')
  .get(controllerGame.gameByID)
  .put(controllerGame.updateGame)
  .delete(controllerGame.deleteGame);


module.exports = router;