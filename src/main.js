import './js/render-functions'
import './js/pixabay-api'
import SimpleLightbox from "simplelightbox";


import iziToast from "izitoast";
import { searchImg } from './js/pixabay-api'
import { renderImg } from './js/render-functions'

const spin = document.querySelector('.loader')
spin.style.opacity = 0;

const form = document.querySelector('.form');
form.addEventListener("submit", handelSearch);

function handelSearch(e) {
  e.preventDefault();
  spin.style.opacity = 1;


  const formTarget = e.currentTarget;
  const queryValue = formTarget.elements.query.value.toLowerCase();
  if (queryValue.length <= 0) {
    iziToast.show({
      backgroundColor: '#ef4040',
      messageColor: '#fff',
      messageSize: '16px',
      position: 'topRight',
      message: 'Please write something in the search field'
    })

    spin.style.opacity = 0;
    return;
  }

  searchImg(queryValue)
    .then(returnImg)
    .catch(fetchError)

  container.innerHTML = '';
  form.reset();

}


function returnImg(data) {

  const results = data.hits;
  const totalRes = data.totalHits;

  if (totalRes === 0) {
    iziToast.error({
      backgroundColor: '#ef4040',
      messageColor: '#fff',
      messageSize: '16px',
      position: 'topRight',
      message: 'Sorry, there are no images matching your search query. Please try again!'
    })
  } else {
    results.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      renderImg(webformatURL, largeImageURL, tags, likes, views, comments, downloads);
    })
  }


  let galleryShow = new SimpleLightbox('.gallery a', {
    captions: true,
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });

  galleryShow.on('show.simplelightbox', function () {
  });

  galleryShow.refresh()


  spin.style.opacity = '0';
}


function fetchError() {
  iziToast.error({
    backgroundColor: '#ef4040',
    messageColor: '#fff',
    messageSize: '16px',
    position: 'topRight',
    message: 'Sorry, there are no images matching your search query. Please try again!'
  })
}