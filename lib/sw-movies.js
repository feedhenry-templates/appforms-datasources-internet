var express = require('express');
var router = express.Router();
var handleError = require('./error-helper');
var swapi = require('swapi-node');


/**
 * Getting a list of assets from the an external source.

  This list of assets, once retrieved, will be properly formatted as a Data Source to be used in Forms Apps

  An example of this format is:

  [
      {
          "key": "some_key",
          "value": "some_value",
          "selected": true/false
      }
  ]
 */
router.get('/', function(req, res) {
  // We are going to use the Open Source Star Wars api to get the list of Films in the Star Wars Series
  // We will use an Open Source library called swapi-node, https://www.npmjs.com/package/swapi-node, to make the calls to the api

  swapi.getFilm().then(function (response) {

    // the results object of the response holds the data we want
    // we map the results to be in the format we need for Data Sources
    var listOfMovies = response.results.map(function (movie) {
      return {
        key: movie.episode_id,
        value: movie.title,
        selected: false
      };
    });

    // Now lets do a simple sort here to get the movies in order.
    listOfMovies = listOfMovies.sort(function (a, b) {
      return a.key > b.key;
    });

    // Now we return the list
    res.json(listOfMovies);
  }).catch(function (err) {
    handleError(err, res);
  });
});

module.exports = router;
