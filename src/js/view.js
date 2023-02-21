const rootElement = document.querySelector("#root");

const renderTabElement = (tabs, parentElement, labelledbyId) => {
  const tabElement = document.createElement("div");
  tabElement.classList.add("tab");

  const tabsElement = document.createElement("div");
  tabsElement.classList.add("tab__tabs");
  tabsElement.setAttribute("role", "tablist");
  tabsElement.setAttribute("aria-labelledby", labelledbyId);

  tabElement.appendChild(tabsElement);

  tabs.forEach((tab, index) => {
    const tabItem = document.createElement("button");
    tabItem.classList.add("tab_tabs-item");
    tabItem.type = "button";
    tabItem.setAttribute("role", "tab");
    tabItem.setAttribute("aria-selected", index ? "false" : "true");
    tabItem.setAttribute("aria-controls", `${tab.id}-tab-panel`);
    tabItem.id = `${tab.id}-tab-item`;
    tabItem.textContent = tab.name;

    tabsElement.appendChild(tabItem);
  });

  const tabsBar = document.createElement("span");
  tabsBar.classList.add("tab__tabs-bar");

  tabsElement.appendChild(tabsBar);

  tabs.forEach((tab, index) => {
    const tabPanel = document.createElement("div");
    tabPanel.setAttribute("role", "tabpanel");
    tabPanel.id = `${tab.id}-tab-panel`;
    tabPanel.setAttribute("aria-labelledby", `${tab.id}-tab-item`);
    tabPanel.classList.add(
      "grid-auto",
      "grid-auto--500",
      "tab__panel",
      index ? "visually-hidden" : "js-tab-panel-selected"
    );

    tabElement.appendChild(tabPanel);

    tab.panelChildren.forEach((panelChildren) => {
      tabPanel.appendChild(panelChildren);
    });
  });

  parentElement.appendChild(tabElement);
};

const createPromotionsCards = (promotions) => {
  const maxPromotionsOnScreen = 6;

  return promotions.map((promotion, index) => {
    const cardElement = document.createElement("article");
    cardElement.classList.add("card");
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

export const renderPromotions = (allPromotions, newCustomersPromotions) => {
  const containerElement = document.createElement("main");
  containerElement.classList.add(
    "container",
    "container--xl",
    "pt--600",
    "pb--700"
  );

  rootElement.appendChild(containerElement);

  const headingElement = document.createElement("h1");
  headingElement.classList.add("h3");
  headingElement.id = "promotions-title";
  headingElement.textContent = "Promotions";

  containerElement.appendChild(headingElement);

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
  renderTabElement(tabs, containerElement, headingElement.id);
};

export const renderError = () => {
  const containerElement = document.createElement("div");
  containerElement.classList.add("centered", "pt--600");
  containerElement.innerHTML = `
    <h1 class="h6">Error</h1>
    <p>There was an error, please try again later.</p>
  `;

  rootElement.appendChild(containerElement);
};

const loadingBarSelector = "js-loading-bar";

export const renderLoadingBar = () => {
  const containerElement = document.createElement("div");
  containerElement.classList.add("centered", "pt--600", loadingBarSelector);
  containerElement.innerHTML = "<p>Loading...</p>";

  rootElement.appendChild(containerElement);
};

export const removeLoadingBar = () => {
  rootElement
    .querySelectorAll(`.${loadingBarSelector}`)
    .forEach((loadingBar) => loadingBar.remove());
};
