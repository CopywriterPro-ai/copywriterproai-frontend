import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { UserLayout as Layout } from "@/layout";
import {
  getCheckoutSession,
  selectors as paymentSelector,
} from "@/redux/slices/payment";

const REDIRECT_TIME = 5000;

const Success = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { session_id } = router.query;

  const { loading, session } = useSelector(paymentSelector.getCheckout);
  const [afterRedirect, setAfterRedirect] = useState(REDIRECT_TIME / 1000);

  const emptySession =
    session &&
    Object.keys(session).length === 0 &&
    session.constructor === Object;

  useEffect(() => {
    if (session_id) {
      dispatch(getCheckoutSession({ sessionId: session_id }));
    }
  }, [dispatch, session_id]);

  useEffect(() => {
    let timeout;
    let interval;

    if (!emptySession) {
      timeout = setTimeout(() => {
        router.push("/app");
      }, REDIRECT_TIME);

      interval = setInterval(() => {
        setAfterRedirect((prev) => prev - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emptySession]);

  if (loading === "pending") {
    return <h2>Loading...</h2>;
  }

  if (!session_id) {
    return <h2>Need a valid session id</h2>;
  }

  return (
    <Layout>
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {emptySession && <h2>Invalid Session id</h2>}
        {session?.payment_status === "paid" && (
          <div>
            <h2>Payment Success</h2>
            <p>Automatic redirect after {afterRedirect} seconds</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Success;
