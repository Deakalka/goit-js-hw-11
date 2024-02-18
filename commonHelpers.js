import{i as l,S as c}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const s={formEl:document.querySelector(".js-search-form"),imgEl:document.querySelector(".js-image-container"),loader:document.querySelector(".loader")};function m(){s.loader.classList.remove("hidden")}function u(){s.loader.classList.add("hidden")}s.formEl.addEventListener("submit",d);function d(t){t.preventDefault();const r=t.target.elements.text.value.trim();if(!r){l.warning({position:"topRight",message:"Please enter a search query."});return}m(),f(r).then(n=>{n.hits.length===0?l.warning({position:"topRight",message:"Unfortunately, no images were found matching your query. Please try again!"}):y(n)}).catch(n=>{l.error({position:"topRight",message:"An error occurred while loading images. Please try again later."})}).finally(()=>{u()})}function f(t){const r="https://pixabay.com/api/",n=new URLSearchParams({key:"42435331-5518aafb74583ec5494003d9b",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0}),i=`${r}?${n.toString()}`;return fetch(i).then(e=>e.json())}function g(t){return`
    <div class="photo-container">
        <a class="gallery-link" href="${t.largeImageURL}" data-lightbox="image">
            <img src="${t.webformatURL}" alt="${t.tags}" class="photo" />
        </a>
        
        <div class="photo-body">
            <p class="photo-name">Likes ${t.likes}</p>
            <p class="photo-name">Views ${t.views}</p>
            <p class="photo-name">Comments ${t.comments}</p>
            <p class="photo-name">Downloads ${t.downloads}</p>
        </div>
    </div>
    `}const p={captionsData:"alt",captionDelay:250};let h=new c(".gallery-link",p);function y(t){const r=t.hits.map(n=>g(n)).join("");s.imgEl.innerHTML=r,h.refresh()}
//# sourceMappingURL=commonHelpers.js.map
