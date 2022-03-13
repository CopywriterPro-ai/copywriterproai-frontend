import React, { useEffect } from "react";
import styled from "styled-components";

const AppTask = ({ showTutorialState }) => {
  const [showTutorial, setShowTutorial] = showTutorialState;

  useEffect(() => {
    const handleCallback = (event) => {
      if (showTutorial && event.target.id === "tutorial-modal") {
        setShowTutorial(false);
      }
    };
    document.addEventListener("click", handleCallback);
    return () => {
      document.removeEventListener("click", handleCallback);
    };
  }, [setShowTutorial, showTutorial]);

  return (
    <StyledTutorial ShowModal={showTutorial.toString()} id="tutorial-modal">
      <StyledTutorialContent id="tutorial-modal-content">
        <button
          style={{ float: "right" }}
          onClick={() => setShowTutorial(false)}
        >
          ✕
        </button>
        <br />
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with
          a handful of model sentence structures, to generate Lorem Ipsum which
          looks reasonable. The generated Lorem Ipsum is therefore always free
          from repetition, injected humour, or non-characteristic words etc
        </p>
      </StyledTutorialContent>
    </StyledTutorial>
  );
};

const StyledTutorial = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  visibility: ${({ ShowModal }) =>
    ShowModal === "true" ? "visible" : "hidden"};
  z-index: 999999;
  opacity: ${({ ShowModal }) => (ShowModal === "true" ? 1 : 0)};
  transition: all 0.25s ease-in;
`;

const StyledTutorialContent = styled.div`
  position: relative;
  max-width: 800px;
  max-height: 80vh;
  border-radius: 8px;
  background: white;
  overflow: auto;
  padding: 5px;
  cursor: default;
`;

export default AppTask;
