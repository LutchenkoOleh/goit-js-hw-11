// import { createLogger } from "vite";

export function searchImg(query) {

  const API_KEY = '44806225-40e07737f22f709bd193bb0f7';
  const URL = `https://pixabay.com/api/?key=${API_KEY}`;
  const imageType = 'photo';
  const orientation = 'horizontal';
  const safeSearch = true;
  return fetch(`${URL}&q=${query}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('no match item')
      }
      return res.json()
    })
}
