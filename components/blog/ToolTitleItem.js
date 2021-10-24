import { useDispatch } from "react-redux";
import { setCurrentTask } from "@/redux/slices/blog";
import Loader from "@/components/common/Loader";

import { ToolTitle, Title, ToolTitleName, GenButton } from "./styles";

const ToolTitleItem = ({
  loading = false,
  text,
  isActive,
  onClick,
  isOutline = false,
  currentTask,
}) => {
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
      {isActive && !isOutline && (
        <GenButton
          disabled={loading}
          loading={loading.toString()}
          onClick={onClick}
        >
          {loading ? (
            <div style={{ display: "flex" }}>
              Generating <Loader style={{ marginLeft: "5px" }} size="10px" />
            </div>
          ) : (
            "Generate"
          )}
        </GenButton>
      )}
    </ToolTitle>
  );
};

export default ToolTitleItem;
