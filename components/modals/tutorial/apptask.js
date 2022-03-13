import React, { useEffect } from "react";
import styled from "styled-components";

const AppTask = ({ showTutorialState, content = "" }) => {
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
        <div dangerouslySetInnerHTML={{ __html: content }} />
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
