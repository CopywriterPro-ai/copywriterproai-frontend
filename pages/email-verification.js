import React from "react";
import { useRouter } from "next/router";

import { AuthLayout as Layout } from "@/layout";

const EmailVerify = () => {
  const router = useRouter();
  const { type } = router.query;

  return (
    <Layout>
      <div style={{ minHeight: "59vh" }}>
        <div className="text-center mt-5">
          {type === "account-verify" && (
            <>
              <h3>Thank You For Being Our Early Adopter</h3>
              <p>
                You are just one step away. Please verify your account by
                clicking on the verification link we sent you in an email.
              </p>
              {/* <button className="btn btn-primary">Learn more</button> */}
            </>
          )}
          {type === "forgot-password" && (
            <>
              <h3>Thank You For Request!</h3>
              <p>
                We will send you an email with a link to reset your password.
              </p>
              {/* <button className="btn btn-primary">Learn more</button> */}
            </>
          )}
          {!type && (
            <>
              <h3>Invalid Request Type</h3>
              <p>Please check your request</p>
              {/* <button className="btn btn-primary">Learn more</button> */}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EmailVerify;
