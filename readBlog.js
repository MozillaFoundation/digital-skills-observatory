var request = require('request');
var xmlreader = require('xmlreader');
var jsonfile = require('jsonfile');

var items = [];

request('https://mozilla-foundation-research.herokuapp.com/tag/digital-skills-observatory/rss/', (error, response, xmlBody) => {
  if (!error && response.statusCode == 200) {
    xmlreader.read(xmlBody, function (err, res) {
      res.rss.channel.item.each(function (index, element) {
        if (index < 6) {
          items.push({
            link: element.link.text(),
            title: element.title.text(),
            description: element.description.text()
          });
        }
      });

      jsonfile.writeFile('blog-posts.json', items, function (err) {
        if (err) {
          console.error(err);
        }
      });
    });
  }
});
