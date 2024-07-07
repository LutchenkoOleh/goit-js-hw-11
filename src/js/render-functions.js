import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";


const form = document.querySelector('.form');
const searchBtn = document.querySelector('.btn')
const input = document.querySelector('.input')
const container = document.querySelector('.gallery')


function searchImg(query) {

  const API_KEY = '44806225-40e07737f22f709bd193bb0f7';
  const URL = `https://pixabay.com/api/?key=${API_KEY}`;
  const imageType = 'photo';
  const orientation = 'horizontal';
  const safeSearch = true;

  return fetch(`${URL}&q=${query}%image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}`)
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
    .then(renderImg)
    .catch(onFetchError)

}

function onFetchError(error) {
  iziToast.error({
    backgroundColor: '#ef4040',
    messageColor: '#fff',
    messageSize: '16px',
    position: 'topRight',
    message: 'Sorry, there are no images matching your search query. Please try again!'
  })
}

function renderImg({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  searchImg()
    .then(data => console.log(data.hits))
    .catch(err => console.error(err))

  const markup = `
  <li class="item">
  <a class="gallery-link" href="${largeImageURL}">
   <img src="${webformatURL}" alt="${tags}" class="img-class">
   <p class="img-text">Likes:${likes}</p>
   <p class="img-text">Views:${views}</p>
   <p class="img-text">Comments:${comments}</p>
   <p class="img-text">Downloads:${downloads}</p>
  </li>`

  container.innerHTML = markup;
}

// function createMarkup(hits) {
//   return hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
//     `
//   <li class="item">
//   <a class="gallery-link" href="${largeImageURL}">
//    <img src="${webformatURL}" alt="${tags}" class="img-class">
//    <p class="img-text">Likes:${likes}</p>
//    <p class="img-text">Views:${views}</p>
//    <p class="img-text">Comments:${comments}</p>
//    <p class="img-text">Downloads:${downloads}</p>
//   </li>`).join("")
// }




// searchBtn.addEventListener('submit', handlerFormSubmit)

// form.addEventListener('submit', handlerFormSubmit)

// function handlerFormSubmit(e) {
//   e.preventDefault();

//   const formTarget = e.currentTarget;
//   const queryValue = formTarget.elements.query.value.toLowerCase();



//   const API_KEY = '44806225-40e07737f22f709bd193bb0f7';
//   const URL = `https://pixabay.com/api/?key=${API_KEY}`;
//   const q = queryValue;
//   const imageType = 'photo';
//   const orientation = 'horizontal';
//   const safeSearch = true;

//   const apiUrl = `${URL}&q=${q}%image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}`;


//   function getObject(query) {
//     return fetch(apiUrl)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(res.status)
//         }

//         return res.json
//       })
//   }

//   getObject(queryValue)
//     .then(data => {
//       if (data = []) {
//         iziToast.error({
//           backgroundColor: '#ef4040',
//           messageColor: '#fff',
//           messageSize: '16px',
//           position: 'topRight',
//           message: 'Sorry, there are no images matching your search query. Please try again!'
//         })
//       } else {
//         console.log(data.hits);
//       }
//     })
//     .catch(err => console.error(err))
// }