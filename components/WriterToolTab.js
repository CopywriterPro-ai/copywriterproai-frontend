import React from "react";
import styled from "styled-components";

const WriterToolTab = ({ showPlagi, setShowPlagi }) => {
  return (
    <TabController>
      <TabControllerBtn
        IsActive={showPlagi === false}
        onClick={() => setShowPlagi(false)}
      >
        ToolBar
      </TabControllerBtn>
      <TabControllerBtn
        IsActive={showPlagi === true}
        onClick={() => setShowPlagi(true)}
      >
        Plagiarism
      </TabControllerBtn>
    </TabController>
  );
};

const TabController = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #878787;
  padding: 4px 10px 0 10px;
  border-radius: 5px;
`;

const TabControllerBtn = styled.button`
  width: 50%;
  border: 0px;
  background-color: ${({ IsActive }) => (IsActive ? "#fff" : "transparent")};
  border-radius: 18px 18px 0 0;
  padding: 6px 0;
  color: ${({ IsActive }) => (IsActive ? "#000" : "#fff")};
`;

export default WriterToolTab;
