//general imports
require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const helmet = require('helmet');

//path for system files
const path = require('path');

//router imports
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

//database connect to mongoose module
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Instantiate server app
const app = express();
app.use(helmet());

//ligns for the CROS error => to give the app access to the API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  next();
  });

//JSON parse method (express version >4.16 so no need to bodyparser)
app.use(express.json());

//indication to express for static handling of images ressources 
app.use('/images', express.static(path.join(__dirname, 'images'))); //dirname is the target folder

//api routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);


//app export
module.exports = app;

