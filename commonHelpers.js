import{i as c,S as d}from"./assets/vendor-46aac873.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const s={formEl:document.querySelector(".js-search-form"),imgEl:document.querySelector(".js-image-container"),loader:document.querySelector(".loader")};function m(){s.loader.classList.remove("hidden")}function u(){s.loader.classList.add("hidden")}s.formEl.addEventListener("submit",f);function f(t){t.preventDefault(),m();const n=t.target.elements.text.value;g(n).then(r=>{if(l(r),r.hits.length===0)throw new Error("No images found");l(r),t.target.elements.text.value=""}).catch(r=>{c.error({position:"topRight",message:"An error occurred while loading images. Please try again later."})}).finally(()=>{u()})}function g(t){const n="https://pixabay.com/api/",r=new URLSearchParams({key:"42120259-494341598d0c2875f9db82d6d",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0}),i=`${n}?${r.toString()}`;return fetch(i).then(e=>e.json())}function p(t){return`
  <div class="photo-container">
     <a class="gallery-link" href="${t.largeImageURL}" data-lightbox="image">  <img
      src="${t.webformatURL}"
      alt="${t.tags}"
      class="photo"
    />  </a>
    
    <div class="photo-body">
    <p class="photo-name">Likes ${t.likes}</p>
    <p class="photo-name">Views ${t.views}</p>
    <p class="photo-name">Comments ${t.comments}</p>
    <p class="photo-name">Downloads ${t.downloads}</p>
  </div>
  </div>
`}const h={captionsData:"alt",captionDelay:250};let y=new d(".gallery-link",h);function l(t){const n=t.hits.map(r=>p(r)).join("");s.imgEl.innerHTML=n,y.refresh()}
//# sourceMappingURL=commonHelpers.js.map
