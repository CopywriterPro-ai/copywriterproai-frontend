import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

import {
  footerMenus,
  networks,
} from '@/utils/data';
import Rating from '@/components/common/Rating';

const Footer = ({ footerLight, style, footerGradient }) => {
  return (
    <>
      <footer className='footer-section'>
          <div
          className={`footer-top ptb-120 ${footerLight ? 'footer-light' : 'bg-dark'} ${
            footerGradient ? 'bg-gradient' : ''
          }  text-white`}
          style={style}
        >
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-8 col-lg-4 mb-md-4 mb-lg-0">
                <div className="footer-single-col">
                  <div className="footer-single-col mb-4">
                    {footerLight ? (
                      <Image
                        width={250}
                        height={80}
                        src="/logo-color.svg"
                        alt="logo"
                        className="img-fluid logo-white"
                      />
                    ) : (
                      <Image
                        width={250}
                        height={80}
                        src="/logo-white.svg"
                        alt="logo"
                        className="img-fluid logo-color"
                      />
                    )}
                  </div>
                  <p>
                    Have questions?
                    <br/>
                    Reach out to us at{" "}
                    <Link href="mailto:support@copywriterpro.ai">
                      <a>
                        <span> <b> {'support@copywriterpro.ai'} </b> </span>
                      </a>
                    </Link>
                    {/* <a href="mailto:support@copywriterpro.ai"> support@copywriterpro.ai </a> */}
                  </p>

                  {/* <form className="newsletter-form position-relative d-block d-lg-flex d-md-flex">
                    <input
                      type="text"
                      className="input-newsletter form-control me-2"
                      placeholder="Enter your email"
                      name="email"
                      required
                      autoComplete="off"
                    />
                    <input
                      type="submit"
                      value="Subscribe"
                      data-wait="Please wait..."
                      className="btn btn-primary mt-3 mt-lg-0 mt-md-0"
                    />
                  </form> */}
                  {/* <div className="ratting-wrap mt-4">
                    <h6 className="mb-0">10/10 Overall rating</h6>
                    <Rating />
                  </div> */}
                </div>
              </div>
              <div className="col-md-12 col-lg-7 mt-4 mt-md-0 mt-lg-0">
                <div className="row">
                  {
                    Object.entries(footerMenus).map(([section, menus], sectionIndex) => (
                      <div key={sectionIndex + 1} className="col-md-4 col-lg-4 mt-4 mt-md-0 mt-lg-0">
                        <div className="footer-single-col">
                          <h3>{section}</h3>
                          <ul className="list-unstyled footer-nav-list mb-lg-0">
                          {
                            menus.map((menu, idx) => (
                              <li key={idx + 1}>
                                <Link href={menu.href}>
                                  <a className="text-decoration-none" target={menu.title === 'Facebook Group' ? "_blank" : "_self"}>
                                    {' '}
                                    {menu.title}
                                  </a>
                                </Link>
                              </li>
                            ))
                          }
                          </ul>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
          

          <div
            className={`footer-bottom ${
              footerLight ? 'footer-light' : 'bg-dark'
            } ${footerGradient ? 'bg-gradient' : ''} text-white py-4`}
          >
            <div className="container">
              <div className="row justify-content-between align-items-center">
                <div className="col-md-7 col-lg-7">
                  <div className="copyright-text">
                    <p className="mb-lg-0 mb-md-0">
                      &copy; { new Date().getFullYear() } CopywriterPro. All Rights Reserved.
                    </p>
                  </div>
                </div>
                <div className="col-md-4 col-lg-4">
                  <div className="footer-single-col text-start text-lg-end text-md-end">
                    <ul className="list-unstyled list-inline footer-social-list mb-0">
                      <li className="list-inline-item">
                        <Link href={networks.facebookPage}>
                          <a target="_blank">
                            <FaFacebook />
                          </a>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link href={networks.twitter}>
                          <a target="_blank">
                            <FaTwitter />
                          </a>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link href={networks.linkedin}>
                          <a target="_blank">
                            <FaLinkedin />
                          </a>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link href={networks.youtube}>
                          <a target="_blank">
                            <FaYoutube />
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
    </>
  );
};

export default dynamic(() => Promise.resolve(Footer), { ssr: false });
