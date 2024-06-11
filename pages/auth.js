import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { AuthLayout as Layout } from "@/layout";
import { postStrategyLogin } from "@/redux/slices/auth";
import { toastMessage } from "@/utils";
import Processing from "@/pages/Loading";
import { USER_DEFAULT_PATH } from "@/appconstants";

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
          router.push(USER_DEFAULT_PATH);
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
        <Processing color="#000" />
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
