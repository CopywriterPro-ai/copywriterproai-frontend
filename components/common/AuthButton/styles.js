import styled from "styled-components";

export const AuthButtonGroup = styled.div`
  margin: 14px 0;
`;

export const AuthButton = styled.button`
  border: 1px solid #e5e5e5;
  box-shadow: 0px 0px 2px 1px #0000001a inset;
  padding: 8px;
  width: 432px;
  border-radius: 7px;
  font-size: 20px;
  line-height: 30px;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 18px;
  }
`;
