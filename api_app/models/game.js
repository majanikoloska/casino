const mongoose = require('mongoose');

const PlayerShema = require('./player');

/**
 * @swagger
 * components:
 *  schemas:
 *   GameShema:
 *    type: object
 *    properties:
 *     title:
 *      type: string
 *     description:
 *      type: string
 *     players:
 *      type: array
 *      items:
 *       type: PlayerShema
 *     pictures:
 *      type: string
 *      format: binary
 *    required:
 *     - dnevi
 *     - zaprto
 */
const gameShema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  players: [PlayerShema],
  pictures: [{type: Buffer, required: true}]
});

mongoose.model('game', gameShema, 'game');