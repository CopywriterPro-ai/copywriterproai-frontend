import { useDispatch } from "react-redux";
import { setCurrentTask } from "@/redux/slices/blog";

import { ToolTitle, Title, ToolTitleName } from "../styles";

const ToolTitleItem = ({ text, isActive, currentTask }) => {
  const dispatch = useDispatch();

  const handleSetActiveTask = () => {
    dispatch(setCurrentTask(currentTask));
  };

  return (
    <ToolTitle onClick={handleSetActiveTask}>
      <Title>
        <span className={`fa${isActive ? "s" : "r"} fa-circle`}></span>
        <ToolTitleName isActive={isActive.toString()}>{text}</ToolTitleName>
      </Title>
    </ToolTitle>
  );
};

export default ToolTitleItem;
