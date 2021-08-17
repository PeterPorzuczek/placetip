const express = require('express');

const documents = require('./modules/documents');
const places = require('./modules/places');
const sentiments = require('./modules/sentiments');
const prefix = '/api/v1';

const router = express.Router();

router.use('/', documents);
router.use(`${prefix}/places`, places);
router.use(`${prefix}/sentiments`, sentiments);

module.exports = router;
