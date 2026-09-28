import { jobDetailsContentEl, BASE_API_URL, state } from "../common.js";
import { renderSpinner } from "./Spinner.js";

import { fetchIt } from "./FetchIt.js";

const routerHandler = async () => {
  const id = location.hash.substring(1);

  if (!id) return;
  jobDetailsContentEl.innerHTML = "";
  renderSpinner("details", "visible");
  await fetchIt("details", `${BASE_API_URL}/jobs/${id}`);
};

// for use specific URL in search bar ( when document loaded )
routerHandler();

// for window history (back & forward)
window.addEventListener("hashchange", routerHandler);
