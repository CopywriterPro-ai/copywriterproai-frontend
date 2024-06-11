import React, { useEffect } from "react";
import Image from "next/image";
import { BsCalendar2Check, BsCalendarX, BsCreditCard } from "react-icons/bs";

import Circle from "../common/Circle";
import { pricingData } from "../../utils/data";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import {
  getPriceList,
  postCreateCustomer,
  postCreateCheckoutSession,
  selectors as paymentSelector,
} from "@/redux/slices/payment";
import { selectors as authSelector } from "@/redux/slices/auth";
import { selectors as subscriberSelector } from "@/redux/slices/subscriber";
import { setRedirectPath } from "@/redux/slices/ui";
import { stripe as getStripe } from "@/utils";

const Packages = ({ header, paddingTop = "pt-120" }) => {
  const dispatch = useDispatch();

  const interval = 1;

  const { items: pricedata, loading } = useSelector(
    paymentSelector.getPriceList(interval)
  );

  const { id: customerId } = useSelector(paymentSelector.getCustomer);
  const { isAuth } = useSelector(authSelector.getAuthenticate);
  const { loading: checkoutLoading } = useSelector(paymentSelector.getCheckout);
  const { data: subscriptionInfo } = useSelector(
    subscriberSelector.getOwnSubscriber
  );

  const isCheckoutPending = checkoutLoading === "pending";

  useEffect(() => {
    dispatch(getPriceList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setRedirectPath(null));
  }, [dispatch]);

  useEffect(() => {
    if (isAuth && !customerId) {
      dispatch(postCreateCustomer());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isAuth]);

  const router = useRouter();

  const {
    subscription,
    subscriberInfo: { isPaidSubscribers },
  } = subscriptionInfo;

  const handleCheckoutSessions = (priceId) => {
    if (!isAuth) {
      // dispatch(setRedirectPath("/pricing"));
      router.push("/signin");
    }

    if (isAuth && !isCheckoutPending)
      dispatch(postCreateCheckoutSession({ data: { priceId } })).then(
        async ({ payload }) => {
          if (payload.status === 200) {
            const { data } = payload;
            const stripe = await getStripe();
            stripe?.redirectToCheckout({
              sessionId: data.session.id,
            });
          }
        }
      );
  };

  return (
    <section
      className={`pricing-section pb-120 position-relative z-2 ${paddingTop}`}
    >
      <div className="container">
        {header && (
          <div>
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-10">
                <div className="section-heading text-center">
                  <h4 className="h5 text-primary">Pricing</h4>
                  <h2>Make Your Writing Sparkle</h2>
                  <p>
                    Choose a plan that fits your needs and get started on your
                    writing journey today!{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center mb-5">
              <div className="col-lg-3">
                <div className="media d-flex align-items-center py-2 p-sm-2">
                  <div className="icon-box mb-0 bg-primary-soft rounded-circle d-block me-3">
                    <span className="fal text-primary text-center">
                      <BsCreditCard />
                    </span>
                  </div>
                  <div className="media-body fw-medium h6 mb-0">
                    No credit card required
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="media d-flex align-items-center py-2 p-sm-2">
                  <div className="icon-box mb-0 bg-success-soft rounded-circle d-block me-3">
                    <span className="fal text-success">
                      <BsCalendar2Check />
                    </span>
                  </div>
                  <div className="media-body fw-medium h6 mb-0">
                    Get 7 day free trial
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="media d-flex align-items-center py-2 p-sm-2">
                  <div className="icon-box mb-0 bg-danger-soft rounded-circle d-block me-3">
                    <span className="fal text-danger">
                      <BsCalendarX />
                    </span>
                  </div>
                  <div className="media-body fw-medium h6 mb-0">
                    3-day cooling-off period
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          {pricingData.map((pricing, i) => (
            <div key={i + 1} className="col-lg-4 col-md-6">
              <div
                className={`position-relative single-pricing-wrap rounded-custom ${pricing.bgColor} custom-shadow p-5 mb-4 mb-lg-0`}
              >
                <div className="pricing-header mb-32">
                  <h3 className={`package-name ${pricing.textColor} d-block`}>
                    {" "}
                    {pricing.title}{" "}
                  </h3>
                  <h4 className="display-6 fw-semi-bold">
                    {pricing.price}
                    <span>{pricing.time} </span>
                  </h4>
                </div>
                <div className="pricing-info mb-4">
                  <ul className="pricing-feature-list list-unstyled">
                    {pricing.listItem.map((list, i) => (
                      <li key={i + 1}>
                        <Circle textColor={pricing.textColor} />
                        {list.available ? (
                          <span>{list.li}</span>
                        ) : (
                          <strike>{list.li}</strike>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* <Link href="/request-demo">
                  <a className={`btn ${pricing.btnColor} mt-2`}>Start a Free Trial</a>
                </Link> */}

                <button
                  className={`btn ${pricing.btnColor} mt-2`}
                  onClick={() => handleCheckoutSessions(pricedata[i].id)}
                  disabled={isCheckoutPending}
                >
                  {isAuth &&
                    (pricedata[i]?.metadata.priceKey === subscription
                      ? isPaidSubscribers
                        ? "Active"
                        : "Expired"
                      : "Get Started")}
                  {!isAuth && "Start 7-day free trial"}
                </button>

                {pricing.shape && (
                  <div
                    className={`dot-shape-bg position-absolute z--1 ${pricing.shape}`}
                  >
                    <Image
                      width={258}
                      height={258}
                      src="/shape/dot-big-square.svg"
                      alt="shape"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
