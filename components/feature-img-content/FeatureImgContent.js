import React from 'react';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs';
import { FaCheckCircle, FaFingerprint } from 'react-icons/fa';

const FeatureImgContentOne = () => {
  return (
    <>
      <section className="why-choose-us ptb-120">
        <div className="container">
          <div className="row justify-content-lg-between align-items-center">
            <div className="col-lg-5 col-12">
              <div className="why-choose-content">
                <div className="icon-box rounded-custom bg-primary shadow-sm d-inline-block">
                  <span className="fas text-white">
                    <BsReverseLayoutTextWindowReverse />
                  </span>
                </div>
                <h2>Publish Blogs Faster With AI Blog Writer</h2>
                <p>
                  Keep your readers coming back for more with fresh, high-quality content. With our AI blog writer, you can easily get your writing done and published in no time. Our AI blog writer generates content that are -
                </p>
                <ul className="list-unstyled d-flex flex-wrap list-two-col mt-4 mb-4">
                  <li className="py-1">
                    <FaCheckCircle className="fas me-2 text-primary mb-1" />
                    SEO optimized
                  </li>
                  <li className="py-1">
                    <FaCheckCircle className="fas me-2 text-primary mb-1" />
                    Niche-Specific
                  </li>
                  <li className="py-1">
                    <FaCheckCircle className="fas me-2 text-primary mb-1" />
                    Well researched
                  </li>
                  <li className="py-1">
                    <FaCheckCircle className="fas me-2 text-primary mb-1" />
                    Engaging
                  </li>
                  <li className="py-1">
                    <FaCheckCircle className="fas me-2 text-primary mb-1" />
                    Compelling
                  </li>
                  <li className="py-1">
                    <FaCheckCircle className="fas me-2 text-primary mb-1" />
                    Error-Free
                  </li>
                </ul>
                {/* <a
                  href="about-us.html"
                  className="read-more-link text-decoration-none"
                >
                  Try it now{' '}
                  <span className="far ms-2 mb-1">
                    <FiArrowRight />
                  </span>
                </a> */}
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="feature-img-holder mt-4 mt-lg-0 mt-xl-0">
                <Image
                  width={636}
                  height={464}
                  layout="responsive"
                  src="/screen/ai blog writer.svg"
                  className="img-fluid"
                  alt="feature-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="image-feature pt-60 pb-120">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-5 col-12 order-lg-1">
              <div className="feature-img-content">
                <div className="icon-box rounded-custom bg-dark shadow-sm d-inline-block">
                  <span className="fal text-white">
                    <FaFingerprint />
                  </span>
                </div>
                <h2>Match Everything to Brand and Style</h2>
                <p>
                  Intrinsicly pontificate reliable metrics with enabled.
                  Holisticly maintain clicks-and-mortar manufactured products
                  empower viral customer service through resource deliverables.
                </p>
                <p>
                  Customer service through resource pontificate reliable metrics
                  with enabled expedite resource maximizing information maintain
                  manufactured products.
                </p>

                <a
                  href="about-us.html"
                  className="read-more-link text-decoration-none d-block mt-4"
                >
                  Know More About Us{' '}
                  <span className="far ms-2 mb-1">
                    <FiArrowRight />
                  </span>
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-12 order-lg-0">
              <div className="feature-img-holder mt-4 mt-lg-0 mt-xl-0">
                <Image
                  width={636}
                  height={492}
                  layout="responsive"
                  src="/screen/widget-12.png"
                  className="img-fluid"
                  alt="feature-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default FeatureImgContentOne;
