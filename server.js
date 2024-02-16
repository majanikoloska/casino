
const express = require('express');
const app = express();

require('./api_app/models/db')
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

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