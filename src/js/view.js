const rootElement = document.querySelector("#root");

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
