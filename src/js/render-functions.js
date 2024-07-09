import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import { searchImg } from './pixabay-api'


const form = document.querySelector('.form');
const searchBtn = document.querySelector('.btn')
const input = document.querySelector('.input')
const container = document.querySelector('.gallery')




form.addEventListener("submit", handelSearch);

function handelSearch(e) {
  e.preventDefault();

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
  }


  searchImg(queryValue)
    .then((data) => {
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
          const markup =
            `<li class="gallery-item">
              <a class="gallery-link" href="${largeImageURL}">
              <img src="${webformatURL}" alt="${tags}" class="gallery-img">
              </a>
                <div class="text-wrap">
                  <p class="img-text">Likes <span class="img-text-span">${likes}</span></p>
                  <p class="img-text">Views <span class="img-text-span">${views}</span></p>
                  <p class="img-text">Comments <span class="img-text-span">${comments}</span></p>
                  <p class="img-text">Downloads <span class="img-text-span">${downloads}</span></p>
                </div>
            </li>`

          container.insertAdjacentHTML('afterbegin', markup);


          let galleryShow = new SimpleLightbox('.gallery a', {
            captions: true,
            captionType: 'attr',
            captionsData: 'alt',
            captionPosition: 'bottom',
            captionDelay: 250,
          });
          galleryShow.on('show.simplelightbox', function () {
          });
          galleryShow.refresh();

          form.reset();
        })
      }
    })

    .catch((err) => {
      console.log(err)
    })
}











