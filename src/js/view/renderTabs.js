import { createElement } from "./common";

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

  const tabsBar = createElement(
    "span",
    { classes: "tab__tabs-bar" },
    tabsElement
  );

  const tabBarOnChange = (selectedTabItem) => {
    tabsBar.style.width = `${selectedTabItem.offsetWidth}px`;
    tabsBar.style.left = `${selectedTabItem.offsetLeft}px`;
  };

  const handleOnClickTabs = (event) => {
    const selectedTabItem = event.target.closest(".tab_tabs-item");

    if (selectedTabItem) {
      const currentTabItem = tabsElement.querySelector("[aria-selected=true]");
      currentTabItem.ariaSelected = false;

      selectedTabItem.ariaSelected = true;
      tabBarOnChange(selectedTabItem);

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

    if (isFirsTab) {
      tabBarOnChange(tabsItem);
    }
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

export default renderTabs;
