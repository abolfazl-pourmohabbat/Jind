import { errorTextEl, errorEl, DEFAULT_DISPLAY_TIME } from "../common.js";

export const renderError = (message = `something went wrong ----contact support`) => {
  errorTextEl.textContent = message;
  errorEl.classList.add("error--visible");
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, DEFAULT_DISPLAY_TIME);
};

export default renderError;
