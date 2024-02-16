const mongoose = require('mongoose');
const Player = mongoose.model('player');


const playerCreate = async (req, res) => {
    var player_data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        born: req.body.born
    };

    try{
        var player = await Player.create(player_data);
        res.json(player)
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
};

const allPlayers = async (req, res) => {
    try{
        const players = await Player.find();
        res.json(players)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

const allPlayersPagination = async (req, res) => {
    var skip = (req.params.currentPage - 1) * req.params.pagination;

    try{
        const players = await Player.find({}).skip(skip).limit(req.params.pagination);
        res.json(players);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};
  
const playerByID = async (req, res) => {
    try{
        const player = await Player.findById(req.params.idPlayer);
        res.json(player)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};
  
const updatePlayer = async (req, res) => {
    if (!req.params.idPlayer) {
        return res.status(404).json({
        "message": 
            "Could not find player, idPlayer is required!"
        });
    }

    var player = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        born: req.body.born
    }

    try{
        var player = await Player.findByIdAndUpdate(req.params.idPlayer, player);
        res.json(player)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }  
};
  
const deletePlayer = async (req, res) => {
    const {idPlayer} = req.params;
    if (idPlayer) {
        
        try{
            await Player.findByIdAndDelete(idPlayer);
            res.status(204).json("idPlayer removed!");
        }
        catch(error){
            res.status(500).json({message: error.message})
        } 
        
    } else {
        res.status(404).json({
            "message": 
                "Could not find player, idPlayer is required!"
        });
    }
};
  
  module.exports = {
    playerCreate,
    updatePlayer,
    deletePlayer,
    playerByID,
    allPlayers,
    allPlayersPagination
  };