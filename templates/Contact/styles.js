import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
`;

export const FormGroup = styled.div`
  margin: 20px 0;
  width: 100%;
`;

export const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #cccccc;
  font-size: 22px;
  height: 4rem;
  outline: 0;
  padding: 8px 16px;
  width: 100%;
`;

export const Textarea = styled.textarea`
  border-radius: 10px;
  border: 1px solid #cccccc;
  font-size: 22px;
  outline: 0;
  padding: 8px 16px;
  resize: none;
  width: 100%;
`;

export const SubmitButton = styled.button`
  background: #2cae97;
  border-radius: 8px;
  border: none;
  color: #fff;
  font-size: 25px;
  line-height: 33px;
  padding: 10px 25px;

  &:disabled {
    background: #55b3a2;
  }
`;
