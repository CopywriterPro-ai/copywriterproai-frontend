// import dynamic from "next/dynamic";

// import isServer from "./isServer";

// const Quill = dynamic(() => import("quill"), { ssr: false });

export const textExcerpt = (text, maxLength = null) => {
  const trimmed = text.trim();
  if (maxLength) {
    const hasMore = trimmed.length > maxLength;
    const subString = trimmed.substr(0, maxLength);
    return { text: `${subString}${hasMore ? "..." : ""}`, hasMore };
  } else {
    return { text: trimmed, hasMore: false };
  }
};

export const htmlToPlainText = (html, maxLength) => {
  if (!isServer) {
    const tempDivElement = document.createElement("div");
    tempDivElement.innerHTML = html;
    const plaintext =
      tempDivElement.textContent || tempDivElement.innerText || "";
    return textExcerpt(plaintext, maxLength);
  }
  return null;
};

export const deltaToPlainText = (delta = [], maxLength = null) => {
  let deltaArr = null;

  if (typeof delta === "string") {
    return textExcerpt(delta, maxLength);
  } else if (typeof delta === "object") deltaArr = delta;

  let plaintext = "";

  for (let i = 0; i < deltaArr.length; i++) {
    let op = deltaArr[i];
    if (op.insert) {
      if (typeof op.insert === "string") {
        plaintext += op.insert;
      } else {
        plaintext += " ";
      }
    }
  }
  return textExcerpt(plaintext, maxLength);
};

// export const deltaToHTML = (inputDelta) => {
//   if (!isServer) {
//     const tempCont = document.createElement("div");
//     new Quill(tempCont).setContents(inputDelta);
//     return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
//   }
//   return null;
// };
