import {
  fetchAllPromotions,
  getNewCustomersPromotions,
  getAllPromotions,
} from "./data";
import { renderError, renderLoadingBar, removeLoadingBar } from "./view/common";
import renderPromotions from "./view/renderPromotions";

(async () => {
  try {
    renderLoadingBar();

    await fetchAllPromotions();
    const allPromotions = getAllPromotions();
    const newCustomersPromotions = getNewCustomersPromotions();

    renderPromotions(allPromotions, newCustomersPromotions);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    renderError();
  } finally {
    removeLoadingBar();
  }
})();
