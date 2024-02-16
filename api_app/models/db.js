var mongoose = require('mongoose')

var dbURI = 'mongodb+srv://app:gamanza123@casino.uxwsxap.mongodb.net/';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose is connected on ${dbURI}.`);
});

mongoose.connection.on('error', napaka => {
  console.log('Mongoose connection error: ', napaka);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected.');
});

// const pravilnaUstavitev = (sporocilo, povratniKlic) => {
//   mongoose.connection.close(() => {
//     console.log(`Mongoose je zaprl povezavo preko '${sporocilo}'.`);
//     povratniKlic();
//   });
// };

// Ponovni zagon nodemon
// process.once('SIGUSR2', () => {
//   pravilnaUstavitev('nodemon ponovni zagon', () => {
//     process.kill(process.pid, 'SIGUSR2');
//   });
// });

// // Izhod iz aplikacije
// process.on('SIGINT', () => {
//   pravilnaUstavitev('izhod iz aplikacije', () => {
//     process.exit(0);
//   });
// });



require('./player');
require('./game');

