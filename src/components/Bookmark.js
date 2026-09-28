import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";

import { jobHTML } from "./JobHTMLs.js";

const openBookmarkList = () => {
  bookmarksBtnEl.classList.add("bookmarks-btn--active");
  jobListBookmarksEl.classList.add("job-list--visible");

  jobHTML("bookmarkJobItems");
};

const closeBookmarkList = () => {
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");
  jobListBookmarksEl.classList.remove("job-list--visible");
};

const bookmarkButtonHandler = (event) => {
  if (
    state.bookmarkJobItems.some(
      (bookmark) => bookmark.id === state.detailsActiveItem.id,
    )
  ) {
    state.bookmarkJobItems = state.bookmarkJobItems.filter(
      (b) => b.id !== state.detailsActiveItem.id,
    );
  } else {
    state.bookmarkJobItems.push(state.detailsActiveItem);
  }

  // LocalStorage
  localStorage.setItem(
    "bookmarkJobItems",
    JSON.stringify(state.bookmarkJobItems),
  );

  if (!event.target.className.includes("job-info__bookmark-icon")) return;
  jobDetailsEl
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");

  jobHTML("jobItems");
};

bookmarksBtnEl.addEventListener("mouseover", openBookmarkList);
bookmarksBtnEl.addEventListener("mouseout", closeBookmarkList);
jobDetailsEl.addEventListener("click", bookmarkButtonHandler);
