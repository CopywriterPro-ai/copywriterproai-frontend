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
        <StyledBody>
          <div dangerouslySetInnerHTML={{ __html: doc.content }} />
        </StyledBody>
        <StyledHead>
          <div></div>
          <div>
            <button title="Close" onClick={() => setShowTutorial(false)}>
              ✕
            </button>
          </div>
        </StyledHead>
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
  padding: 45px;
  cursor: default;

  &::-webkit-scrollbar {
    width: 8px;
    height: 0;
    border-radius: 10px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    /* background: #ff0000; */
    background: rgba(0, 0, 0, 0.2);
    border-radius: inherit;
  }

  @media (max-width: 426px) {
    padding: 30px;
  }
`;

const StyledHead = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 25px;
  right: 25px;

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

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 3rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (max-width: 426px) {
      font-size: 1.6rem;
      margin-top: 1.5rem;
      margin-bottom: 2.5rem;
    }
  }

  h2, h3 {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 2rem 0;
    line-height: 1.2;

    @media (max-width: 426px) {
      font-size: 1.2rem;
    }
  }

  p {
    margin-top: 0;
    margin-bottom: 0.5rem;

    @media (max-width: 426px) {
      font-size: 1rem;
    }
  }

  img {
    margin-top:3.5rem;
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
`;

export default AppTask;
