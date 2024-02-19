
const express = require('express');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

require('./api_app/models/db')
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});


var swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Game API",
        version: "1.0.0",
        description: "API documentation for managing casino players and games."
      }
    },
    apis: [
      "./api_app/models/game.js",
      "./api_app/models/player.js",
      "./api_app/models/db.js",
      "./api_app/routes/index.js"
    ]
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

let requestCounter = 0;

const incrementRequestCounter = (req, res, next) => {
  requestCounter++;
  next();
};

app.get('/api/request-counter', (req, res) => {
  res.json({ count: requestCounter });
});

app.use(incrementRequestCounter);

const routes = require('./api_app/routes/index');

app.use('/api', routes)

//specifying the port to listen on
const port = process.env.PORT || 3000; 

//starting the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


const indexApi = require('./api_app/routes/index');

app.use('/index', indexApi);

module.exports = {
  app
};