const request = require('request')

var apiParameters = 'http://localhost:' + (process.env.PORT || 3000); 

var playersList = (req, res) => {
    const path = '/api/player';
    const paramReq = {
        url: apiParameters + path,
        method: 'GET',
        json: {},
        qs:{}
    };
    request(paramReq, (error, {statusCode}, player) => {
        if (statusCode === 200 && player.length){
            return player;
        }
    });
};

module.exports = {
    playersList
}