'use strict';
const destination = document.body.dataset.destination;
if (destination && destination.startsWith('/') && !destination.startsWith('//')) {
  location.replace(destination + location.search + location.hash);
}
