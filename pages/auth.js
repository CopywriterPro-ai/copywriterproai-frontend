import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { AuthLayout as Layout } from "@/layout";
import { postStrategyLogin } from "@/redux/slices/auth";
import { toastMessage } from "@/utils";
import Loader from "@/components/common/Loader";

const Strategyauth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      dispatch(postStrategyLogin({ token })).then(({ payload }) => {
        const {
          status,
          data: { message },
        } = payload;
        if (status === 200) {
          router.push("/app");
        } else if (status === 400) {
          toastMessage.warn(message);
        } else {
          toastMessage.error(message);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token]);

  return (
    <Layout>
      <StrategyContainer>
        <Loader size="90px" />
      </StrategyContainer>
    </Layout>
  );
};

const StrategyContainer = styled.div`
  min-height: 59vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Strategyauth;
