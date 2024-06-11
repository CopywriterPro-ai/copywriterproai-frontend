import React from "react";

import Spinner from "@/components/common/Spinner";
import { GenButton } from "../styles";

const GenerateButton = ({ loading, onClick, children, disabled = false }) => {
  return (
    <GenButton
      disabled={loading || disabled}
      loading={loading.toString()}
      onClick={onClick}
    >
      {loading ? (
        <div style={{ display: "flex" }}>
          Generating <Spinner style={{ marginLeft: "5px" }} size="10px" />
        </div>
      ) : children ? (
        children
      ) : (
        "Generate"
      )}
    </GenButton>
  );
};

export default GenerateButton;
