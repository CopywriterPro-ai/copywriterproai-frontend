import styled from "styled-components";

export const Container = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  border: 1px solid #979797;
  padding: 25px;

  @media (max-width: 375px) {
    padding: 18px;
  }
`;

export const Scroll = styled.div`
  height: 370px;
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff0000;
  }
`;

export const InputSection = styled.div``;

export const Title = styled.div`
  font-size: 25px;
  line-height: 29px;
  color: #535353;
  text-align: center;
  border-bottom: 1px solid #7d7d7d;
  padding: 5px 0 15px 0;
  margin-bottom: 10px;

  @media (max-width: 992px) {
    font-size: 20px;
  }

  @media (max-width: 375px) {
    font-size: 18px;
    padding: 0 0 15px 0;
    margin-bottom: 0;
  }

  @media (max-width: 319px) {
    font-size: 16px;
  }
`;

export const TextArea = styled.textarea`
  margin: 15px 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid ${({ Color }) => (Color ? Color : "#7d7d7d")};
  box-sizing: border-box;
  border-radius: 9px;
  resize: none;
  outline: 0;
  padding: 8px;

  &::placeholder {
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
    color: #8a8a8a;
  }

  @media (max-width: 1200px) {
    height: 160px;
  }

  @media (max-width: 992px) {
    height: 138px;
    border-radius: 5px;

    &::placeholder {
      font-weight: 500;
      font-size: 16px;
      line-height: 30px;
      color: #8a8a8a;
    }
  }

  @media (max-width: 375px) {
    height: 130px;
    font-size: 15px;

    &::placeholder {
      font-size: 15px;
    }
  }

  @media (max-width: 319px) {
    height: 140px;
    font-size: 13.5px;

    &::placeholder {
      font-size: 13.5px;
    }
  }
`;

export const LiveActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Counter = styled.p`
  margin: 0;
  font-size: 17px;
  line-height: 25px;
  color: #8a8a8a;

  @media (max-width: 992px) {
    font-size: 15px;
  }
`;

export const Button = styled.button`
  background: #2cae97;
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 500;
  outline: 0;
  padding: 8px 25px;

  @media (max-width: 992px) {
    font-size: 15px;
    padding: 5px 18px;
  }

  @media (max-width: 319px) {
    font-size: 13px;
  }
`;

export const DemoItem = styled.div`
  border: 0;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  margin: 5px 1px;
  padding: 5px;
  user-select: all;
  word-wrap: break-word;
`;

export const ResultSection = styled.div`
  margin-top: 55px;
`;
