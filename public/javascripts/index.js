const axios = require('axios');
import yelpChart from './chart.js';

document.addEventListener('DOMContentLoaded', () => {

    // let isbn = '0201558025';
    // axios.get(`/books/${isbn}`)
    // .then((response) => {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });

    let searchParams = {
      term: 'cafe',
      location: 'san francisco, ca'
    };

    // let term = '';
    // let location = '';
    // let latitude = '';
    // let longitude = '';
    // let radius = '';
    // let open_now = '';
    // const limit = 10;

    console.log('searchParams:', searchParams);

    let searchRequest = JSON.stringify(searchParams);

    console.log('searchRequest:', searchRequest);

    axios.get(`/search`, searchRequest)
    .then((response) => {
        console.log(response);
    })
    .catch(function (err) {
        console.log(err);
    });

})
