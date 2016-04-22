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

});

})();