import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { postUserVerify } from "@/redux/slices/auth";
import { toastMessage } from "@/utils";

const AccountVerify = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
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
        } else {
          toastMessage.error(message);
        }
      });
    } else {
      toastWarn("Account verification token needed");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token]);

  return (
    <div style={{ minHeight: "59vh" }}>
      <div className="text-center mt-5">
        <h3>Invalid or expired token</h3>
      </div>
    </div>
  );
};

export default AccountVerify;
