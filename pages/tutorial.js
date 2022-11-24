import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Layout from '@/layout/Layout';
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

import { networks } from '@/utils/data';
import { tutorial as metaData } from '@/utils/metaData';
import { tutorial as pageHeader } from '@/utils/pageHeader';

const ComingSoon = () => {
  return (
    <Layout title={metaData.title} description={metaData.description}>
      <section
        className="coming-soon-section min-vh-100 ptb-120 overflow-hidden position-relative w-100 d-flex flex-column justify-content-center"
        style={{
          background: "url('/page-header-bg.svg')no-repeat bottom right",
        }}
      >
        <div className="bg-dark fixed-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-12">
              <div className="coming-soon-content-wrap position-relative z-2">
                <Link href="/">
                  <a className="mb-5 d-block">
                    <Image
                      width={250}
                      height={80}
                      src="/logo-white.svg"
                      alt="logo"
                      className="img-fluid logo-color"
                    />
                  </a>
                </Link>

                {/* <h5 className="text-white">We are Coming Soon...</h5> */}
                <h1 className="text-white">
                  We Are Working on This Page. Please Stay With Us!	
                </h1>
                <div className="action-btns">
                  <Link href="/contact-us">
                    <a className="btn btn-primary mt-5 popup-with-form">
                      Notify Me!
                    </a>
                  </Link>
                </div>

                <div className="social-list-wrap mt-60">
                  <ul className="list-unstyled author-social-list social-bg-ts list-inline mb-0">
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

          <ul className="animated-circle list-unstyled z--1">
            <li className="transition-delay-1 bg-danger"></li>
            <li className="transition-delay-2 bg-warning"></li>
            <li className="transition-delay-3 bg-primary"></li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default ComingSoon;
