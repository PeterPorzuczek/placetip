// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START language_quickstart]
async function quickstart() {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient({
    credentials: {
      "client_email": "proj-314@key-shine-317322.iam.gserviceaccount.com",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCnBuxPlG4PEj2Y\noJi3bwCLd3596H5Mmnx+Pf9oHQypze0XDBODluhbhvAvGkOWsUzf7CN5NyPvaxN4\n+7KWu6SC2ZvyIZPrNtR8phc/EzcqFNZ1Q02/cGEsLpchIeD1WUxZasjdmCimnvTa\nS2UnIZhxfsTiLGaViC/+Ww7YG0OyeIDQqAUxjkT9zdz417tLYADqkj0SKAoL/t4J\nRJ0mFle4ZmpZ62yb4e4k/FcGINe8rbOMzt1h3os/sgEvEmZ2avHXt3sWsq5c+KJB\nXgev9axtpLHSLbJH93KuF3/G86Lo5cFdvwmuv2JFGulO05BMH8exRZAQOyMUFZuG\nqtrOZ/9/AgMBAAECggEAD1VWK4mt/0aZzpssdrQc0eQRNRahqzKh3yad5D1Wd96Z\nt2K6bK6IrwfyOlpbSuHRjUHGXk7IYI0gTbXKYIZ7xPw1+FwXK9UhKKUVJgs2wAkH\nSKvHEjek4N0RSE9hF+T8wPCwQ/eMZwKmUJJY7oC2pL5FU/+zfMkl1S0foPADBPn4\n8EJl3aBnDs1R62e1VWsftqkuZc9QMIjpP74vbskcEjIvohwbGA9Jlz2mLHgHIZGL\nBcqjo3hXIxKUh5XIDmchcYfPU1RAKKdki5KUQ9NOiFFB4m5HoElfgwdf24HWCbL7\nRQBkQXfCBz2U+4oLaBVXzPWndNCVKMqzZkRqMVu7AQKBgQDgvHrvr7MvbWqpG+rl\nZJ/+3trywfsncz/eBW3QhFUYxdWmTfPdLqU5LjNOosSYJzDItEBTcUgfcSc0Htlf\nTQpvfpod/3XoGvD+Aly6pK5Pr7aXs6Yabt50NI5Am6CKk5d2be8hr2alZjkjyP4B\nSfZD+lr9vjFy93XjLA1MC+jtvwKBgQC+Qz9+lq1SbYf8iJ+IXFb6xTKOYrj6XP4a\nWfN2WXbZMlQ7f6FI9M2qUiostD+e2IkhM9mn7LU4AWS1uMKQ5ddz1fjjF8zSGXkQ\nWd23/5qpIJZ5Rm9WR4QPMD5jc+T+e31c/vDAr9hO5SC8ktPz2OysJDnREiAje+RA\nisGe6+jeQQKBgQDROQemn0dNTysuduwvVYfSiv0BZfCBIL2D4EAFET38CypFYms3\nLpbpbgacHdKy6EF1iMIeLOd9RiW+Uz4BiEK/2/h1FwBY7sQPZnmX1XrmeuqdvsVT\n9IWrX8ZThc9nU9J9kgk/rgD82Pc3RoabApV/YdNWSbvVkWYx8TAL7UaUFwKBgQC+\nDEBFO08fsecO2o24ULxVO1sXnQc2lmL/gXBOfGjZ5Yr77630SQuSoQYdp2KRUawQ\nbVFximEt8z5cwpQe1mcS/t3gQSrHhshGC+4L2Bbt724+75tQ7Ji97yuyfdZ0WHfN\nx55Gap+/luHPWz66Kamm/Xx/GQLfTuadjbx/+RefwQKBgQDRA1ZlKd6jd57p+0YZ\nL38awuLRDgRg2lwCx0XS+xyX0EJldvT6WxEnBq/jHzPoe5TwG0CtW4Zgq1u3SVca\nWYdKrq1HgiF8ztq1IR9XfBg75CFVakWrnPmF8fKeSy/fmQxXnb0kPlne4fLNVzwH\nFWHMT8yr6QywiocN+cLSXyNr1Q==\n-----END PRIVATE KEY-----\n",
    }
  });

  // The text to analyze
  // const text = `There are usually 1 person for 4 workstations, the queues reach the sky. There was only one employee out of ten people waiting. The second sat with a mini pizza in a relaxation room, the third locked himself in his office. Simple operation - payment to your own account takes 1-2 hours. For things that should be dealt with 'on the spot', you need to be patient like a ham before Christmas in the 1980s. 'Góra' is certainly aware or alarmed about the situation at this point (examples can be very numerous, negative opinions issued here) instead of investing in employees to facilitate the use of services for clients, it invests in advertising and cheap tricks. I am very happy every time an employee informs me about 'an offer specially prepared for me'. I would be more pleased if you had professional service to offer. Or invest in PAYMENTS. With referrals, you'll get more customers than with advertising. For now, I don't know if anyone would be crazy enough to recommend a bank where you wait like in NFZ. And this is not just about branch no. 7. Finally, pay attention to keeping old customers instead of getting new ones you can't handle. And relieve your own employees because it is physically impossible to handle so many clients a day.`;
  // const text = `PKO time stood still there. Only customers are getting old ...`;
  const text = `In my opinion, it is one of the best branches in Gdańsk.\nThe team is very knowledgeable and professional.\nMy problem was solved in a very short time. Ladies from the very entrance greet the client with a smile! The director is very involved in his work and has great knowledge and patience with even such difficult and annoying clients as me. If I have an errand to deal with at the Bank, I always try to use the services of branch number 7!"`;
  
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const a = await client.analyzeSentiment({document: document});
  const sentiment = a[0].documentSentiment;

  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

  
  if (sentiment.score > 0 && sentiment.magnitude > 0) {
    console.log(`Clearly Positive`);
  }

  if (sentiment.score < 0 && sentiment.magnitude > 0) {
    console.log(`Clearly Negative`);
  }

  if (sentiment.score > 0 && sentiment.magnitude == 0) {
    console.log(`Neutral`);
  }

  if (sentiment.score == 0 && sentiment.magnitude == 0) {
    console.log(`Mixed`);
  }

  try {
    const [classification] = await client.classifyText({document});
    console.log('Categories:');
    classification.categories.forEach(category => {
      console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
    });
  } catch(message) {
    console.log(message.details);
  }


  const b = await client.analyzeEntitySentiment({document});
  const entities = b[0].entities;

  // console.log('Entities and sentiments:');
  // entities.forEach(entity => {
  //   console.log(`  Name: ${entity.name}`);
  //   console.log(`  Type: ${entity.type}`);
  //   console.log(`  Score: ${entity.sentiment.score}`);
  //   console.log(`  Magnitude: ${entity.sentiment.magnitude}`);
  // });
}
// [END language_quickstart]

quickstart().catch(console.error);
