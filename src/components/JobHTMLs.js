import {
  jobListSearchEl,
  jobDetailsContentEl,
  state,
  ITEM_SIZE_PER_PAGE,
  jobListBookmarksEl,
} from "../common.js";
import { renderSpinner } from "./Spinner.js";

export const jobHTML = (main) => {
  switch (main) {
    case "jobDetailsContentEl":
      jobDetailsContentEl.innerHTML = `
            <div class="job-details__start-view">
              <p class="job-details__start-text job-details__start-text--big">
                What are you looking for?
              </p>
              <p class="job-details__start-text job-details__start-text">
                Start by searching for any technology your ideal job is working
                with
              </p>
            </div>`;

      renderSpinner("details", "invisible");
      break;

    case "bookmarkJobItems":
    case "jobItems":
      const jobListEl =
        main === "jobItems" ? jobListSearchEl : jobListBookmarksEl;

      let jobItems;
      if (main === "jobItems") {
        jobItems = state.searchItems.slice(
          state.currentPage * ITEM_SIZE_PER_PAGE - ITEM_SIZE_PER_PAGE,
          state.currentPage * ITEM_SIZE_PER_PAGE,
        );
      } else {
        jobItems = state.bookmarkJobItems;
      }

      jobListEl.innerHTML = "";

      jobItems.forEach((jobItem) => {
        const jobItemHTML = `
            <li class="job-item ${state.detailsActiveItem.id === jobItem.id ? "job-item--active" : " "} ">
                        <a class="job-item__link" href="${jobItem.id}">
                            <div class="job-item__badge">${jobItem.badgeLetters}</div>
                            <div class="job-item__middle">
                                <h3 class="third-heading">${jobItem.title}</h3>
                                <p class="job-item__company">${jobItem.company}</p>
                                <div class="job-item__extras">
                                    <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}</p>
                                    <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}</p>
                                    <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItem.location}</p>
                                </div>
                            </div>
                            <div class="job-item__right">
                                <i class="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarkJobItems.some((b) => b.id === jobItem.id) && "job-item__bookmark-icon--bookmarked"}"></i>
                                <time class="job-item__time">${jobItem.daysAgo}d</time>
                            </div>
                        </a>
                    </li>
            `;

        jobListEl.insertAdjacentHTML("beforeend", jobItemHTML);
        renderSpinner("search", "invisible");
      });
      break;

    case "jobItem":
      const detail = `
        
<img src="/img/cover-img.webp" alt="#" class="job-details__cover-img">

<a class="apply-btn" href="${state.detailsActiveItem.companyURL}" target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>

<section class="job-info">
    <div class="job-info__left">
        <div class="job-info__badge">${state.detailsActiveItem.badgeLetters}</div>
        <div class="job-info__below-badge">
            <time class="job-info__time">${state.detailsActiveItem.daysAgo}d</time>
            <button class="job-info__bookmark-btn">
                <i class="fa-solid fa-bookmark job-info__bookmark-icon ${state.bookmarkJobItems.some((b) => b.id === state.detailsActiveItem.id) && "job-info__bookmark-icon--bookmarked"}"></i>
            </button>
        </div>
    </div>
    <div class="job-info__right">
        <h2 class="second-heading">${state.detailsActiveItem.title}</h2>
        <p class="job-info__company">${state.detailsActiveItem.company}</p>
        <p class="job-info__description">${state.detailsActiveItem.description}</p>
        <div class="job-info__extras">
            <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i>${state.detailsActiveItem.duration}</p>
            <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i>${state.detailsActiveItem.salary}</p>
            <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i>${state.detailsActiveItem.location}</p>
        </div>
    </div>
</section>

<div class="job-details__other">
    <section class="qualifications">
        <div class="qualifications__left">
            <h4 class="fourth-heading">Qualifications</h4>
            <p class="qualifications__sub-text">Other qualifications may apply</p>
        </div>
        <ul class="qualifications__list">
        ${state.detailsActiveItem.qualifications.map((qualification) => `<li class="qualifications__item">${qualification}</li>`).join("")}
        </ul>
    </section>

    <section class="reviews">
        <div class="reviews__left">
            <h4 class="fourth-heading">Company reviews</h4>
            <p class="reviews__sub-text">Recent things people are saying</p>
        </div>
        <ul class="reviews__list">
        ${state.detailsActiveItem.reviews.map((review) => `<li class="reviews__item">${review}</li>`).join("")}
        </ul>
    </section>
</div>

<footer class="job-details__footer">
    <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">Jind</span>, we would really appreciate it!</p>
</footer>
        `;
      jobDetailsContentEl.innerHTML = detail;
      renderSpinner("details", "invisible");
      break;

    default:
      break;
  }
};

export default jobHTML;
