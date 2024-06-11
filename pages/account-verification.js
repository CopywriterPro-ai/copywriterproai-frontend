import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { AuthLayout as Layout } from "@/layout";
import { postUserVerify } from "@/redux/slices/auth";
import { toastMessage } from "@/utils";

const AccountVerify = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [invalid, setInvalid] = useState(false);
  const { token } = router.query;

  useEffect(() => {
    if (router.query) {
      if (token) {
        dispatch(postUserVerify({ token })).then(({ payload }) => {
          const {
            status,
            data: { message },
          } = payload;
          if (status === 200) {
            toastMessage.success(message);
            router.push("/signin");
          } else if (status === 400) {
            toastMessage.warn(message);
            setInvalid(true);
          } else {
            toastMessage.error(message);
            setInvalid(true);
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token]);

  return (
    <Layout>
      <div style={{ minHeight: "59vh" }}>
        {invalid && (
          <div className="text-center mt-5">
            <h3>Invalid or expired token</h3>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AccountVerify;
