import React from 'react';
import Link from 'next/link';
import { BiCommentDetail } from 'react-icons/bi';
import { FaRegEnvelope, FaRegListAlt } from 'react-icons/fa';

const HelpCenterSingleDetails = () => {
  return (
    <section className="support-content ptb-120">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-4 col-md-4 d-none d-md-block d-lg-block">
            <div className="support-article-sidebar sticky-sidebar">
              <Link href="/help-center">
                <a className="btn btn-primary mb-4 btn-sm">
                  <i className="far fa-angle-left me-2"></i> Go Back
                </a>
              </Link>
              <div className="nav flex-column nav-pills support-article-tab bg-light rounded-custom p-5">
                <h5>Related Support Articles</h5>
                <Link href="/help-center-single">
                  <a className="text-muted text-decoration-none py-2 d-block">
                    Can retailers opt-out of participation at any time?
                  </a>
                </Link>
                <Link href="/help-center-single">
                  <a className="text-muted text-decoration-none py-2 d-block">
                    How long does enforcement take after a MAP violation attempt
                    is made?
                  </a>
                </Link>
                <Link href="/help-center-single">
                  <a className="text-muted text-decoration-none py-2 d-block">
                    After retailer acceptance, how long does it take for
                    enforcement href occur?
                  </a>
                </Link>
                <Link href="/help-center-single">
                  <a className="text-muted text-decoration-none py-2 d-block">
                    What is the monthly cost of your app?
                  </a>
                </Link>
                <Link href="/help-center-single">
                  <a className="text-muted text-decoration-none py-2 d-block">
                    Do you offer refunds for the subscriptions?
                  </a>
                </Link>
                <Link href="/help-center-single">
                  <a className="text-muted text-decoration-none py-2 d-block">
                    Are notifications sent when MAP violation attempts occur?
                  </a>
                </Link>
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
                    <div className="contact-option-text">Live Support Chat</div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 p-lg-5">
            <div className="support-article-wrap">
              <h1 className="display-5 mb-4 fw-bold">
                Can retailers opt-out of participation at any time?
              </h1>
              <p>
                Dramatically plagiarize client-based relationships and
                interactive supply chains. Interactively enable leading-edge
                outsourcing without interoperable sources. Compellingly
                fabricate multifunctional mindshare with prospective e-business.
                Phosfluorescently impact process-centric value via
                principle-centered deliverables. Dramatically visualize diverse
                services whereas future-proof networks.
              </p>
              <p>
                Dynamically disseminate progressive deliverables with long-term
                high-impact niche markets. Interactively parallel task unique
                communities for future-proof results. Holisticly innovate
                strategic deliverables through innovative leadership.{' '}
              </p>

              <div className="job-details-info my-5">
                <h3 className="h5">Follow this Step Bellow Responsibilities</h3>
                <ul className="content-list list-unstyled">
                  <li>
                    Be involved in every step of the product design cycle from
                    discovery and user acceptance testing.
                  </li>
                  <li>
                    Work with BAs, product managers and tech teams href lead the
                    Product Design
                  </li>
                  <li>
                    Maintain quality of the design process and ensure that when
                    designs are translated into code they accurately.
                  </li>
                  <li>
                    Accurately estimate design tickets during planning sessions.
                  </li>
                  <li>
                    Contribute href sketching sessions involving
                    non-designersCreate, and pattern libraries.
                  </li>
                  <li>
                    Design pixel perfect responsive UI’s and understand that
                    adopting common interface
                  </li>
                  <li>
                    Interface patterns is better for UX than reinventing the
                    wheel
                  </li>
                </ul>
              </div>
              <p>
                Enthusiastically expedite client-focused communities for
                process-centric collaboration and idea-sharing. Globally evolve
                high-quality methods of empowerment via plug-and-play resources.
                Compellingly transition worldwide strategic theme areas
                vis-a-vis frictionless systems.{' '}
              </p>
              <p>
                Uniquely develop empowered expertise without parallel portals.
                Efficiently reintermediate plug-and-play imperatives without
                goal-oriented technologies. Rapidiously network frictionless
                scenarios rather than multidisciplinary innovation. Efficiently
                restore interactive resources before enterprise-wide
                functionalities. Phosfluorescently benchmark an expanded array
                of data for premier interfaces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpCenterSingleDetails;
