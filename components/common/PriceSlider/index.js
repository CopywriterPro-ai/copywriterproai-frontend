import React from "react";
import ReactSlider from "react-slider";
import styled from "styled-components";

const PriceSlider = () => {
  return (
    <StyledSlider
      marks
      markClassName="example-mark"
      min={1}
      max={24}
      thumbClassName="example-thumb"
      trackClassName="example-track"
      renderThumb={(props, state) => (
        <div {...props}>{state.valueNow} Months</div>
      )}
    />
  );
};

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 25px;
`;

export default PriceSlider;
