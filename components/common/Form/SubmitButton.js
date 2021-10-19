import styled from "styled-components";

const SubmitButton = ({ title = "SUBMIT", loading = false }) => {
  return (
    <Button disabled={loading} type="submit">
      {title}
    </Button>
  );
};

const Button = styled.button`
  color: white;
  background: #2cae97;
  height: 55px;
  width: 292px;
  border: none;
  border-radius: 40px;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: 38px;

  &:disabled {
    background: #7fcec5;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    width: 185px;
    height: 50px;
  }
`;

export default SubmitButton;
