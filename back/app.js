const express = require('express');
const app = express();  

const cors = require('cors');
//utilisation du package express
// const express =  require('express');

// require ('dotenv').config();

// création de l'app à partir d'express
// const app = express();

//appel du fichier de base de donnée
const mongoose = require('./db.js');

// appel des routes
const stuffRoutes = require('./routes/stuff');

const userRoute = require('./routes/user')

// appel de path pour l'utilisation d'images
const path = require('path');
 
// appel de morgan pour generer les requetes dans la console
const morgan = require('morgan'); 
app.use (morgan('dev'));

//utiliser express



// autoriser les échanges entre servers
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
 
app.use(express.json());



app.use('/image', express.static(path.join(__dirname, 'image')))  

app.use('/api/sauces', stuffRoutes);

app.use('/api/auth', userRoute);


 
module.exports = app;










module.exports = app;
