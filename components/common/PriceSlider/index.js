import { useEffect } from "react";
import ReactSlider from "react-slider";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const Thumb = ({ props, state }) => {
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <>
      <StyledThumb
        key={state.valueNow}
        data-for={`${state.valueNow}months`}
        data-tip={`${state.valueNow} Months`}
        {...props}
      ></StyledThumb>
      <ReactTooltip place="top" effect="solid" id={`${state.valueNow}months`} />
    </>
  );
};

const PriceSlider = ({ months, setMonths }) => {
  return (
    <StyledSlider
      min={1}
      max={24}
      defaultValue={months}
      marks={[6, 12, 18]}
      onChange={(value) => {
        if (typeof setMonths === "function") {
          setMonths(value);
        }
      }}
      markClassName="pricing-slider-mark"
      renderTrack={Track}
      renderThumb={(props, state) => <Thumb props={props} state={state} />}
    />
  );
};

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 8px;
`;

const StyledThumb = styled.div`
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #007fff;
  color: #fff;
  cursor: grab;
  height: 20px;
  margin-top: -6px;
  outline: none;
  width: 20px;
`;

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? "#f00" : props.index === 1 ? "#E0E0E0" : "#007FFF"};
  border-radius: 999px;
`;

export default PriceSlider;
