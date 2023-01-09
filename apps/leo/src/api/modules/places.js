const express = require('express');
const fetch = require('sync-fetch');
const cache = require('memory-cache');
const { credential } = require('../keys.js');

const key = credential;
const placesHost = 'https://maps.googleapis.com/';
const placesDetails = 'maps/api/place/details/json?place_id=';
const placesFields = '&fields=name,rating,formatted_phone_number,reviews';

const places = {
  key: key,
  host: 'https://maps.googleapis.com/',
  list: {
    main: 'maps/api/place/textsearch/json?query=',
    fields: ''
  },
  details: {
    main: 'maps/api/place/details/json?place_id=',
    fields: '&fields=name,rating,formatted_phone_number,reviews'
  }
};

const createPlacesDetailsEndpoint = (id) => `${places.host}` +
  `${places.details.main}${id}${places.details.fields}${places.key}`;

const createPlacesListEndpoint = (query) => `${places.host}` +
  `${places.list.main}${query}${places.list.fields}${places.key}`;

const router = express.Router();

router.get('/list/:query', (req, res) => {
  if (!(req.params && req.params.query)) {
      throw new Error();
  }
  const placeQuery = req.params.query;
  let result = cache.get(placeQuery);
  if (!result) {
    const endpoint = createPlacesListEndpoint(placeQuery);
    result = fetch(endpoint).json();

    cache.put(placeQuery, result);
  }

  res.json(result);
});

router.get('/details/:id', (req, res) => {
  if (!(req.params && req.params.id)) {
      throw new Error();
  }
  const placeId = req.params.id;
  let result = cache.get(placeId);
  if (!result) {
    const endpoint = createPlacesDetailsEndpoint(placeId);
    result = fetch(endpoint).json();

    cache.put(placeId, result);
  }

  res.json(result);
});

module.exports = router;
