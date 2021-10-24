import styled from "styled-components";

const PrimaryButton = ({ title, clickEvent }) => {
  return (
    <Button onClick={clickEvent} className="btn">
      {title}
    </Button>
  );
};

const Button = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  font-weight: 500;
  line-height: 34.5px;
  font-size: 20px;
  padding: 4px 18px;
  margin: 10px 0;

  background: #2cae97;
  border-radius: 5px;

  &:hover {
    color: ${({ theme }) => theme.secondary};
  }

  @media (max-width: 1200px) {
    font-size: 16px;
    margin: 0;
    line-height: 22px;
    font-weight: 500;
    padding: 5px 12px;
  }

  @media (max-width: 992px) {
    font-size: 14px;
    margin: 0;
    line-height: 21.5px;
    font-weight: 500;
    padding: 5px 12px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    margin: 10px 0;
    line-height: 21.5px;
    font-weight: 500;
    padding: 8px 25px;
  }
`;

export default PrimaryButton;
