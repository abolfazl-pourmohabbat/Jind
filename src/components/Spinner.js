import { spinnerSearchEl, spinnerJobDetailsEl } from "../common.js";

export const renderSpinner = (whichSpinner = "details", doWhat = "invisible") => {
  let spinnerEl;
  switch (whichSpinner) {
    case "search":
      spinnerEl = spinnerSearchEl;
      break;
    case "details":
      spinnerEl = spinnerJobDetailsEl;
      break;

    default:
      break;
  }
  
  switch (doWhat) {
    case "visible":
      spinnerEl.classList.add("spinner--visible");
      break;
    case "invisible":
      spinnerEl.classList.remove("spinner--visible");
      break;
    case "toggle":
      spinnerEl.classList.toggle("spinner--visible");
      break;

    default:
      break;
  }
};

export default renderSpinner;
