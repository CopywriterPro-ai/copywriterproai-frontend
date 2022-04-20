import { getRewardfulClientReferenceId, stripe as getStripe } from "@/utils";
import fetcher from "./fetcher";

const content = {
  getPriceList: () => {
    return fetcher("/payments/product-prices", {
      params: { activeProduct: true },
    });
  },
  postCreateCustomer: () => {
    return fetcher("/payments/create-customer", {
      method: "post",
    });
  },
  postCreateCheckoutSession: ({ data }) => {
    return fetcher("/payments/create-checkout-session", {
      method: "post",
      data: { ...data, referenceId: getRewardfulClientReferenceId() },
    });
  },
  getCheckoutSession: ({ sessionId }) => {
    return fetcher(`/payments/checkout-session?sessionId=${sessionId}`);
  },
  postCreateSubscription: ({ data }) => {
    return fetcher("/payments/create-subscription", {
      method: "post",
      data,
    });
  },
  getInvoicePreview: () => {
    return fetcher("/payments/subscription-invoice");
  },
  postCancelSubscription: ({ data }) => {
    return fetcher("/payments/cancel-subscription", {
      method: "post",
      data,
    });
  },
  postUpdateSubscription: ({ data }) => {
    return fetcher("/payments/update-subscription", {
      method: "post",
      data,
    });
  },
  getSubscriptions: ({ status = "all" }) => {
    return fetcher(`/payments/subscriptions?status=${status}`);
  },
  getSubscriptionsMe: () => {
    return fetcher(`/payments/subscriptions/me`);
  },
  postUpdateSubscriptionPlan: ({ data }) => {
    return fetcher("/payments/update-subscription-plan", {
      method: "post",
      data,
    });
  },
  postCustomerPortal: () => {
    return fetcher("/payments/create-customer-portal-session", {
      method: "post",
    });
  },
};

export default content;
