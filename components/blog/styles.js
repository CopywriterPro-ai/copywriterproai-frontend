import styled from "styled-components";

export const ToolTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
`;

export const Title = styled.div``;

export const GenButton = styled.button`
  background-color: white;
  border: 1.5px solid #3a4841;
  padding: 3px 10px;
  border-radius: 3px;
  font-size: 15px;
  line-height: 22px;
  user-select: none;

  &:disabled {
    border: 1.5px solid #cacaca;
  }
`;

export const ToolTitleName = styled.span`
  margin-left: 5px;
  font-weight: ${({ isActive }) => (isActive === "true" ? "500" : "400")};
  font-size: 15px;
  line-height: 22px;
  cursor: pointer;
  user-select: none;
`;

export const BlogContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const EditorSection = styled.div`
  flex: 8;
`;

export const Editor = styled.div``;

export const ToolsSection = styled.div`
  flex: 4;
  background-color: #f5f5f5;
  border: 1px solid gray;
`;

export const ToolsHeader = styled.div`
  padding: 5px;
  border-bottom: 1px solid gray;
`;

export const ToolsBody = styled.div`
  padding: 5px;
`;

export const ToolItem = styled.div`
  width: 100%;
  margin: 1rem 0;
`;

export const TextItem = styled.div`
  background-color: white;
  border-radius: 3px;
  border: 1px solid;
  cursor: pointer;
  margin: 12px 0;
  padding: 10px;
  user-select: none;
`;

export const OutlineForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  p {
    margin: 0;
    font-size: 14px;
  }
  input {
    width: 3rem;
    margin: 0 12px;
    padding-left: 9px;
    border: 1.5px solid #3a4841;
    border-radius: 3px;
  }
`;
