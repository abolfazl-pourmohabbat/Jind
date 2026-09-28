import {
  searchInputEl,
  jobListSearchEl,
  searchFormEl,
  BASE_API_URL,
  state,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  numberEl,
} from "../common.js";

import { renderError } from "./Error.js";
import { renderSpinner } from "./Spinner.js";
import { jobHTML } from "./JobHTMLs.js";
import { fetchIt } from "./FetchIt.js";
import { renderPagingBtn } from "./Pagination.js";

const submitHandler = async (event) => {
  event.preventDefault();
  sortingBtnRecentEl.classList.remove("sorting__button--active");
  sortingBtnRelevantEl.classList.add("sorting__button--active");

  // get input search text
  const searchText = searchInputEl.value;

  // clear job lists element
  jobListSearchEl.innerHTML = "";

  // reset job Details element
  jobHTML("jobDetailsContentEl");

  // Validation
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError("your search may not contain number");
    numberEl.textContent = 0;
    return;
  }

  // removes focus from element
  searchInputEl.blur();

  // show spinner after start search
  renderSpinner("search", "visible");

  // fetch data from server ( api )
  await fetchIt("search", `${BASE_API_URL}/jobs?search=${searchText}`);

  // reset pagination
  state.currentPage = 1;
  renderPagingBtn();
};
searchFormEl.addEventListener("submit", submitHandler);
