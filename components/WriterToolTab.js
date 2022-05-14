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
  background-color: white;
  padding: 5px 10px;
`;

const TabControllerBtn = styled.button`
  width: 49%;
  border: 0px;
  background-color: ${({ IsActive }) => (IsActive ? "#878787" : "#dee2e6")};
  border-radius: 4px;
  padding: 5px 0;
  color: ${({ IsActive }) => (IsActive ? "#e9ecef" : "#212529")};
`;

export default WriterToolTab;
