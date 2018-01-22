const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const rx = require('rxjs');
const axios = require('axios'); // declare axios for making http requests
const API = 'https://hn.algolia.com/api/v1'; // provided url API
const articleSchema = require('../schemas/Article');
const Article = mongoose.model('Article', articleSchema);

// Timer update
const cronJob = rx.Observable.timer(1, 3600000);

// Connect to db
mongoose.connect('mongodb://mongouser:someothersecret@localhost:27017/some_db');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // Once connected update articles
  const subscriber = cronJob.subscribe((tick) => {
    console.log('Updating Articles', tick);
    // Get latest nodejs related articles
    axios.get(`${API}/search_by_date?query=nodejs`).then(articles => {
      const data = articles.data;
      if (data.hits) {
        data.hits.forEach( hit => {
          console.log('ids', hit.objectID);
          // Update Articles in MongoDB
          Article.findOneAndUpdate({objectID: hit.objectID}, hit, {upsert: true}, (err, doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
            }
          });
        });
      };
    }).catch(error => {
      console.log('Couldnt get the articles update');
    });
  });
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get latest nodejs related articles
router.get('/articles-latest', (req, res) => {
  Article.find().then( articles => {
    console.log('articles', articles);
    res.status(200).json(articles);
  }).catch( err => res.status(500).send(erro));
});

module.exports = router;
