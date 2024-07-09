import{i,S as h}from"./assets/vendor-f33cd494.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const y=document.querySelector(".form");document.querySelector(".btn");document.querySelector(".input");const b=document.querySelector(".gallery"),S="44806225-40e07737f22f709bd193bb0f7",w=`https://pixabay.com/api/?key=${S}`,$="photo",L="horizontal",v=!0;function x(s){return fetch(`${w}&q=${s}&image_type=${$}&orientation=${L}&safesearch=${v}`).then(o=>{if(!o.ok)throw new Error("no match item");return o.json()})}y.addEventListener("submit",q);function q(s){s.preventDefault();const n=s.currentTarget.elements.query.value.toLowerCase();n.length<=0&&i.show({backgroundColor:"#ef4040",messageColor:"#fff",messageSize:"16px",position:"topRight",message:"Please write something in the search field"}),x(n).then(r=>{const e=r.hits;r.totalHits===0?i.error({backgroundColor:"#ef4040",messageColor:"#fff",messageSize:"16px",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}):(e.map(({webformatURL:c,largeImageURL:l,tags:p,likes:u,views:f,comments:m,downloads:g})=>{const d=`
    <li class="gallery-item">
      <a class="gallery-link" href="${l}"></a>
      <div class="overlay">
        <img src="${c}" alt="${p}" class="gallery-img">
        <div class="text-wrap">
          <p class="img-text">Likes: <span>${u}</span></p>
          <p class="img-text">Views: <span>${f}</span></p>
          <p class="img-text">Comments: <span>${m}</span></p>
          <p class="img-text">Downloads: <span>${g}</span></p>
        </div>
      </div>
    </li>`;b.insertAdjacentHTML("afterbegin",d)}),new h(".gallery a",{captions:!0,captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250}).on("show.simplelightbox",function(){}))}).catch(r=>{console.log(r)})}
//# sourceMappingURL=commonHelpers.js.map
