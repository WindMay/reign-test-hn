const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://hn.algolia.com/api/v1';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get latest nodejs related articles
router.get('/articles', (req, res) => {
  axios.get(`${API}/search_by_date?query=nodejs`).then(articles => {
    res.status(200).json(articles.data);
  }).catch(error => {
    res.status(500).send(error);
  });
});

module.exports = router;
