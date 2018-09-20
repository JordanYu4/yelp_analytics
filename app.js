'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const path = require('path');

const apiKey = require('./config/key');
const yelp = require('yelp-fusion');
const client = yelp.client(apiKey);

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// });

// Search route 

app.post('/search', (request, response) => {
  let dataSet = [];
  client.search(request.body).then(result => {
    let businesses = result.jsonBody.businesses;
    for (let i = 0; i <= 4; i++) {
      let { name, 
            image_url, 
            url, 
            rating, 
            distance} = businesses[i]; 
      let business = {name, image_url, url, rating, distance};
      dataSet.push(business);
    }
    response.send(dataSet);
    // dataSet;
  })
  .catch(err => {
    console.log(err);
  })
});
            
// app.get('/search', (req, res) => {
//   let searchResults = [];
//   client.search(req.query).then(response => {
//     response.jsonBody.businesses.forEach(business => { // refactor w/ for loop
//       let searchResult = {
//         "name": business.name,
//         "url": business.url,
//         "reviewCount": business.review_count,
//         "rating": business.rating,
//         "address": business.location
//       };
//       searchResults.push(searchResult);
//     })
//     console.log("SEARCH RESULT START", searchResults, "SEARCH RESULT END");
//     res.send(searchResults);
//   }).catch(err => {
//     console.log(err);
//   });
// });

//////////////////////////////

// app.get('/books/:isbn', (request, response) => {
//   // make api call using fetch
//   fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${request.params.isbn}&format=json&jscmd=data`)
//   .then((response) => {
//     return response.text();
//   }).then((body) => {
//     let results = JSON.parse(body)
//     console.log(results)   // logs to server
//     response.send(results) // sends to frontend
//   });
// });

// client.search(searchRequest).then(response => {
  //   const firstResult = response.jsonBody.businesses[0];
  //   const cleanJson = JSON.stringify(firstResult, null, 4);
  //   console.log(cleanJson);
  // }).catch(err => {
    //   console.log(err);
    // });

///////////////////////////////

app.use(express.static("public"));

app.get('/', (request, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

// process.env accesses heroku's environment variables
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`Listening on ${PORT}`)
});
