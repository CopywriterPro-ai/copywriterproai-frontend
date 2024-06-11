import React from "react";
import styled from "styled-components";

import { useUser } from "@/hooks";

const CreditsLeft = () => {
  const {
    isAuth,
    subscribe: {
      activeSubscription: { words },
    },
  } = useUser();

  if (isAuth) {
    return (
      <StyledCreditsLeft>Words left: {words ? words : 0}</StyledCreditsLeft>
    );
  }
  return null;
};

const StyledCreditsLeft = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

export default CreditsLeft;
