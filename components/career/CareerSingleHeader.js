/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { FaRegSmile, FaStar } from 'react-icons/fa';
import { BiBuildingHouse, BiCurrentLocation } from 'react-icons/bi';

const CareerSingleHeader = () => {
  return (
    <section
      className="page-header position-relative overflow-hidden ptb-120 bg-dark"
      style={{
        background: "url('/page-header-bg.svg')no-repeat bottom left",
      }}
    >
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-8 col-12">
            <div className="company-info-wrap">
              <div className="company-logo p-4 bg-white shadow rounded-custom me-4 mt-2">
                <div className="logo">
                  <img
                    src="/company/2.png"
                    alt="company logo"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="company-overview">
                <h1 className="display-5 fw-bold">Senior Backend Developer</h1>

                <h6>About The Company</h6>
                <ul className="list-unstyled list-inline mb-0 mt-3">
                  <li className="list-inline-item me-4">
                    <i className="far mt-2 me-1">
                      <BiBuildingHouse className="fa-lg" />
                    </i>{' '}
                    Google
                  </li>
                  <li className="list-inline-item me-4">
                    <div className="star-rating">
                      <i className="far me-2">
                        <FaRegSmile className="mb-1" />
                      </i>
                      <FaStar className="text-warning mb-1" />
                      <FaStar className="text-warning mb-1" />
                      <FaStar className="text-warning mb-1" />
                      <FaStar className="text-warning mb-1" />
                      <FaStar className="text-warning mb-1" />
                    </div>
                  </li>
                  <li className="list-inline-item me-4">
                    <span className="far fa-lg me-1">
                      <BiCurrentLocation className="mb-1" />
                    </span>{' '}
                    United Kingdom
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-12">
            <div className="annual-salary-wrap rounded-custom">
              <h6>Annual Salary</h6>
              <span className="display-6 fw-semi-bold text-dark mb-0">
                $35k - $38k
              </span>
            </div>
          </div>
        </div>

        <div className="bg-circle rounded-circle circle-shape-3 position-absolute bg-dark-light right-5"></div>
      </div>
    </section>
  );
};

export default CareerSingleHeader;
