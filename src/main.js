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

    const query = e.target.elements.text.value.trim();

    if (!query) {
        iziToast.warning({
            position: "topRight",
            message: 'Please enter a search query.',
        });
        return;
    }

    showLoader();

    getImg(query)
        .then(data => {
            if (data.hits.length === 0) {
                iziToast.warning({
                    position: "topRight",
                    message: 'Unfortunately, no images were found matching your query. Please try again!',
                });
            } else {
                renderImg(data);
            }
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
    
    return fetch(url).then(response => response.json());
}

function imgTemplate(photo) {
    return `
    <div class="photo-container">
        <a class="gallery-link" href="${photo.largeImageURL}" data-lightbox="image">
            <img src="${photo.webformatURL}" alt="${photo.tags}" class="photo" />
        </a>
        
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
    captionDelay: 250,
};

let lightBox = new SimpleLightbox('.gallery-link', options);

function renderImg(data) {
    const imagesMarkup = data.hits.map(img => imgTemplate(img)).join('');
    refs.imgEl.innerHTML = imagesMarkup;
    lightBox.refresh();
}
