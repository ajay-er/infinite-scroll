const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let imagesLoaded = 0;
let ready = false;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const apiKey = 'q99h7oGVdlvh6EM0nSQdLw2w1VXHVm57kaqO3asQa9g';
let count = 5;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoader() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
  }
}

//helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//create elements for links & photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //loop through the array and show the photos
  photosArray.forEach((photo) => {
    //create <a>
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    //create <img>
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //Event listener, check when each image is finished loading
    img.addEventListener('load', imageLoader);

    //put <img> inside <a>,then put both inside img container element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get photos from unsplash api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

//check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//on load
getPhotos();
