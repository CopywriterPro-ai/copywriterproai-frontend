import styled from "styled-components";
import Link from "next/link";

const SignForm = styled.form``;

const Forgot = styled.div`
  margin: 10px 0 20px 0;
`;

const ForgotLink = styled(Link)`
  font-size: 18px;
  font-weight: 500;
  line-height: 30px;
  color: #000;
  text-decoration: underline;
  margin: 8px 0;

  &:hover {
    color: #000;
  }
`;

const styles = { SignForm, Forgot, ForgotLink };

export default styles;
