import React from 'react';
import {
  FaBriefcaseMedical,
  FaClock,
  FaHouseUser,
  FaUserFriends,
} from 'react-icons/fa';

const CareerPromo = () => {
  return (
    <section className="career-promo ptb-120 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-12">
            <div className="section-heading text-center">
              <h4 className="h5 text-primary">Why Join Us</h4>
              <h2>Great Working Environment</h2>
              <p>
                Revolutionary paradigms before enabled interfaces dynamically
                transition technically sound paradigms with cutting-edge
                initiatives.{' '}
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <div className="single-feature d-flex mt-0 p-5 bg-white rounded-custom">
              <span className="fas fa-2x text-primary">
                <FaHouseUser />
              </span>
              <div className="ms-4 mt-2">
                <h5>Remote Working Facilities</h5>
                <p className="mb-0">
                  Credibly syndicate enterprise total linkage whereas cost
                  effective innovate state of the art data without
                  multifunctional.{' '}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6">
            <div className="single-feature d-flex mt-4 mt-xl-0 mt-lg-0 mt-md-0 p-5 bg-white rounded-custom">
              <span className="fas fa-2x text-primary">
                <FaClock />
              </span>
              <div className="ms-4 mt-2">
                <h5>Flexible Working Hours</h5>
                <p className="mb-0">
                  Credibly syndicate enterprise total linkage whereas cost
                  effective innovate state of the art data without
                  multifunctional.{' '}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6">
            <div className="single-feature d-flex mt-4 p-5 bg-white rounded-custom">
              <span className="fas fa-2x text-primary">
                <FaUserFriends />
              </span>
              <div className="ms-4 mt-2">
                <h5>Friendly Skilled Team</h5>
                <p className="mb-0">
                  Credibly syndicate enterprise total linkage whereas cost
                  effective innovate state of the art data without
                  multifunctional.{' '}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6">
            <div className="single-feature d-flex mt-4 p-5 bg-white rounded-custom">
              <span className="fas fa-2x text-primary">
                <FaBriefcaseMedical />
              </span>
              <div className="ms-4 mt-2">
                <h5>Medical Insurance Facilities</h5>
                <p className="mb-0">
                  Credibly syndicate enterprise total linkage whereas cost
                  effective innovate state of the art data without
                  multifunctional.{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerPromo;
