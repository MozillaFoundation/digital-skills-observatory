(function () {
  document.addEventListener('DOMContentLoaded', function (e) {
    var mapContainer = document.querySelector('#map-container');
    var mapBackground = document.querySelector('#map-background');
    var mapMarkerDottedLine = document.querySelector('#map-marker-dotted-line');

    var mapWidth = 0;
    var mapHeight = 0;
    var aspectRatio, inverseAspectRatio;

    function resizeMap(e) {
      var imaginaryImageHeight = window.innerWidth/aspectRatio;
      var imaginaryImageWidth = window.innerHeight/aspectRatio;

      if (window.innerHeight < imaginaryImageHeight) {
        mapHeight = window.innerHeight;
        mapWidth = mapHeight * aspectRatio;
      }
      else {
        mapWidth = window.innerWidth;
        mapHeight = mapWidth * (1/aspectRatio);
      }

      mapContainer.style.width = mapWidth + 'px';
      mapContainer.style.height = mapHeight + 'px';
    }

    function ready() {
      aspectRatio = mapBackground.width/mapBackground.height;
      inverseAspectRatio = mapBackground.height/mapBackground.width;
      resizeMap();
      mapBackground.hidden = false;
      window.addEventListener('resize', resizeMap);

      var mapMarketDottedLineTimeout;

      Array.prototype.forEach.call(document.querySelectorAll('.map-marker'), function (mapMarkerElement) {
        var locationInfoElement = mapMarkerElement.querySelector('.location-info');
        mapMarkerElement.addEventListener('mouseenter', function (e) {
          var mapRect = mapBackground.getBoundingClientRect();
          var mapMarkerElementRect = mapMarkerElement.getBoundingClientRect();
          var locationInfoElementRect = locationInfoElement.getBoundingClientRect();

          var w, h, angle, magnitude;

          if (locationInfoElementRect.left < mapMarkerElementRect.left && locationInfoElementRect.bottom < mapMarkerElementRect.top) {
            w = locationInfoElementRect.left - mapMarkerElementRect.left + locationInfoElementRect.width * .2;
            h = locationInfoElementRect.bottom - mapMarkerElementRect.top;
          }
          else {
            w = locationInfoElementRect.left - mapMarkerElementRect.left;
            h = locationInfoElementRect.top - mapMarkerElementRect.top + locationInfoElementRect.height * .5;
          }

          w -= mapMarkerElementRect.width / 2;
          h -= mapMarkerElementRect.height / 2;

          magnitude = Math.sqrt(w*w+h*h);
          angle = Math.atan2(-w, h);

          mapMarkerDottedLine.style.top = (mapMarkerElementRect.top - mapRect.top + mapMarkerElementRect.height / 2) + 'px';
          mapMarkerDottedLine.style.left = (mapMarkerElementRect.left - mapRect.left + mapMarkerElementRect.width / 2) + 'px';
          mapMarkerDottedLine.style.transform = 'rotate(' + angle + 'rad)';

          mapMarkerDottedLine.classList.remove('on');
          mapMarkerDottedLine.style.height = '0px';

          clearTimeout(mapMarketDottedLineTimeout);
          mapMarketDottedLineTimeout = setTimeout(function () {
            mapMarkerDottedLine.classList.add('on');
            mapMarkerDottedLine.style.height = magnitude + 'px';
          }, 50);
        });
        mapMarkerElement.addEventListener('mouseleave', function (e) {
          clearTimeout(mapMarketDottedLineTimeout);
          mapMarkerDottedLine.classList.remove('on');
          mapMarkerDottedLine.style.height = '0px';
        });
        window.addEventListener('mouseleave', function (e) {
          clearTimeout(mapMarketDottedLineTimeout);
          mapMarkerDottedLine.classList.remove('on');
          mapMarkerDottedLine.style.height = '0px';
        });
      });
    }

    // Wait for the image to actually load
    if (mapBackground.width === 0 || mapBackground.height === 0) {
      mapBackground.onload = ready;
    }
    else {
      ready();
    }
  });
})();