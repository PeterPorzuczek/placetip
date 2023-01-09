const express = require('express');
const cache = require('memory-cache');
const language = require('@google-cloud/language');
const { credentials } = require('../keys.js');

const client = new language.LanguageServiceClient({
  credentials: credentials
});

const createSentiment = async (text) => {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  try {
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;

    let feeling = "";
    if (sentiment.score > 0 && sentiment.magnitude > 0) {
      feeling = `Clearly Positive`;
    }

    if (sentiment.score < 0 && sentiment.magnitude > 0) {
      feeling = `Clearly Negative`;
    }

    if (sentiment.score > 0 && sentiment.magnitude == 0) {
      feeling = `Neutral`;
    }

    if (sentiment.score == 0 && sentiment.magnitude == 0) {
      feeling = `Mixed`;
    }

    return {
      text: text,
      score: sentiment.score,
      magnitude: sentiment.magnitude,
      feeling: feeling
    };
  } catch(message) {
    return {
      text: text,
      error: `${message.details}`,
    };
  }
}

const router = express.Router();

router.get('/reveal/:text', async (req, res) => {
  if (!(req.params && req.params.text)) {
    throw new Error();
  }

  const text = req.params.text;
  let result = cache.get(text);
  if (!result) {
    result = await createSentiment(text);
    cache.put(text, result);
  }

  res.json(result);
});

module.exports = router;
