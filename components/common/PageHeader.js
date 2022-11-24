/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FaFacebook, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const PageHeader = ({ title, description, integration, tags, blogMetaData }) => {
  const currentURL = window.location.href;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${currentURL}&t=${title}`;
  const twitterShare = `https://twitter.com/share?url=${currentURL}&text=${title}`;
  const linkedInShare = `https://www.linkedin.com/shareArticle?mini=true&url=${currentURL}&title=${title}`
  
  return (
    <>
      {integration ? (
        <section
          className="page-header position-relative overflow-hidden ptb-120 bg-dark"
          style={{
            background: "url('/page-header-bg.svg')no-repeat bottom left",
          }}
        >
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-8 col-12">
                <div className="company-info-wrap align-items-center">
                  <div className="company-logo p-4 bg-white shadow rounded-custom me-4 mt-2">
                    <div className="logo justify-content-center">
                      <img
                        src="/integations/2.png"
                        alt="company logo"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="company-overview">
                    <h1 className="display-5 fw-bold">{title}</h1>
                    <p className="lead mb-0">{description}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-12">
                <div className="action-btns mt-4 mt-lg-0 mt-xl-0">
                  <Link href="#">
                    <a className="btn btn-outline-light">Connect with Google</a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-circle rounded-circle circle-shape-3 position-absolute bg-dark-light right-5"></div>
          </div>
        </section>
      ) : (
        <section
          className="page-header position-relative overflow-hidden ptb-120 bg-dark"
          style={{
            background: "url('/page-header-bg.svg')no-repeat bottom left",
          }}
        >
          <div className="container">
            <div
              className={`row ${
                tags ? 'justify-content-center text-center' : ''
              }`}
            >
              <div className="col-lg-8 col-md-12">
                <h1 className="display-5 fw-bold">{title}</h1>
                {blogMetaData ? (
                  <div className='post-title'>
                    <div className='blog-meta-data'>
                      <p className="mt-4">{blogMetaData.author.name} {' • '} {blogMetaData.date}</p>
                    </div>
                    <div className='blog-sharing d-flex'>
                      <span className='me-3'>Share on</span>
                      <ul className="list-unstyled author-social-list social-bg-ts list-inline mb-0">
                      {/* footer-social-list */}
                        <li className="list-inline-item">
                          <Link href={facebookShare}>
                            <a target="_blank" rel="noopener">
                              <FaFacebook />
                            </a>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link href={twitterShare}>
                            <a target="_blank" rel="noopener">
                              <FaTwitter />
                            </a>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link href={linkedInShare}>
                            <a target="_blank" rel="noopener">
                              <FaLinkedinIn />
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="lead">{description}</p>
                )}
              </div>
            </div>
            {tags ? (
              <div className="row justify-content-center text-center">
                <div className="col-xl-8">
                  <Link href="#">
                    <a className="btn btn-soft-primary btn-pill btn-sm m-2">
                      Marketing
                    </a>
                  </Link>
                  <Link href="#">
                    <a className="btn btn-soft-primary btn-pill btn-sm m-2">
                      {' '}
                      Sales
                    </a>
                  </Link>
                  <Link href="#">
                    <a className="btn btn-soft-primary btn-pill btn-sm m-2">
                      {' '}
                      Design
                    </a>
                  </Link>
                  <Link href="#">
                    <a className="btn btn-soft-primary btn-pill btn-sm m-2">
                      {' '}
                      Development
                    </a>
                  </Link>
                  <Link href="#">
                    <a className="btn btn-soft-primary btn-pill btn-sm m-2">
                      {' '}
                      Product Design
                    </a>
                  </Link>
                  <Link href="#">
                    <a className="btn btn-soft-primary btn-pill btn-sm m-2">
                      {' '}
                      Customers
                    </a>
                  </Link>
                  <Link href="#">
                    <a className="btn btn-soft-primary btn-pill btn-sm m-2">
                      {' '}
                      Agency
                    </a>
                  </Link>
                  <Link href="#">
                    <a className="btn btn-soft-primary btn-pill btn-sm m-2">
                      {' '}
                      Investors
                    </a>
                  </Link>
                  <Link href="#">
                    <a className="btn btn-soft-primary btn-pill btn-sm m-2">
                      Research
                    </a>
                  </Link>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="bg-circle rounded-circle circle-shape-3 position-absolute bg-dark-light right-5"></div>
          </div>
        </section>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(PageHeader), { ssr: false });
