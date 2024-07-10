import{S as u,i as p}from"./assets/vendor-96ed78f5.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const g=document.querySelector(".gallery");function y(o,r,a,n,e,t,s){const l=`<li class="gallery-item">
      <a class="gallery-link" href="${r}">
      <img src="${o}" alt="${a}" class="gallery-img">
      </a>
        <div class="text-wrap">
          <p class="img-text">Likes <span class="img-text-span">${n}</span></p>
          <p class="img-text">Views <span class="img-text-span">${e}</span></p>
          <p class="img-text">Comments <span class="img-text-span">${t}</span></p>
          <p class="img-text">Downloads <span class="img-text-span">${s}</span></p>
        </div>
    </li>`;g.insertAdjacentHTML("afterbegin",l);let i=new u(".gallery a",{captions:!0,captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250});i.on("show.simplelightbox",function(){}),i.refresh()}function h(o){return fetch(`https://pixabay.com/api/?key=44806225-40e07737f22f709bd193bb0f7&q=${o}&image_type=photo&orientation=horizontal&safesearch=${!0}`).then(s=>{if(!s.ok)throw new Error("no match item");return s.json()})}const c=document.querySelector(".loader");c.style.opacity=0;const m=document.querySelector(".form");m.addEventListener("submit",d);function d(o){o.preventDefault(),c.style.opacity=1;const a=o.currentTarget.elements.query.value.toLowerCase();if(a.length<=0){p.show({backgroundColor:"#ef4040",messageColor:"#fff",messageSize:"16px",position:"topRight",message:"Please write something in the search field"}),c.style.opacity=0;return}setTimeout(()=>{h(a).then(b).catch(x)},1e3),m.reset()}function b(o){const r=o.hits;o.totalHits===0?p.error({backgroundColor:"#ef4040",messageColor:"#fff",messageSize:"16px",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}):r.map(({webformatURL:n,largeImageURL:e,tags:t,likes:s,views:l,comments:i,downloads:f})=>{y(n,e,t,s,l,i,f)}),c.style.opacity="0"}function x(){p.error({backgroundColor:"#ef4040",messageColor:"#fff",messageSize:"16px",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"})}
//# sourceMappingURL=commonHelpers.js.map
