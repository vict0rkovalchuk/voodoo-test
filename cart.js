let cartItems = [];

if (
  localStorage.getItem('cartProducts') != null &&
  JSON.parse(localStorage.getItem('cartProducts')).length > 0
) {
  cartItems = JSON.parse(localStorage.getItem('cartProducts'));
}

renderToCart(cartItems);

window.addEventListener('click', e => {
  if (e.target.classList.contains('card__button')) {
    openCart();
    let self = e.target;
    let parent = self.closest('.card');
    let cardId = parent.dataset.id;
    let img = parent.querySelector('.card__frame img').getAttribute('src');
    let title = parent.querySelector('.card__descr-name').textContent;
    let priceString = parent.querySelector('.card__descr-price').dataset.price;
    setToLocalStorage(cardId, img, title, priceString);
    renderToCart(cartItems);
  }
  if (e.target.classList.contains('sidenav__item-delete-icon')) {
    let productId = e.target.dataset.id;
    deleteFromLocalStorage(productId);
  }
});

function setToLocalStorage(id, imageUrl, title, price) {
  let enableInCartQty = cartItems.filter(item => item.id == id).length;

  if (enableInCartQty == 0) {
    cartItems.push({ id, imageUrl, title, price, qty: 1 });
  } else {
    let idQty = cartItems.filter(item => item.id == id)[0].qty;
    let filtered = cartItems.filter(item => item.id != id);
    filtered.push({
      id,
      imageUrl,
      title,
      price,
      qty: 1 + idQty
    });
    cartItems = filtered;
  }

  localStorage.setItem('cartProducts', JSON.stringify(cartItems));
}

function deleteFromLocalStorage(id) {
  let filteredProducts = cartItems.filter(item => item.id != id);
  cartItems = filteredProducts;

  localStorage.setItem('cartProducts', JSON.stringify(filteredProducts));
  renderToCart(filteredProducts);
}

function updateLocalStorage(id, iterator) {
  let modifiedArray = cartItems.map(item => {
    if (item.id == id) {
      return { ...item, qty: item.qty + iterator };
    }
    return item;
  });
  cartItems = modifiedArray;
  localStorage.setItem('cartProducts', JSON.stringify(cartItems));
  renderToCart(cartItems);
}

function renderToCart(products) {
  let cartProductsContainer = document.querySelector('.sidenav__items');
  let totalPriceContainer = document.querySelector('.sidenav__footer-price');
  let totalPrice = 0;
  if (products.length == 0) {
    totalPriceContainer.textContent = '0.00' + ' ' + 'KR.';
    cartProductsContainer.innerText = 'Add something to the cart';
    return;
  }
  let productsHTML = '';
  products.forEach(({ price, qty, id, imageUrl, title }) => {
    totalPrice += Number(price) * qty;
    productsHTML += `
    <div class="sidenav__item flex justify-between h-[74px]" data-id='${id}'>
    <div class="sidenav__item-info flex gap-[18px]">
      <div
        class="sidenav__item-img w-[74px] rounded border-[1px] border-solid border-white border-opacity-50 flex justify-center"
      >
        <img
          class="h-full object-cover rounded"
          src="${imageUrl}"
          alt="cart-item"
        />
      </div>
      <div
        class="sidenav__item-info-wrapper flex flex-col justify-between text-sm font-bold"
      >
        <div class="sidenav__item-title">${title}</div>
        <div class="sidenav__item-price">${price} KR.</div>
        <div class="sidenav__item-counter h-[20px] flex">
          <button
            class="sidenav__item-counter-minus h-[20px] w-[20px] flex justify-center items-center ${
              qty == 1 && 'cursor-not-allowed opacity-30'
            }" 
            onClick="updateLocalStorage(${id}, -1)"
            ${qty == 1 && 'disabled'}
          >
            -
          </button>
          <div
            class="sidenav__item-number h-[20px] w-[20px] flex justify-center items-center" data-id='${id}'
          >
            ${qty}
          </div>
          <button
            class="sidenav__item-counter-plus h-[20px] w-[20px] flex justify-center items-center" 
            onClick="updateLocalStorage(${id}, 1)"
          >
            +
          </button>
        </div>
      </div>
    </div>
    <div class="sidenav__item-delete cursor-pointer" data-id='${id}'>
      <img class="sidenav__item-delete-icon" src="./icons/delete.svg" alt="delete icon" data-id='${id}' />
    </div>
  </div>
    `;
  });

  totalPriceContainer.textContent = totalPrice.toFixed(2) + ' ' + 'KR.';
  cartProductsContainer.innerHTML = productsHTML;
}
