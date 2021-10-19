import { toast as Toast } from "react-toastify";
import styled from "styled-components";
import Image from "next/image";

import WarnIcon from "@/assets/images/warn-icon.png";

const AUTO_CLOSE_TIME = 3000;
const SOMETHING_WRONG = "Something went wrong!";

const WarnToastWithIcon = ({ msg }) => {
  return (
    <Container>
      <Image
        src={WarnIcon.src}
        alt="Warning"
        layout="fixed"
        width={20}
        height={20}
      />
      <span>{msg}</span>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 3rem;
  justify-content: center;
  width: 100%;

  img {
    margin-right: 0.6rem;
  }
`;

const success = (message, autoClose = AUTO_CLOSE_TIME, othersProps = {}) =>
  Toast.success(message, { autoClose, ...othersProps });

const warn = (message, autoClose = AUTO_CLOSE_TIME, othersProps = {}) =>
  Toast.warn(message, { autoClose, ...othersProps });

const info = (message, autoClose = AUTO_CLOSE_TIME, othersProps = {}) =>
  Toast.info(message, { autoClose, ...othersProps });

const error = (
  message = SOMETHING_WRONG,
  autoClose = AUTO_CLOSE_TIME,
  othersProps = {}
) => Toast.error(message, { autoClose, ...othersProps });

const general = (message, autoClose = AUTO_CLOSE_TIME, othersProps = {}) =>
  Toast(message, { autoClose, ...othersProps });

const customWarn = (message, autoClose = AUTO_CLOSE_TIME, othersProps = {}) =>
  Toast(<WarnToastWithIcon msg={message} />, { autoClose, ...othersProps });

const toastMessage = {
  success,
  warn,
  info,
  error,
  general,
  customWarn,
};

export default toastMessage;
