import React, { useEffect } from "react";
import styled from "styled-components";

const AppTask = ({ showTutorialState, doc = {} }) => {
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
        <StyledHead>
          <div></div>
          <div>
            <button title="Close" onClick={() => setShowTutorial(false)}>
              ✕
            </button>
          </div>
        </StyledHead>
        <StyledBody>
          <div dangerouslySetInnerHTML={{ __html: doc.content }} />
        </StyledBody>
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
  background: rgba(0, 0, 0, 0.6);
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
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: auto;
  padding: 15px;
  cursor: default;

  &::-webkit-scrollbar {
    width: 4px;
    height: 0;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    /* background: #ff0000; */
    background: rgba(0, 0, 0, 0.2);
  }
`;

const StyledHead = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;

  button {
    background: transparent;
    border: 0;
    color: gray;
    font-size: 18px;

    &:hover {
      color: black;
    }
  }
`;

const StyledBody = styled.div`
  margin: 5px 0;
  color: #525252;

  img {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
`;

export default AppTask;
