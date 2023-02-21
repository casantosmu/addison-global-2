/* eslint-disable no-console */
import "../css/reset.css";
import "../css/variables.css";
import "../css/base.css";
import "../css/layouts.css";
import "../css/components.css";
import "../css/utils.css";

import {
  fetchAllPromotions,
  getNewCustomersPromotions,
  getAllPromotions,
} from "./data";

(async () => {
  try {
    await fetchAllPromotions();
    const allPromotions = getAllPromotions();
    const newCustomersPromotions = getNewCustomersPromotions();

    console.log("allPromotions", allPromotions);
    console.log("newCustomersPromotions", newCustomersPromotions);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }
})();
