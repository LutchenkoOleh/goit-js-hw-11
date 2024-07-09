import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";


const form = document.querySelector('.form');
const searchBtn = document.querySelector('.btn')
const input = document.querySelector('.input')
const container = document.querySelector('.gallery')


const API_KEY = '44806225-40e07737f22f709bd193bb0f7';
const URL = `https://pixabay.com/api/?key=${API_KEY}`;
const imageType = 'photo';
const orientation = 'horizontal';
const safeSearch = true;


function searchImg(query) {


  return fetch(`${URL}&q=${query}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('no match item')
      }
      return res.json()
    })


}

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
          const markup = `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}"></a>
      <div class="overlay">
        <img src="${webformatURL}" alt="${tags}" class="gallery-img">
        <div class="text-wrap">
          <p class="img-text">Likes: <span>${likes}</span></p>
          <p class="img-text">Views: <span>${views}</span></p>
          <p class="img-text">Comments: <span>${comments}</span></p>
          <p class="img-text">Downloads: <span>${downloads}</span></p>
        </div>
      </div>
    </li>`

          container.insertAdjacentHTML('afterbegin', markup);

        })

        let galleryShow = new SimpleLightbox('.gallery a', {
          captions: true,
          captionType: 'attr',
          captionsData: 'alt',
          captionPosition: 'bottom',
          captionDelay: 250,
        });
        galleryShow.on('show.simplelightbox', function () {

        });

      }

    })
    .catch((err) => {
      console.log(err)
    })
}



// function renderImg({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {

//   const markup = `
//   <ul class="list-img">
//    <li class="item">
//     <a class="gallery-link" href="${largeImageURL}">
//     <img src="${webformatURL}" alt="${tags}" class="img-class">
//     <p class="img-text">Likes:${likes}</p>
//     <p class="img-text">Views:${views}</p>
//     <p class="img-text">Comments:${comments}</p>
//     <p class="img-text">Downloads:${downloads}</p>
//    </li>
//   </ul>`

//   container.innerHTML = markup;
// }



