/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

import SectionTitle from '../common/AppSectionTitle';

const TabOne = () => {
  return (
    <section className="feature-tab-section ptb-120 bg-light">
      <div className="container">
        <div className="row justify-content-center align-content-center">
          <div className="col-md-10 col-lg-6">
            <SectionTitle
              subtitle="Features"
              title="Powerful Advanced Features"
              description="Dynamically initiate market positioning total linkage with
                  clicks-and-mortar technology progressively procrastinate
                  compelling."
              centerAlign
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ul
              className="nav justify-content-center feature-tab-list-2 mb-0"
              id="nav-tab"
              role="tablist"
            >
              <li className="nav-item">
                <Link href="#!">
                  <a
                    className="nav-link active"
                    to="#tab-1"
                    data-bs-toggle="tab"
                    data-bs-target="#tab-1"
                    role="tab"
                    aria-selected="false"
                  >
                    AI & Data Science
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#!">
                  <a
                    className="nav-link"
                    to="#tab-2"
                    data-bs-toggle="tab"
                    data-bs-target="#tab-2"
                    role="tab"
                    aria-selected="false"
                  >
                    Automation Power
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#!">
                  <a
                    className="nav-link"
                    to="#tab-3"
                    data-bs-toggle="tab"
                    data-bs-target="#tab-3"
                    role="tab"
                    aria-selected="false"
                  >
                    Advanced Technology
                  </a>
                </Link>
              </li>
            </ul>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade pt-60 active show"
                id="tab-1"
                role="tabpanel"
              >
                <div className="row justify-content-center align-items-center justify-content-around">
                  <div className="col-lg-5">
                    <div className="feature-tab-info">
                      <h3>AI & Data Science</h3>
                      <p>
                        Continually network effective bandwidth whereas
                        goal-oriented schemas. Intrinsicly incentivize corporate
                        synergy with accurate task bricks-and-clicks leadership
                        skills .{' '}
                      </p>
                      <p>
                        Conveniently develop innovative infomediaries for
                        enabled functionalities. Dynamically coordinate
                        leading-edge after virtual potentialities drive
                        multidisciplinary infrastructures.
                      </p>
                      <Link href="/about-us">
                        <a className="read-more-link text-decoration-none mt-4 d-block">
                          Know More About Us
                          <span className="far ms-2 mb-1">
                            <FiArrowRight />
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <img
                      src="/screen/widget-12.png"
                      alt="feature tab"
                      className="img-fluid mt-4 mt-lg-0 mt-xl-0"
                    />
                  </div>
                </div>
              </div>
              <div className="tab-pane fade pt-60" id="tab-2" role="tabpanel">
                <div className="row justify-content-center align-items-center justify-content-around">
                  <div className="col-lg-5">
                    <img
                      src="/screen/widget-8.png"
                      alt="feature tab"
                      className="img-fluid mb-4 mb-lg-0 mb-xl-0"
                    />
                  </div>
                  <div className="col-lg-5">
                    <div className="feature-tab-info">
                      <h3>Automation Power</h3>
                      <p>
                        Conveniently develop innovative infomediaries for
                        enabled functionalities. Dynamically coordinate
                        leading-edge corporate synergy after virtual
                        potentialities.
                      </p>
                      <p>
                        Continually network effective bandwidth whereas
                        goal-oriented schemas. Intrinsicly with accurate
                        meta-services. Rapidiously parallel task
                        bricks-and-clicks leadership skills with revolutionary.{' '}
                      </p>
                      <Link href="/about-us">
                        <a className="read-more-link text-decoration-none mt-4 d-block">
                          Know More About Us
                          <span className="far ms-2 mb-1">
                            <FiArrowRight />
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade pt-60" id="tab-3" role="tabpanel">
                <div className="row justify-content-center align-items-center justify-content-around">
                  <div className="col-lg-5">
                    <div className="feature-tab-info">
                      <h3>Advanced Technology</h3>
                      <p>
                        Intrinsicly incentivize corporate synergy with accurate
                        meta-services. Rapidiously parallel task
                        bricks-and-clicks. Leadership skills with revolutionary
                        convergence conveniently develop.
                      </p>
                      <p>
                        Continually expedite business systems without premier
                        testing procedures architect principle-centered
                        e-tailers for progressive maintain open-source
                        solutions.{' '}
                      </p>
                      <Link href="/about-us">
                        <a className="read-more-link text-decoration-none mt-4 d-block">
                          Know More About Us
                          <span className="far ms-2 mb-1">
                            <FiArrowRight />
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <img
                      src="/screen/widget-11.png"
                      alt="feature tab"
                      className="img-fluid mt-4 mt-lg-0 mt-xl-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabOne;
