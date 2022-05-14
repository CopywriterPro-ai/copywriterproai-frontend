import isServer from "./isServer";

const convertHTMLtoPlain = (html) => {
  if (!isServer) {
    let div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  } else {
    return html;
  }
};

export default convertHTMLtoPlain;
