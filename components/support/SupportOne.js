
import Link from 'next/link';
import { FaRegCheckCircle } from 'react-icons/fa';
import React, { useState } from 'react';
import { IoPlayCircleOutline } from 'react-icons/io5';
import ModalVideo from 'react-modal-video';


const SupportOne = ({ className }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <section
      className={`${
        className
          ? 'cta-subscribe bg-dark ptb-120 position-relative overflow-hidden'
          : 'cta-subscribe pt-60 pb-120'
      }`}
    >
        <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="aQFao8lz6C8"
        onClose={() => setOpen(false)}
      />
      <div className="container">
        <div
          className={`${
            className
              ? ''
              : 'bg-gradient ptb-120 px-4 position-relative overflow-hidden rounded-custom'
          }`}
        >
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="subscribe-info-wrap text-center position-relative z-2">
                <div className="section-heading">
                  <h4 className="h5 text-warning">
                    Let&apos;s Try! Get Free Support
                  </h4>
                  <h2>Start Your 7-Day Free Trial</h2>
                  <p>
                    Check out how our AI copywriting tool can help you improve your writing.
                  </p>
                </div>
                <div className="form-block-banner mw-60 m-auto mt-5">
                            <Link href='/contact-us'>
                            <a  className="btn btn-primary">Contact with Us</a>
                            </Link>
                            <a href="#!"
                             onClick={() => setOpen(true)}
                               className="text-white text-decoration-none popup-youtube d-inline-flex align-items-center watch-now-btn ms-lg-3 ms-md-3 mt-3 mt-lg-0"> 
                                    <span>
                                    <IoPlayCircleOutline className='me-1'/>
                                       Watch Demo</span>
                                     </a>
                  </div>
                <ul className="nav justify-content-center subscribe-feature-list mt-4">
                  <li className="nav-item">
                    <span>
                      <FaRegCheckCircle className="far me-2 text-primary" />
                      Free 7-day trial
                    </span>
                  </li>
                  <li className="nav-item">
                    <span>
                      <FaRegCheckCircle className="far me-2 text-primary" />
                      No credit card required
                    </span>
                  </li>
                  <li className="nav-item">
                    <span>
                      <FaRegCheckCircle className="far me-2 text-primary" />
                      Support 24/7
                    </span>
                  </li>
                  <li className="nav-item">
                    <span>
                      <FaRegCheckCircle className="far me-2 text-primary" />
                      Cancel anytime
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-circle rounded-circle circle-shape-3 position-absolute bg-dark-light left-5"></div>
          <div className="bg-circle rounded-circle circle-shape-1 position-absolute bg-warning right-5"></div>
        </div>
      </div>
    </section>
  );
};

export default SupportOne;
