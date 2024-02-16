const mongoose = require('mongoose');
const Game = mongoose.model('game');

const fs = require('fs');


const gameCreate = async (req, res) => {
    const imagePaths = req.body.pictures;
    console.log(imagePaths);
    const base64Images = [];

    try {
        await Promise.all(imagePaths.map(async imagePath => {
            try {
                const data = await fs.promises.readFile(imagePath);
                const base64Image = Buffer.from(data).toString('base64');
                base64Images.push(base64Image);
            } catch (err) {
                console.error(err);
                throw new Error(err.message);
            }
        }));

        console.log(base64Images); 

        const gameData = {
            title: req.body.title,
            description: req.body.description,
            pictures: base64Images,
            players: req.body.players
        };

        const game = await Game.create(gameData);
        res.json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

    const imagePaths = req.body.pictures;
    console.log(imagePaths);
    const base64Images = [];

    try {
        
        await Promise.all(imagePaths.map(async imagePath => {
            try {
                const data = await fs.promises.readFile(imagePath);
                const base64Image = Buffer.from(data).toString('base64');
                base64Images.push(base64Image);
            } catch (err) {
                console.error(err);
                throw new Error(err.message);
            }
        }));

        console.log(base64Images);

        const gameData = {
            title: req.body.title,
            description: req.body.description,
            pictures: base64Images,
            players: req.body.players
        };

        const game = await Game.findByIdAndUpdate(req.params.idGame,gameData);
        res.json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
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