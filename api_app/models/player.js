const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *  schemas:
 *   PlayerShema:
 *    type: object
 *    properties:
 *     first_name:
 *      type: string
 *     last_name:
 *      type: string
 *     born:
 *      type: string
 *      format: date-time
 *      example: 2019-12-26T14:12:06.488Z
 *    required:
 *     - first_name
 *     - last_name
 *     - born
 */

const PlayerShema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    born: {type: Date, required: true, "default": Date.now}
  });

  
mongoose.model('player', PlayerShema, 'player');