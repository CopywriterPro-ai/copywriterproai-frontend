import React from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { BiCommentDetail } from 'react-icons/bi';
import { FaRegEnvelope, FaRegListAlt } from 'react-icons/fa';

import { helpCenterFaqDetails } from '../../utils/data';

const HelpCenterDetails = () => {
  return (
    <>
      <section className="support-content ptb-120">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-4 col-md-4 d-none d-md-block d-lg-block">
              <div className="support-article-sidebar sticky-sidebar">
                <div
                  className="nav flex-column nav-pills support-article-tab bg-light rounded-custom p-5"
                  id="v-pills-support"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    data-bs-target="#support-tab-1"
                    data-bs-toggle="pill"
                    type="button"
                    role="tab"
                    aria-selected="true"
                  >
                    All Documentation
                  </button>
                  <button
                    className="nav-link"
                    data-bs-target="#support-tab-2"
                    data-bs-toggle="pill"
                    type="button"
                    role="tab"
                    aria-selected="false"
                  >
                    Payments Query
                  </button>
                  <button
                    className="nav-link"
                    data-bs-target="#support-tab-3"
                    data-bs-toggle="pill"
                    type="button"
                    role="tab"
                    aria-selected="false"
                  >
                    Setup or Installment
                  </button>
                  <button
                    className="nav-link"
                    data-bs-target="#support-tab-4"
                    data-bs-toggle="pill"
                    type="button"
                    role="tab"
                    aria-selected="false"
                  >
                    Technical Support
                  </button>
                  <button
                    className="nav-link"
                    data-bs-target="#support-tab-5"
                    data-bs-toggle="pill"
                    type="button"
                    role="tab"
                    aria-selected="false"
                  >
                    Retailers & Customer
                  </button>
                  <button
                    className="nav-link"
                    data-bs-target="#support-tab-6"
                    data-bs-toggle="pill"
                    type="button"
                    role="tab"
                    aria-selected="false"
                  >
                    Security Issues
                  </button>
                  <button
                    className="nav-link"
                    data-bs-target="#support-tab-7"
                    data-bs-toggle="pill"
                    type="button"
                    role="tab"
                    aria-selected="false"
                  >
                    Brand Creation
                  </button>
                  <button
                    className="nav-link"
                    data-bs-target="#support-tab-8"
                    data-bs-toggle="pill"
                    type="button"
                    role="tab"
                    aria-selected="false"
                  >
                    Legal Support
                  </button>
                </div>
                <div className="bg-light p-5 mt-4 rounded-custom quick-support">
                  <Link href="/contact-us">
                    <a className="text-decoration-none text-muted d-flex align-items-center py-2">
                      <div className="quick-support-icon rounded-circle bg-success-soft me-3">
                        <i className="far text-success">
                          <FaRegListAlt />
                        </i>
                      </div>
                      <div className="contact-option-text">
                        Quick Support Form
                      </div>
                    </a>
                  </Link>
                  <Link href="mailto:info@themetags.com">
                    <a className="text-decoration-none text-muted d-flex align-items-center py-2">
                      <div className="quick-support-icon rounded-circle bg-primary-soft me-3">
                        <i className="far text-primary">
                          <FaRegEnvelope />
                        </i>
                      </div>
                      <div className="contact-option-text">
                        info@themetags.com
                      </div>
                    </a>
                  </Link>
                  <Link href="#!">
                    <a className="text-decoration-none text-muted d-flex align-items-center py-2">
                      <div className="quick-support-icon rounded-circle bg-danger-soft me-3">
                        <i className="far text-danger">
                          <BiCommentDetail />
                        </i>
                      </div>
                      <div className="contact-option-text">
                        Live Support Chat
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-8">
              <div className="tab-content" id="v-pills-supportContent">
                {helpCenterFaqDetails.map((faq, i) => (
                  <div
                    key={i + 1}
                    className={`tab-pane fade ${faq.class}`}
                    id={faq.target}
                    role="tabpanel"
                  >
                    <div className="support-article-wrap">
                      <h2>{faq.title} </h2>
                      <ul className="support-article-list list-unstyled mt-4">
                        {faq.listItem.map((list, i) => (
                          <li
                            key={i + 1}
                            className="py-4 border-top border-light"
                          >
                            <Link href={list.href}>
                              <a className="text-decoration-none d-block text-muted">
                                <h3 className="h5 support-article-title">
                                  {list.header}
                                </h3>
                                <p>{list.desc}</p>
                                <span className="btn-link text-decoration-none read-more-link">
                                  Read More{' '}
                                  <span>
                                    <FiArrowRight className="far ms-2" />
                                  </span>
                                </span>
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HelpCenterDetails;
