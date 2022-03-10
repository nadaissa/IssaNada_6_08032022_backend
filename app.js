const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Sauce = require("./models/Sauce");

mongoose.connect('mongodb+srv://rosario_j:Mycluster123@cluster0.kbvyu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//ligns for the CROS error => to give the app access to the API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

//ligne suivante toujours à la fin du doc
module.exports = app;
/*
exemple du cours des middleware pour objets en vente sur site
app.use('/api/stuff', (req, res, next) => {
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(stuff);
});
*/
/* plus tard si nécessaire:
//middleware pour POST:
app.use(express.json());
app.post('/api/stuff', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});
soit modifier la méthode  use  en  get  
pour le middleware des requêtes GET ;
soit placer la route POST au-dessus 
du middleware pour les requêtes GET, 
car la logique GET interceptera actuellement 
toutes les requêtes envoyées à votre endpoint
/api/stuff , étant donné qu'on ne lui 
a pas indiqué de verbe spécifique. 
Placer la route POST au-dessus interceptera 
les requêtes POST, en les empêchant d'atteindre 
le middleware GET.*/
