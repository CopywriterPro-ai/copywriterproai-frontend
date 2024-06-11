import styled from "styled-components";

export const Container = styled.div`
  padding: 25px;
`;

export const FormTitle = styled.p`
  font-weight: 500;
  font-size: 19px;
`;

export const Formgroup = styled.div`
  display: flex;
  padding: 10px 0;

  label {
    flex: 5;
    padding-right: 10px;
    font-size: 18px;

    @media (max-width: 768px) {
      display: inline-block;
      padding-right: 0;
    }
  }
  input {
    flex: 7;
    border: 0;
    box-shadow: inset 0px -1px 0px #b4b4b4;
    outline: 0;
  }
`;

export const UpdateButton = styled.button`
  background: #13b567;
  border-radius: 5px;
  border: 0;
  color: white;
  font-size: 17px;
  outline: 0;
  padding: 5px 20px;
`;
