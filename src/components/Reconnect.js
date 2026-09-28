import { DEFAULT_SLEEP_TIME } from "../common.js";
import { renderError } from "./Error.js";

// delay function
const Sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// check api every 10 second when disconnected
export const isNotOk = async (func, spinnerName, URL, errMessage) => {
  renderError(errMessage);
  await Sleep(DEFAULT_SLEEP_TIME);
  func(spinnerName, URL);
};

export default isNotOk;
