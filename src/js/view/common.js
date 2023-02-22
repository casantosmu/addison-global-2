export const rootElement = document.querySelector("#root");

export const createElement = (
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
