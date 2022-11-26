import React from 'react';
import Image from 'next/image';

import Rating from '../common/Rating';
import { testimonialAuthor, testimonial } from '@/utils/data';

const Testimonial = ({ darkBg }) => {
  return (
    <section
      className={`customer-review-tab ptb-120 ${
        darkBg ? 'bg-gradient text-white' : 'bg-light'
      } position-relative z-2`}
    >
      <div className="container">
        <div className="row justify-content-center align-content-center">
          <div className="col-md-11 col-lg-6">
            <div className="section-heading text-center">
              <h4 className="h5 text-warning text-primary">Testimonial</h4>
              <h2>What They Say About Us</h2>
              <p>
                See what others are saying about the best AI copywriting tool that is taking the internet by storm!
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="tab-content" id="testimonial-tabContent">
              {testimonial.map((testimonial, i) => (
                <div
                  key={i + 1}
                  className={`tab-pane fade ${testimonial.active}`}
                  id={testimonial.target}
                  role="tabpanel"
                >
                  <div className="row align-items-center justify-content-between">
                    <div className="col-lg-6 col-md-6">
                      <div className="testimonial-tab-content mb-5 mb-lg-0 mb-md-0">
                        <Image
                          width={65}
                          height={51}
                          src="/testimonial/quotes-left.svg"
                          alt="testimonial quote"
                          className="img-fluid mb-32"
                        />
                        <div className="blockquote-title-review mb-4">
                          <h3 className="mb-0 h4 fw-semi-bold">
                            {testimonial.header}
                          </h3>
                          <Rating />
                        </div>

                        <blockquote className="blockquote">
                          <p>{testimonial.description}</p>
                        </blockquote>
                        <div className="author-info mt-4">
                          <h6 className="mb-0">{testimonial.name} </h6>
                          <span> {testimonial.title} </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-6">
                      <div className="author-img-wrap pt-5 ps-5">
                        <div className="testimonial-video-wrapper position-relative">
                          <Image
                            width={353}
                            height={382}
                            src={testimonial.image}
                            className="img-fluid rounded-custom shadow-lg"
                            alt="testimonial author"
                          />
                          <div className="customer-info text-white d-flex align-items-center">
                            {/* <VideoModal /> */}
                          </div>
                          <div className="position-absolute bg-primary-dark z--1 dot-mask dm-size-16 dm-wh-350 top--40 left--40 top-left"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ul
              className="nav nav-pills testimonial-tab-menu mt-60"
              id="testimonial"
              role="tablist"
            >
              {testimonialAuthor.map((author, i) => (
                <li key={i + 1} className="nav-item" role="presentation">
                  <div
                    className="nav-link d-flex align-items-center rounded-custom border border-light border-2 testimonial-tab-link"
                    data-bs-toggle="pill"
                    data-bs-target={author.target}
                    role="tab"
                    aria-selected="false"
                  >
                    <div className="testimonial-thumb me-3">
                      <Image
                        width={50}
                        height={50}
                        src={author.image}
                        className="rounded-circle"
                        alt="testimonial thumb"
                      />
                    </div>
                    <div className="author-info">
                      <h6 className="mb-0">{author.name} </h6>
                      <span>{author.title} </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
