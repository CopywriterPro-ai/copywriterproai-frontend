import React from "react";
import styled from "styled-components";

const Google = ({ title, clickEvent, extras = "mt-4 google-btn" }) => {
  return (
    <GoogleButton
      type="button"
      className={`btn d-block bg-white shadow-sm d-flex align-items-center text-decoration-none justify-content-center ${extras}`}
      onClick={clickEvent}
    >
      <Image
        width={22}
        height={21}
        src="/google-icon.svg"
        alt="google"
      />
      <span className="mx-2">{title}</span>
    </GoogleButton>
  );
};

const GoogleButton = styled.button`
  width: 100%;
`;

const Image = styled.img`
  width: 26px;
  margin: 0px 8px;
`;

export default Google;
