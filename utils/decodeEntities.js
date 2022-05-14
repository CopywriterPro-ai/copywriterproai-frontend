import isServer from "./isServer";

const decodeEntities = (() => {
  var element = !isServer && document.createElement("div");

  const decodeHTMLEntities = (str) => {
    if (!isServer && str && typeof str === "string") {
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = "";
    }
    return str;
  };
  return decodeHTMLEntities;
})();

export default decodeEntities;
