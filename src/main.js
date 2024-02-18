import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
formEl: document.querySelector('.js-search-form'),
    imgEl: document.querySelector('.js-image-container'),
    loader: document.querySelector('.loader'),
};

function showLoader() {
     refs.loader.classList.remove('hidden');
}

function hideLoader() {

     refs.loader.classList.add('hidden');
}

refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();
    showLoader();

    const query = e.target.elements.text.value; 

    getImg(query).then(data => {
        renderImg(data);
        if (data.hits.length === 0) {
            throw new Error('No images found');
        }
         renderImg(data);
            e.target.elements.text.value = '';
})
        .catch(error => {
            iziToast.error({
               position: "topRight",
               message: 'An error occurred while loading images. Please try again later.',
            });
        })
        .finally(() => {
            hideLoader(); 
        });
}

// Функція, запит на сервер

function getImg(imgEl) {

    const BASE_URL = 'https://pixabay.com/api/';
    
    const PARAMS = new URLSearchParams({
        key: '42435331-5518aafb74583ec5494003d9b',
        q: imgEl,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    });
    

    const url = `${BASE_URL}?${PARAMS.toString()}`;
    
    const options = {
        headers: {
            API_KEY: '42435331-5518aafb74583ec5494003d9b',
        },
    };

   return fetch(url).then(response=>response.json());
}

//Функція розмітки

function imgTemplate(photo) {
    return `
  <div class="photo-container">
     <a class="gallery-link" href="${photo.largeImageURL}" data-lightbox="image">  <img
      src="${photo.webformatURL}"
      alt="${photo.tags}"
      class="photo"
    />  </a>
    
    <div class="photo-body">
    <p class="photo-name">Likes ${photo.likes}</p>
    <p class="photo-name">Views ${photo.views}</p>
    <p class="photo-name">Comments ${photo.comments}</p>
    <p class="photo-name">Downloads ${photo.downloads}</p>
  </div>
  </div>
`;
    
}

const options = {
  captionsData: 'alt',
    captionDelay: 250, // Затримка в мілісекундах
};

let lightBox = new SimpleLightbox('.gallery-link', options);

function renderImg(data) {
    const imagesMarkup = data.hits.map(img => imgTemplate(img)).join('');
    refs.imgEl.innerHTML = imagesMarkup;
    lightBox.refresh();

}