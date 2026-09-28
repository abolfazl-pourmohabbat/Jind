import {
  jobListSearchEl,
  jobDetailsContentEl,
  BASE_API_URL,
  jobListBookmarksEl,
} from "../common.js";

import { renderSpinner } from "./Spinner.js";
import { fetchIt } from "./FetchIt.js";

const clickHandler = async (event) => {
  event.preventDefault();

  // reset active class from jobList items
  const activeItems = jobListSearchEl.querySelectorAll(".job-item--active");
  // ( ? => if not null ... )
  activeItems?.forEach((item) => {
    item.classList.remove("job-item--active");
  });

  // add focus with 'job-item--active' class in index.css
  const jobItemEL = event.target.closest(".job-item");
  jobItemEL.classList.add("job-item--active");

  // clear job Details element
  jobDetailsContentEl.innerHTML = "";

  // show spinner after click on a jobItem
  renderSpinner("details", "visible");

  const jobId = jobItemEL.children[0].getAttribute("href");

  // Update URL
  history.pushState(null, "", `/#${jobId}`);

  // fetch data from server ( api )
  await fetchIt("details", `${BASE_API_URL}/jobs/${jobId}`);
};

jobListSearchEl.addEventListener("click", clickHandler);
jobListBookmarksEl.addEventListener("click", clickHandler);
