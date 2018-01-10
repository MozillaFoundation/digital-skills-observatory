const jsdom = require("jsdom");
const fs = require('fs');

const { JSDOM } = jsdom;

const scriptsToKeep = {
};

const fileMap = {
  'DSO All Interviews - Silk.html': 'index.html'
};

const allowedExternalLinksPrefixes = [
  'https://docs.google.com/spreadsheets/d/'
];

const elementsWithIdsToRemove = [
  'pagebar-container',
  'notice-bar',
  'global-footer',
  'intercom-frame',
  'intercom-container'
];

const elementsWithClassesToRemove = [
  'search-container'
];

const linkMap = {
  'http://dso-all-interviews.silk.co/page/Adoption':'Adoption - DSO All Interviews.html',
  'http://dso-interview-2.silk.co/page/Apps-&-General':'App Usage - DSO Interview 2.html',
  'http://dso-interview-3.silk.co/page/General-Apps-and-Data-Usage':'Apps and Data Usage - DSO Interview 3.html',
  'http://dso-all-interviews.silk.co/page/Digital-Financial-Services':'Digital Financial Services - DSO All Interviews.html',
  'http://dso-interview-1.silk.co/page/Digital-Financial-Services':'Digital Financial Services - DSO Interview 1.html',
  'http://dso-interview-2.silk.co/page/Digital-Financial-Services':'Digital Financial Services - DSO Interview 2.html',
  'http://dso-interview-3.silk.co/page/Digital-Financial-Services':'Digital Financial Services - DSO Interview 3.html',
  'http://dso-interview-4.silk.co/page/Digital-Financial-Services':'Digital Financial Services - DSO Interview 4.html',
  'http://dso-interview-5.silk.co/page/Digital-Financial-Services':'Digital Financial Services - DSO Interview 5.html',
  'http://dso-interview-6.silk.co/page/Digital-Financial-Services':'Digital Financial Services - DSO Interview 6.html',
  'http://dso-interview-5.silk.co/page/Discovering-new-products-and-services':'Discovering new products and services - DSO Interview 5.html',
  'http://dso-all-interviews.silk.co/':'DSO All Interviews - Silk.html',
  'http://dso-interview-1.silk.co/':'DSO Interview 1 - Silk.html',
  'http://dso-interview-2.silk.co/':'DSO Interview 2 - Silk.html',
  'http://dso-interview-3.silk.co/':'DSO Interview 3 - Silk.html',
  'http://dso-interview-4.silk.co/':'DSO Interview 4 - Silk.html',
  'http://dso-interview-5.silk.co/':'DSO Interview 5 - Silk.html',
  'http://dso-interview-6.silk.co/':'DSO Interview 6 - Silk.html',
  'http://dso-interview-6.silk.co/page/Evaluation':'Evaluation - DSO Interview 6.html',
  'http://dso-interview-5.silk.co/page/Gambling-&-Betting':'Gambling & Betting - DSO Interview 5.html',
  'http://dso-interview-5.silk.co/page/Gender-Questions':'Gender Questions - DSO Interview 5.html',
  'http://dso-interview-4.silk.co/page/Intervention':'Intervention - DSO Interview 4.html',
  'http://dso-interview-5.silk.co/page/Intervention':'Intervention - DSO Interview 5.html',
  'http://dso-interview-5.silk.co/page/Jisort':'Jisort - DSO Interview 5.html',
  'http://dso-interview-1.silk.co/page/Learning':'Learning - DSO Interview 1.html',
  'http://dso-all-interviews.silk.co/page/Learning':'Learning Digital Skills - DSO All Interviews.html',
  'http://dso-interview-5.silk.co/page/Lifestyle-&-Environment':'Lifestyle & Environment - DSO Interview 5.html',
  'http://dso-all-interviews.silk.co/page/Lifestyle-and-economy':'Lifestyle and economy - DSO All Interviews.html',
  'http://dso-interview-4.silk.co/page/Privacy-&-Security':'Privacy & Security - DSO Interview 4.html',
  'http://dso-interview-6.silk.co/page/Treatment-group-Retrospective':'Retrospective (Treatment group) - DSO Interview 6.html',
  'http://dso-interview-2.silk.co/page/Social-Media/':'Social Media - DSO Interview 2.html',
  'http://dso-interview-3.silk.co/page/Social-Media/':'Social Media - DSO Interview 3.html',
  'http://dso-interview-4.silk.co/page/Social-Media/':'Social Media - DSO Interview 4.html',
  'http://dso-interview-5.silk.co/page/Social-Media/':'Social Media - DSO Interview 5.html',
  'http://dso-interview-6.silk.co/page/Social-Media/':'Social Media - DSO Interview 6.html',
  'http://dso-interview-6.silk.co/page/Treatment-group-Sterro':'Sterro (Treatment group) - DSO Interview 6.html',
  'http://dso-interview-2.silk.co/page/Technology':'Technology - DSO Interview 2.html',
  'http://dso-interview-4.silk.co/page/Technology':'Technology - DSO Interview 4.html',
  'http://dso-interview-5.silk.co/page/Technology-&-Smartphone':'Technology & Smartphone - DSO Interview 5.html',
  'http://dso-interview-1.silk.co/page/Technology':'Technology & Smartphones - DSO Interview 1.html',
  'http://dso-interview-3.silk.co/page/Technology-&-Smartphones':'Technology & Smartphones - DSO Interview 3.html',
  'http://dso-interview-6.silk.co/page/Technology-and-Smartphones':'Technology and Smartphones - DSO Interview 6.html'
};

const exclusiveFileList = [
  // 'DSO All Interviews - Silk.html',
  // 'Learning - DSO Interview 1.html'
];

const sourceDir = process.argv[2];

fs.readdir(sourceDir, (err, files) => {

  files.forEach((name) => {
    if (exclusiveFileList.length > 0 && exclusiveFileList.indexOf(name) === -1) {
      return;
    }

    if (name.indexOf('.html') > -1 && name.indexOf('.html') === name.length - 5) {
      fs.readFile(sourceDir + '/' + name, 'utf8', (err, data) => {
        console.log('Processing ' + name);
        const dom = new JSDOM(data);
        const document = dom.window.document;
        
        var scripts = document.querySelectorAll('script');
        Array.prototype.forEach.call(scripts, (scriptElement) => {
          if (scriptElement.hasAttribute('src') && scriptsToKeep[scriptElement.getAttribute('src')]) {
            scriptElement.setAttribute('src', scriptsToKeep[scriptElement.getAttribute('src')]);
          }
          else {
            scriptElement.parentNode.removeChild(scriptElement);
          }
        });

        var stylesheetLinks = document.querySelectorAll('link[rel="stylesheet"]');
        Array.prototype.forEach.call(stylesheetLinks, (stylesheetLink) => {
          if (stylesheetLink.getAttribute('href').indexOf('product.css') > -1) {
            stylesheetLink.setAttribute('href', './includes/product.css');
          }
        });

        elementsWithIdsToRemove.forEach((id) => {
          var element = document.querySelector('#' + id);
          if (element) element.parentNode.removeChild(element);
        });

        elementsWithClassesToRemove.forEach((className) => {
          var element = document.querySelector('.' + className);
          if (element) element.parentNode.removeChild(element);
        });

        var toc = document.querySelector('div.table-of-contents');
        if (toc) {
          var tocLinks = toc.querySelectorAll('a');
          Array.prototype.forEach.call(tocLinks, (linkElement) => {
            var destination = linkElement.textContent;
            var sections = document.querySelectorAll('section');
            var headers = document.querySelectorAll('h2, h3, h4');

            for (var i = 0; i < headers.length; ++i) {
              var header = headers[i];
              if (header.textContent === destination) {
                if (!header.id) header.id = 'section-' + destination.replace(/[^\w]/g, '').toLowerCase();
                linkElement.setAttribute('href', '#' + header.id);
                break;
              }
            }

            if (!linkElement.hasAttribute('href')) {
              console.error('Couldn\'t find section for TOC entry: ' + destination);
            }
          }); 
        }

        var links = document.querySelectorAll('a');
        Array.prototype.forEach.call(links, (anchorElement) => {
          if (anchorElement.hasAttribute('href')) {
            if (linkMap[anchorElement.getAttribute('href')]) {
              var newHref = linkMap[anchorElement.getAttribute('href')];
              newHref = fileMap[newHref] || newHref;
              anchorElement.setAttribute('href', newHref);
            }
            else if (anchorElement.getAttribute('href').indexOf('#') !== 0 
              && allowedExternalLinksPrefixes.filter((allowedPrefix) => {
                return anchorElement.getAttribute('href').indexOf(allowedPrefix) === 0;
              }).length === 0) {
              anchorElement.removeAttribute('href');
            } 
          }
        });

        var outputFilename = fileMap[name] || name;

        if (outputFilename !== 'index.html') {
          var backButton = document.createElement('div');
          backButton.innerHTML = '&nbsp;&larr; <a href="./index.html">DSO Dashboard Home</a>';
          document.body.insertBefore(backButton, document.body.firstElementChild);
        }

        var fullOutputPath = './dashboards/' + outputFilename;

        fs.writeFile(fullOutputPath, dom.serialize(), 'utf8', function (err) {
          console.log('Wrote ' + fullOutputPath);
        });
      });
    }
  });

});

