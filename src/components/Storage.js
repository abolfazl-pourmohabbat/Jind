import { state } from "../common.js";

const storageBookmarkItems = localStorage.getItem("bookmarkJobItems");
if (storageBookmarkItems) {
  state.bookmarkJobItems = JSON.parse(storageBookmarkItems);
}
