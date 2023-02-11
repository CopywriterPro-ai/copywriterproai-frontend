import React from "react";
import styled from "styled-components";

const WriterToolTab = ({ showPlagi, setShowPlagi }) => {
  return (
    <TabController>
      <TabControllerBtn 
        IsActive={showPlagi === false}
        onClick={() => setShowPlagi(false)}
      >
        <span>Writer Toolbox</span>
      </TabControllerBtn>
      <TabControllerBtn
        IsActive={showPlagi === true}
        onClick={() => setShowPlagi(true)}
      >
        <span>Plagiarism Checker</span>
      </TabControllerBtn>
    </TabController>
  );
};

const TabController = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 0;

  @media (max-width: 1400px) {
    flex-direction: column;
  }

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const TabControllerBtn = styled.button`
  padding: 1em 2em 1em 1em;
  box-shadow: inset 0 -2px ${({ IsActive }) => (IsActive ? "#2cc185" : "#d1d3d2")};
  color: ${({ IsActive }) => (IsActive ? "#2CC185" : "#74777b")};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  width: 50%;
  pointer: cursor;
  transition: color 0.3s, box-shadow 0.3s;
  background: none;
  border: none;

  span {
    vertical-align: middle;
    font-size: 0.75em;
  }

  @media (max-width: 1400px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 50%;
  }
`;

export default WriterToolTab;
