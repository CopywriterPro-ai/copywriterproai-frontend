import styled from "styled-components";

export const Container = styled.div`
  background: #fbfbfb;
  border-radius: 8px;
  padding: 35px;
  margin-top: 0;
  width: 100%;
  height: 400px;

  @media screen and (max-width: 1250px) {
    padding: 30px;
  }
`;

export const Scroll = styled.div`
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

export const InputSection = styled.div`
  margin: 0 5px;
`;

export const Title = styled.h1`
  font-size: 23px;
  font-weight: 600;
  line-height: 29px;
  color: black !important;
  padding: 5px 0 10px 0;

  @media screen and (max-width: 1250px) {
    padding: 0 0 5px 0;
  }
`;

export const Divider = styled.hr`
  margin: .8rem 0;
  border-top: 1px solid rgba(0, 0, 0, .1);
`;

export const TextArea = styled.textarea`
  margin: 15px 0;
  height: 150px;
  width: 100%;
  background: #fbfbfb;
  box-shadow: rgba(0, 0, 0, 0.20) 0px 0px 4px;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 20px;
  resize: none;
  border: none;
  outline: none;
  font-size: 18px;

  &::placeholder {
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
    color: #8a8a8a;
  }

  @media (max-width: 1250px) {
    height: 135px;
    padding: 16px;
    margin: 10px 0;
    font-size: 16px;

    &::placeholder {
      font-size: 16px;
    }
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
  color: #4c4c4c !important;

  @media (max-width: 992px) {
    font-size: 15px;
  }
`;

export const DemoItem = styled.div`
  // border: none;
  // border-radius: 5px;
  // box-shadow: rgb(0 0 0 / 5%) 0px 0px 6px 0px;;
  margin: 15px 0px;
  padding: 13px 15px;
  user-select: all;
  word-wrap: break-word;

  &:first-child {
    margin: 0;
  }

  &:last-child {
    margin: 0;
  }
`;

export const ResultSection = styled.div`
  color: black;
`;

export const Header = styled.div`
  height: 50px;
`;

export const Body = styled.div`
  height: 190px;
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

export const Action = styled.div`
  height: 50px;
  margin-top: .8rem;
`;

export const TryAgain = styled.button`
  float: right;
`;