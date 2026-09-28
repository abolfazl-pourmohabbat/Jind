import { numberEl, state, jobListSearchEl } from "../common.js";
import { isNotOk } from "./Reconnect.js";
import { renderSpinner } from "./Spinner.js";
import { jobHTML } from "./JobHTMLs.js";

export const fetchIt = async (spinnerName, URL) => {
  try {
    renderSpinner(spinnerName, "visible");
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("check your internet or contact support");
    }
    const data = await response.json();
    switch (spinnerName) {
      case "search":
        const { jobItems } = data;
        state.searchItems = jobItems;
        jobHTML('jobItems');
        numberEl.textContent = jobItems.length;
        break;

      case "details":
        const { jobItem } = data;
        state.detailsActiveItem = jobItem;
        jobHTML('jobItem');
        break;

      default:
        break;
    }
  } catch (error) {
    if (error.message === "check your internet or contact support") {
      console.log(
        "maybe you did wrong! hint: check after main domain ( after '/' character )",
      );
      renderSpinner(spinnerName, "invisible");
      isNotOk(fetchIt, spinnerName, URL, error.message);
    } else {
      console.log("check main domain | check codes & syntax");
      renderSpinner(spinnerName, "invisible");
      isNotOk(fetchIt, spinnerName, URL);
    }
  }
};

export default fetchIt;
