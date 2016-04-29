var request = require('request');
var xmlreader = require('xmlreader');

request('http://mozilla-foundation-research.herokuapp.com/rss', (error, response, body) => {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
});
