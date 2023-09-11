// Product Cards
let apiURL = `https://voodoo-sandbox.myshopify.com/products.json?limit=24`;
let productsData = [];

window.addEventListener('click', e => {
  if (e.target.classList.contains('onNumber')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderCards();
  }
});

async function renderCards() {
  await getData();

  let productsHTML = '';

  productsData.forEach(({ id, images, title, variants }) => {
    productsHTML += `
    <div class="card" data-id="${id}">
    <div
      class="card__frame p-3 rounded border-[1px] border-solid border-black h-[300px] relative flex justify-center"
    >
      <div
        class="card__frame-badge inline p-2 rounded bg-black text-[#FCF7E6] text-xs font-normal uppercase absolute -left-[-12px] z-10"
      >
        used
      </div>
      <img
        class="h-full object-cover rounded hover:scale-105 transition-all duration-[0.35s] cursor-pointer"
        src="${
          images.length > 0
            ? images[0].src
            : 'https://www.researchgate.net/publication/353422038/figure/fig2/AS:1048906112700416@1627090113328/Image-7-4-3-2-5-9-3-11-45-3-0-2-4-0-1-7.ppm'
        }"
        alt="${title}"
      />
    </div>
    <div
      class="card__descr mt-3 flex justify-between text-sm leading-normal"
    >
      <div class="card__descr-info font-bold">
        <div class="card__descr-name">${
          title.length > 20 ? title.slice(0, 20) + '...' : title
        }</div>
        <div class="card__descr-price" data-price="${variants[0].price}">${
      variants[0].price
    } KR.</div>
      </div>
      <div class="card__descr-text flex flex-col items-end">
        <div class="card__descr-condition font-medium">Condition</div>
        <div class="card__descr-fact font-normal">Slightly used</div>
      </div>
    </div>
    <div class="card__btn mt-3">
      <button
        class="card__button p-4 rounded bg-black text-white text-sm font-bold leading-normal w-full hover:scale-105 transition-all duration-[0.35s]"
      >
        Add to cart
      </button>
    </div>
  </div>
    `;
  });

  document.querySelector('.cards').innerHTML = productsHTML;
}
renderCards();

async function getData() {
  const response = await fetch(apiURL);
  const products = await response.json();
  productsData = products.products;
}
