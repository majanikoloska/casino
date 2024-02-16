const mongoose = require('mongoose');
const Game = mongoose.model('game');


const gameCreate = async (req, res) => {
    var game_data = {
        title: req.body.title,
        description: req.body.description,
        pictures: req.body.pictures,
        players: req.body.players
    };

    try{
        var game = await Game.create(game_data);
        res.json(game)
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
};

const allGames = async (req, res) => {
    try{
        const games = await Game.find();
        res.json(games)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

const allGamesPagination = async (req, res) => {
    var skip = (req.params.currentPage - 1) * req.params.pagination;

    try{
        const games = await Game.find({}).skip(skip).limit(req.params.pagination);
        res.json(games);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};
  
const gameByID = async (req, res) => {
    try{
        const game = await Game.findById(req.params.idGame);
        res.json(game)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};
  
const updateGame = async (req, res) => {
    if (!req.params.idGame) {
        return res.status(404).json({
        "message": 
            "Could not find game, idGame is required!"
        });
    }

    var game = {
        title: req.body.title,
        description: req.body.description,
        pictures: req.body.pictures,
        players: req.body.players
    }

    try{
        var game = await Game.findByIdAndUpdate(req.params.idGame, game);
        res.json(game)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }  
};
  
const deleteGame = async (req, res) => {
    const {idGame} = req.params;
    if (idGame) {
        
        try{
            await Game.findByIdAndDelete(idGame);
            res.status(204).json("idGame removed!");
        }
        catch(error){
            res.status(500).json({message: error.message})
        } 
        
    } else {
        res.status(404).json({
            "message": 
                "Could not find game, idGame is required!"
        });
    }
};
  
  module.exports = {
    gameCreate,
    updateGame,
    deleteGame,
    gameByID,
    allGames,
    allGamesPagination
  };