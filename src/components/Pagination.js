import {
  state,
  paginationEl,
  paginationBtnBackEl,
  paginationBtnNextEl,
  paginationNumberBackEl,
  paginationNumberNextEl,
  ITEM_SIZE_PER_PAGE,
  jobListSearchEl,
} from "../common.js";

import { jobHTML } from "./JobHTMLs.js";

export const renderPagingBtn = () => {
  if (state.currentPage > 1) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
  }

  if (state.searchItems.length - state.currentPage * ITEM_SIZE_PER_PAGE <= 0) {
    paginationBtnNextEl.classList.add("pagination__button--hidden");
  } else {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
  }

  // change Next & Back buttons number
  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;

  paginationBtnNextEl.blur();
  paginationBtnBackEl.blur();
};

const pagingHandler = (event) => {
  const clickedButtonEL = event.target.closest(".pagination__button");
  if (!clickedButtonEL) return;

  const nextButton = clickedButtonEL.className.includes("--next");

  nextButton ? state.currentPage++ : state.currentPage--;

  renderPagingBtn();

  jobHTML('jobItems');
};

paginationEl.addEventListener("click", pagingHandler);

export default renderPagingBtn;
