import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { UserLayout as Layout } from "@/layout";
import {
  postCustomerPortal,
  selectors as paymentSelector,
} from "@/redux/slices/payment";

const Account = () => {
  const dispatch = useDispatch();
  const [redirectURL, setRedirectURL] = useState(null);
  const customer = useSelector(paymentSelector.getCustomer);

  useEffect(() => {
    if (redirectURL) window.location.href = redirectURL;
  }, [redirectURL]);

  const handleCreateCustomerPortal = () => {
    dispatch(postCustomerPortal()).then(({ payload }) =>
      setRedirectURL(payload.data)
    );
  };

  return (
    <Layout>
      <h1>Account</h1>
      <button onClick={handleCreateCustomerPortal}>Manage billing</button>
    </Layout>
  );
};

export default Account;
