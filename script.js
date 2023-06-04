const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

//Unsplash API
const count = 10;
const apiKey = 'q99h7oGVdlvh6EM0nSQdLw2w1VXHVm57kaqO3asQa9g';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


//create elements for links & photos, add to DOM
function displayPhotos() {
  //loop through the array and show the photos
  photosArray.forEach((photo) => {
    //create <a>
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');

    //create <img>
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

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

//on loa
getPhotos();
