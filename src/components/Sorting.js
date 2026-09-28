import {
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  sortingEl,
  state,
} from "../common.js";

import { jobHTML } from "./JobHTMLs.js";
import { renderPagingBtn } from "./Pagination.js";

const clickHandler = (event) => {
  state.currentPage = 1;
  renderPagingBtn();
  
  // Separating Recent & Relevant buttons from other elements
  const clickedButtonEL = event.target.closest(".sorting__button");
  if (!clickedButtonEL) return;

  const recent = clickedButtonEL.className.includes("--recent");

  sortingBtnRecentEl.classList.toggle("sorting__button--active", recent);
  sortingBtnRelevantEl.classList.toggle("sorting__button--active", !recent);

  state.searchItems.sort((a, b) =>
    recent ? a.daysAgo - b.daysAgo : b.relevanceScore - a.relevanceScore,
  );
  jobHTML('jobItems');
};

sortingEl.addEventListener("click", clickHandler);
