import renderTabs from "./renderTabs";
import { createElement, rootElement } from "./common";

const createPromotionsCards = (promotions) => {
  const maxPromotionsOnScreen = 6;

  return promotions.map((promotion, index) => {
    const cardElement = createElement("article", { classes: "card" });
    cardElement.innerHTML = `
      <img
        src="${promotion.heroImageUrl}"
        alt="${promotion.name}"
        title="${promotion.name}"
        class="card__media"
        width="570"
        height="285"
        ${index > maxPromotionsOnScreen - 1 ? 'loading="lazy"' : ""}
      />
      <div class="card__content">
        <h2 class="h6 pb--300">${promotion.name}</h2>
        <p>${promotion.description}</p>
        <div class="card__actions">
          <a class="button button--info" href="#join-now">${
            promotion.joinNowButtonText
          }</a>
          <a class="button button--outlined" href="#terms-conditions"
            >${promotion.termsAndConditionsButtonText}</a
          >
        </div>
      </div>
    `;

    return cardElement;
  });
};

const renderPromotions = (allPromotions, newCustomersPromotions) => {
  const containerElement = createElement(
    "main",
    { classes: ["container", "container--xl", "pt--600", "pb--700"] },
    rootElement
  );

  const headingElement = createElement(
    "h1",
    { classes: "h3", id: "promotions-title" },
    containerElement
  );
  headingElement.textContent = "Promotions";

  const tabs = [
    {
      id: "all-promotions",
      name: "All promotions",
      panelChildren: createPromotionsCards(allPromotions),
    },
    {
      id: "new-customers",
      name: "New customers",
      panelChildren: createPromotionsCards(newCustomersPromotions),
    },
  ];
  renderTabs(tabs, headingElement.id, containerElement);
};

export default renderPromotions;
