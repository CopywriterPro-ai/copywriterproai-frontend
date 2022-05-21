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

.yt-embed {
  background-color: #000;
  position: relative;
  display: block;
  contain: content;
  background-position: 50%;
  background-size: cover;
  cursor: pointer;
  border-radius: 10px;
}
.yt-embed:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);
  background-position: top;
  background-repeat: repeat-x;
  height: 60px;
  padding-bottom: 50px;
  width: 100%;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
}
.yt-embed:after {
  content: "";
  display: block;
  padding-bottom: var(--aspect-ratio);
}
.yt-embed > iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.yt-embed > .yt-embed-pbtn {
  width: 70px;
  height: 46px;
  background-color: #212121;
  z-index: 1;
  opacity: 0.8;
  border-radius: 14%;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  border: none;
}
.yt-embed:hover > .yt-embed-pbtn {
  background-color: red;
  opacity: 1;
}
.yt-embed > .yt-embed-pbtn:before {
  content: "";
  border-color: transparent transparent transparent #fff;
  border-style: solid;
  border-width: 11px 0 11px 19px;
}
.yt-embed > .yt-embed-pbtn,
.yt-embed > .yt-embed-pbtn:before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.yt-embed.yt-embed-activated {
  cursor: unset;
}
.yt-embed.yt-embed-activated:before,
.yt-embed.yt-embed-activated > .yt-embed-pbtn {
  opacity: 0;
  pointer-events: none;
}

.p-mark {
  background: #fccecc;
  color: black;
  line-height: 28px;
  font-weight: 500;
}

.horizontal-slider {
  width: 100%;
  max-width: 500px;
  height: 50px;
  border: 1px solid grey;
}
.vertical-slider {
  height: 380px;
  width: 50px;
  border: 1px solid grey;
}
.example-thumb {
  font-size: 0.9em;
  text-align: center;
  background-color: black;
  color: white;
  cursor: pointer;
  border: 5px solid gray;
  box-sizing: border-box;
}
.example-thumb.active {
  background-color: grey;
}
.example-track {
  position: relative;
  background: #ddd;
}
.example-track.example-track-1 {
  background: #f00;
}
.example-track.example-track-2 {
  background: #0f0;
}
.example-mark {
  width: 8px;
  height: 8px;
  border: 2px solid #000;
  background-color: #fff;
  cursor: pointer;
  border-radius: 50%;
  vertical-align: middle;
}
.horizontal-slider .example-track {
  top: 20px;
  height: 10px;
}
.horizontal-slider .example-thumb {
  top: 1px;
  width: 50px;
  height: 48px;
  line-height: 38px;
}
.horizontal-slider .example-mark {
  margin: 0 calc(25px - 6px);
  bottom: calc(50% - 6px);
}
.vertical-slider .example-thumb {
  left: 1px;
  width: 48px;
  line-height: 40px;
  height: 50px;
}
.vertical-slider .example-track {
  left: 20px;
  width: 10px;
}
.vertical-slider .example-mark {
  margin: calc(25px - 6px) 0;
  left: calc(50% - 6px);
}

`;

export default GlobalStyle;
