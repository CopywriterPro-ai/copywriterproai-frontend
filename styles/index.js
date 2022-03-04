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
  font-size: 16px;
  max-height: 100vh;
  min-height: 300px;
  padding-top: 30px;
  font-size: 17px;
  word-wrap: break-word;
  line-height: 34px;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff0000;
  }

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
