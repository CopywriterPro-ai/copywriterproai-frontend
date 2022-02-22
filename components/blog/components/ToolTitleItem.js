import { useDispatch } from "react-redux";
import { setCurrentTask as setCurrnetTask1 } from "@/redux/slices/blog";
import { setCurrentTask as setCurrnetTask2 } from "@/redux/slices/completeBlog";

import { ToolTitle, Title, ToolTitleName } from "../styles";

const ToolTitleItem = ({ text, isActive, currentTask, id }) => {
  const dispatch = useDispatch();

  const handleSetActiveTask = () => {
    switch (id) {
      case "complete-blog":
        dispatch(setCurrnetTask2(currentTask));
        break;
      default:
        dispatch(setCurrnetTask1(currentTask));
        break;
    }
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
