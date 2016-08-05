var request = require('request');
var xmlreader = require('xmlreader');
var jsonfile = require('jsonfile');

var items = [];

console.log('Requesting RSS from blog...');
request('https://mozilla-foundation-research.herokuapp.com/tag/digital-skills-observatory/rss/', (error, response, xmlBody) => {
  if (!error && response.statusCode == 200) {
    console.log('Reading XML...');
    xmlreader.read(xmlBody, function (err, res) {
      res.rss.channel.item.each(function (index, element) {
        if (index < 3) {
          items.push({
            link: element.link.text(),
            title: element.title.text(),
            description: element.description.text()
          });
        }
      });

      console.log('Writing blog-posts.json...');
      jsonfile.writeFile('blog-posts.json', items, function (err) {
        if (err) {
          console.error(err);
        }
        else {
          console.log('Done.');
        }
      });
    });
  }
});
