// Pagination
const ul = document.querySelector('ul.page');
let allPages = Math.ceil(461 / 24);

function elem(allPages, page) {
  let li = '';

  let beforePages = page - 1;
  let afterPages = page + 2;
  let liActive;

  if (page > 2) {
    li += `<li
    class="page__numbers onNumber flex justify-center items-center cursor-pointer w-[30px] h-[30px] sm:w-[39px] sm:h-[39px] rounded-[50%] border-[1px] border-solid border-black text-[#1e1e1e] font-light leading-normal" onClick='elem(allPages, 1)'
  >
    1
  </li>`;
    if (page > 3) {
      li += `<li
    class="page__numbers flex justify-center items-center cursor-pointer w-[30px] h-[30px] sm:w-[39px] sm:h-[39px] rounded-[50%] border-[1px] border-solid border-black text-[#1e1e1e] font-light leading-normal"
  >
    ...
  </li>`;
    }
  }

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
    if (pageLength > allPages) {
      continue;
    }
    if (pageLength == 0) {
      pageLength = pageLength + 1;
    }

    if (page == pageLength) {
      liActive = true;
    } else {
      liActive = false;
    }

    li += `<li
    class="page__numbers onNumber flex justify-center items-center cursor-pointer w-[30px] h-[30px] sm:w-[39px] sm:h-[39px] rounded-[50%] ${
      liActive
        ? 'active bg-[#1E1E1E] text-white text-sm font-light leading-normal'
        : 'border-[1px] border-solid border-black text-[#1e1e1e] font-light leading-normal'
    }" onClick='elem(allPages, ${pageLength})'
  >
    ${pageLength}
  </li>`;
  }

  if (page < allPages - 1) {
    if (page < allPages - 2) {
      li += `<li
    class="page__numbers flex justify-center items-center cursor-pointer w-[30px] h-[30px] sm:w-[39px] sm:h-[39px] rounded-[50%] border-[1px] border-solid border-black text-[#1e1e1e] font-light leading-normal"
  >
    ...
  </li>`;
    }
    li += `<li
    class="page__numbers onNumber flex justify-center items-center cursor-pointer w-[30px] h-[30px] sm:w-[39px] sm:h-[39px] rounded-[50%] border-[1px] border-solid border-black text-[#1e1e1e] font-light leading-normal" onClick='elem(allPages, ${allPages})'
  >
    ${allPages}
  </li>`;
  }

  ul.innerHTML = li;
}
elem(allPages, 1);
