const rootElement = document.querySelector("#root");

const createElement = (
  tagName,
  { classes, data = {}, ...attributes } = {},
  appendTo = null
) => {
  const element = document.createElement(tagName);

  if (typeof classes === "string") {
    element.classList.add(classes);
  } else if (Array.isArray(classes)) {
    element.classList.add(...classes.filter((className) => className));
  }

  Object.entries(data).forEach(([name, value]) => {
    element.dataset[name] = value;
  });

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  if (appendTo) {
    appendTo.appendChild(element);
  }

  return element;
};

const renderTabs = (tabs, labelledbyId, parent) => {
  const containerElement = createElement("div", { classes: "tab" }, parent);

  const tabsElement = createElement(
    "div",
    {
      classes: "tab__tabs",
      role: "tablist",
      "aria-labelledby": labelledbyId,
    },
    containerElement
  );

  const handleOnClickTabs = (event) => {
    const selectedTabItem = event.target.closest(".tab_tabs-item");

    if (selectedTabItem) {
      const currentTabItem = tabsElement.querySelector("[aria-selected=true]");
      currentTabItem.ariaSelected = false;

      selectedTabItem.ariaSelected = true;

      const currentTabPanel = containerElement.querySelector(
        '[data-tab-panel-selected="true"]'
      );
      currentTabPanel.dataset.tabPanelSelected = false;
      currentTabPanel.classList.add("visually-hidden");

      const selectedTabPanel = containerElement.querySelector(
        `[aria-labelledby=${selectedTabItem.id}]`
      );
      selectedTabPanel.dataset.tabPanelSelected = true;
      selectedTabPanel.classList.remove("visually-hidden");
    }
  };

  tabsElement.addEventListener("click", handleOnClickTabs);

  createElement("span", { classes: "tab__tabs-bar" }, tabsElement);

  tabs.forEach((tab, index) => {
    const isFirsTab = !index;

    const tabsItem = createElement(
      "button",
      {
        classes: "tab_tabs-item",
        type: "button",
        role: "tab",
        "aria-selected": isFirsTab ? "true" : "false",
        "aria-controls": `${tab.id}-tab-panel`,
        id: `${tab.id}-tab-item`,
      },
      tabsElement
    );
    tabsItem.textContent = tab.name;
  });

  tabs.forEach((tab, index) => {
    const isFirsTab = !index;

    const tabPanel = createElement(
      "div",
      {
        role: "tabpanel",
        "aria-labelledby": `${tab.id}-tab-item`,
        id: `${tab.id}-tab-panel`,
        classes: [
          "grid-auto",
          "grid-auto--500",
          "tab__panel",
          !isFirsTab && "visually-hidden",
        ],
        data: { tabPanelSelected: isFirsTab },
      },
      containerElement
    );

    tab.panelChildren.forEach((panelChild) => {
      tabPanel.appendChild(panelChild);

      if (!isFirsTab) {
        panelChild.querySelectorAll("img").forEach((childImage) => {
          childImage.setAttribute("loading", "lazy");
        });
      }
    });
  });
};

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

export const renderPromotions = (allPromotions, newCustomersPromotions) => {
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

export const renderError = () => {
  const containerElement = createElement(
    "div",
    { classes: ["centered", "pt--600"] },
    rootElement
  );
  containerElement.innerHTML = `
    <h1 class="h6">Error</h1>
    <p>There was an error, please try again later.</p>
  `;
};

export const renderLoadingBar = () => {
  const containerElement = createElement(
    "div",
    { classes: ["centered", "pt--600", "loading-bar"] },
    rootElement
  );
  containerElement.innerHTML = `
    <p>Loading...</p>
  `;
};

export const removeLoadingBar = () => {
  rootElement.querySelectorAll(".loading-bar").forEach((loadingBar) => {
    loadingBar.remove();
  });
};
