import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Myriad Pro";
  src: url("/fonts/MyriadPro/MyriadPro-SemiboldIt.woff2") format("woff2");
  font-weight: 600;
  font-style: italic;
}

body {
  overflow-x: hidden;
  font-family: "Poppins", sans-serif;
}

.slick-dots {
  li {
    background: #bfbfbf;
    border-radius: 50%;
    button {
      &::before {
        content: none;
        background: red;
      }
    }
  }
  li.slick-active {
    background: #3d8f8b;
  }
}

.ql-editor {
  min-height: 300px;
  padding-top: 30px;
  font-size: 16px;
}

.ql-toolbar.ql-snow {
  border: 0;
}

.ql-container.ql-snow {
  border: 0;
  background-color: white;
}
`;

export default GlobalStyle;
