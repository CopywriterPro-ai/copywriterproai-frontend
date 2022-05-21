import ReactSlider from "react-slider";
import styled from "styled-components";

const PriceSlider = ({ months, setMonths }) => {
  return (
    <StyledSlider
      // className="horizontal-slider"
      // marks
      // markClassName="example-mark"
      min={1}
      max={24}
      defaultValue={months}
      onChange={(value) => {
        if (typeof setMonths === "function") {
          setMonths(value);
        }
      }}
      // thumbClassName="example-thumb"
      // trackClassName="example-track"
      // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}

      renderTrack={Track}
      renderThumb={Thumb}
    />
  );
};

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 25px;
`;

const StyledThumb = styled.div`
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
`;

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? "#f00" : props.index === 1 ? "#0f0" : "#ddd"};
  border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

export default PriceSlider;
