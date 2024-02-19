const request = require('supertest');
const assert = require('assert');
const { app, setupApp } = require('../server'); 
const fs = require('fs');
const path = require('path');

const player1 = {
    "first_name": 'Zala',
    "last_name": 'Novak',
    born: '1990-05-11T00:00:00.000Z',
};

const player2 = {
    "first_name": 'Ana',
    "last_name": 'Novak',
    "born": '1993-08-08T00:00:00.000Z',
  };

const gameSample = {
  "title": 'Test Game',
  "description": 'New casino game.',
  "pictures": [],
  "players": [player1, player2]
};



describe('Player Unit Test Cases', () => {

  
  it('Responds with status 200 when hitting /players', async () => {
    const response = await request(app).get('/api/players').expect(200);
  });

  it('Creates a new player when hitting /player (POST)', async () => {
    const response = await request(app)
      .post('/api/player')
      .send(player1)
      .expect(200);
      
    let res = JSON.parse(response.text);
    
    assert.deepEqual(res['first_name'], player1.first_name);
    assert.deepEqual(res['last_name'], player1.last_name);
    assert.deepEqual(res['born'], player1.born);
  });

  
    it('Gets a player by ID', async () => {
      const player = await request(app)
        .post('/api/player')
        .send(player1);
  
      let res = JSON.parse(player.text);

      const response = await request(app)
        .get(`/api/player/${res['_id']}`);

  
      res = JSON.parse(response.text);
      
      assert.deepEqual(res['first_name'], player1.first_name);
      assert.deepEqual(res['last_name'], player1.last_name);
      assert.deepEqual(res['born'], player1.born);
    });
  
  
    it('Updates a player by ID', async () => {
      // Create a player and get its ID
      const player = await request(app)
        .post('/api/player')
        .send(player2);
  
      let res = JSON.parse(player.text);
      res['first_name'] = 'UpdatedName';
      console.log(res)
      const response = await request(app)
        .put(`/api/player/${res['_id']}`)
        .send(res);
  
      const resp = await request(app)
        .get(`/api/player/${res['_id']}`);
      let resp_json = JSON.parse(resp.text);
      
      assert.deepEqual(resp_json['_id'], res['_id']);
      assert.deepEqual(resp_json['first_name'], 'UpdatedName');
    });
  
  
    it('should delete a player by ID', async () => {
      // Create a player and get its ID
      const player = await request(app)
        .post('/api/player')
        .send(player1)
  
      let res = JSON.parse(player.text);
      const response = await request(app)
        .delete(`/api/player/${res['_id']}`).expect(204);
  
    });
  
  });

describe('Game Unit Test Cases', () => {

  it('Responds with status 200 when hitting /games', async () => {
    return request(app).get('/api/games').expect(200);
  });

    it('Creates a new game when hitting /game (POST)', async () => {

      const response = await request(app)
        .post('/api/game')
        .send(gameSample)
        .expect(200);
      let res = JSON.parse(response.text);

      console.log(res['title']);
      console.log(res['description']);
      console.log(res['players']);
      
      assert.deepEqual(res['title'], gameSample.title);
      assert.deepEqual(res['description'], gameSample.description);
      assert.deepEqual(res['players'], gameSample.players);
    });
  
  
    it('Gets a game by ID', async () => {
      const game = await request(app)
        .post('/api/game')
        .send(gameSample);
  
      let res = JSON.parse(game.text);

      const response = await request(app)
        .get(`/api/game/${res['_id']}`);

  
      res = JSON.parse(response.text);
      
      assert.deepEqual(res['title'], gameSample.title);
      assert.deepEqual(res['description'], gameSample.description);
      assert.deepEqual(res['players'], gameSample.players);
    });
  
  
    it('Updates a game by ID', async () => {
      const gameUpdated = await request(app)
        .post('/api/game')
        .send(gameSample);
  
      let res = JSON.parse(gameUpdated.text);
      
      res['description'] = 'UpdatedDescription' ;

      const response = await request(app)
        .put(`/api/game/${res['_id']}`)
        .send(res)
        .expect(200);
  
      res = JSON.parse(response.text);

      const resp = await request(app)
        .get(`/api/game/${res['_id']}`);
      let resp_json = JSON.parse(resp.text);
      

      assert.deepEqual(resp_json['description'], 'UpdatedDescription');
    });
  
  
    it('should delete a game by ID', async () => {
      const gameDelete = await request(app)
        .post('/api/game')
        .send(gameSample);
  
      let res = JSON.parse(gameDelete.text);
      const response = await request(app)
        .delete(`/api/game/${res['_id']}`).expect(204);
  
    });
  
  });

