(function () {  

document.addEventListener('DOMContentLoaded', function () {
  var backgroundDiv = document.querySelector('.background-image-container');

  var backgroundImages = [
    'images/24038854104_f033c2cd42_k.jpg',
    'images/24371456450_4dea541e00_k.jpg',
    'images/24549348272_dde12d1dca_k.jpg',
    'images/24640877256_6e06ddc746_k.jpg',
    'images/24667023715_ae6c536743_k.jpg'
  ];

  var backgroundImageIndex = Math.floor(Math.random()*backgroundImages.length);

  backgroundImages.forEach(function (url) {
    // preload images!
    var image = new Image();
    image.src = url;
  });

  function nextBackgroundImage() {
    backgroundImageIndex = (backgroundImageIndex + 1) % backgroundImages.length;
    backgroundDiv.style.backgroundImage = 'url(\'' + backgroundImages[backgroundImageIndex] + '\')';
  }

  setInterval(nextBackgroundImage, 10000);
  nextBackgroundImage();


  var newsSectionContent = document.querySelector('#news-section > .content');
  var newsItemTemplate = newsSectionContent.querySelector('.template');

  newsItemTemplate.parentNode.removeChild(newsItemTemplate);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'blog-posts.json', true);

  xhr.onload = function (e) {
    var json;
    try {
      json = JSON.parse(xhr.response);
    }
    catch (e) {
      console.error('Couldn\'t parse blog post JSON.');
    }

    if (json) {
      json.forEach(function (item) {
        var itemElement = newsItemTemplate.cloneNode(true);

        itemElement.querySelector('h3 a').innerHTML = item.title;
        itemElement.querySelector('h3 a').href = item.link;
        itemElement.querySelector('.description').innerHTML = item.description;
        itemElement.querySelector('.read-more').href = item.link;

        Array.prototype.forEach.call(itemElement.querySelectorAll('.description img'), function (imageElement) {
          imageElement.parentNode.removeChild(imageElement);
        });

        itemElement.hidden = false;
        newsSectionContent.appendChild(itemElement);
      });

      var bigReadMoreButton = newsSectionContent.querySelector('.big-read-more-button');
      bigReadMoreButton.parentNode.appendChild(bigReadMoreButton);
    }
  };

  xhr.send();

});

})();