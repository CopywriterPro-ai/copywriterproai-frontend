import React from "react";
import styled from "styled-components";

const Facebook = ({ title, clickEvent }) => {
  return (
    <FacebookButton
      type="button"
      className="btn google-btn mt-4 d-block bg-white shadow-sm d-flex align-items-center text-decoration-none justify-content-center"
      onClick={clickEvent}
    >
      <Image
        width={30}
        height={29}
        src="/facebook-icon.svg"
        alt="facebook"
        style={{left: "-5px"}}
      />
      <span className="mx-2">{title}</span>
    </FacebookButton>
  );
};

const FacebookButton = styled.button`
  width: 100%;
`;

const Image = styled.img`
  width: 26px;
  margin: 0px 8px;
`;

export default Facebook;
