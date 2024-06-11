import { useDispatch } from "react-redux";
import { writeAlongActions } from "@/redux/slices/blog";
import { setCurrentTask as setCurrnetTask2 } from "@/redux/slices/completeBlog";

import { ToolTitle, Title, ToolTitleName } from "../styles";
import { FaCircle, FaRegCircle } from "react-icons/fa";

const ToolTitleItem = ({ text, isActive, currentTask, id }) => {
  const dispatch = useDispatch();

  const handleSetActiveTask = () => {
    switch (id) {
      case "complete-blog":
        dispatch(setCurrnetTask2(currentTask));
        break;
      default:
        dispatch(writeAlongActions.setCurrentTask(currentTask));
        break;
    }
  };

  return (
    <ToolTitle onClick={handleSetActiveTask}>
      <Title>
        {isActive ? <i><FaCircle/></i> : <i><FaRegCircle/></i>}
        <ToolTitleName isActive={isActive.toString()}>{text}</ToolTitleName>
      </Title>
    </ToolTitle>
  );
};

export default ToolTitleItem;
