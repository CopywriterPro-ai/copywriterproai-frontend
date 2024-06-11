import { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import styled from "styled-components";

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const Thumb = ({ props, state, setPositionLeft, setCurrentMonths }) => {
  useEffect(() => {
    if (props) {
      const leftPX = props?.style?.left;
      const left = parseFloat(leftPX) - 40;
      setCurrentMonths(state.valueNow);
      setPositionLeft(`${left}px`);
    }
  }, [props, state, setCurrentMonths, setPositionLeft]);

  return <StyledThumb {...props}></StyledThumb>;
};

const PriceSlider = ({ months, setMonths }) => {
  const [positionLeft, setPositionLeft] = useState("0px");
  const [currentMonths, setCurrentMonths] = useState(1);

  useEffect(() => {
    const isPositive = months > 0;
    if (!isPositive) {
      setMonths(1);
    }
  }, [months, setMonths]);

  return (
    <>
      <StyledMonthsShow style={{ left: positionLeft }}>
        {currentMonths} {currentMonths <= 1 ? "Month" : "Months"}
      </StyledMonthsShow>
      <StyledSlider
        min={0}
        max={24}
        value={months}
        marks={[6, 12, 18]}
        onChange={(value) => {
          if (typeof setMonths === "function") {
            setMonths(value);
          }
        }}
        markClassName="pricing-slider-mark"
        renderTrack={Track}
        renderThumb={(props, state) => (
          <Thumb
            key="pricing-slider"
            setPositionLeft={setPositionLeft}
            setCurrentMonths={setCurrentMonths}
            props={props}
            state={state}
          />
        )}
      />
    </>
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

const StyledMonthsShow = styled.div`
  background-color: #222;
  border-radius: 3px;
  color: #fff;
  margin-bottom: 1.2rem;
  padding: 5px 0;
  position: relative;
  text-align: center;
  width: 100px;
  user-select: none;

  &:after {
    content: " ";
    position: absolute;
    right: 42px;
    bottom: -8px;
    border-top: 8px solid #222;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    border-bottom: none;
  }
`;

export default PriceSlider;
