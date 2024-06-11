import React from 'react';
import Link from 'next/link';

import SectionTitle from '../common/AppSectionTitle';

import { FaCheckCircle } from 'react-icons/fa';
import { MdEditNote, MdOutlinePlagiarism } from 'react-icons/md';
import { HiOutlineSpeakerphone, HiOutlineMail } from 'react-icons/hi';
import { CgWebsite } from 'react-icons/cg';

const FeatureTwo = ({ cardDark }) => {
  return (
    <>
      <section
        className={`feature-section ptb-120 ${
          cardDark ? 'bg-dark' : 'bg-light'
        }`}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-10">
              {cardDark ? (
                <SectionTitle
                  subtitle="Services"
                  title="Your One-Stop Shop for All Your Writing Needs"
                  description="Whether you need a little help getting started or want someone to take care of the whole project, our AI copywriting tool has you covered."
                  centerAlign
                  dark
                />
              ) : (
                <SectionTitle
                  subtitle="Services"
                  title="Your One-Stop Shop for All Your Writing Needs"
                  description="Whether you need a little help getting started or want someone to take care of the whole project, our AI copywriting tool has you covered."
                  centerAlign
                />
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="feature-grid">
                <div
                  className={`shadow-sm highlight-card rounded-custom p-5 ${
                    cardDark
                      ? 'bg-custom-light promo-border-hover border border-2 border-light text-white'
                      : 'bg-white'
                  }`}
                  data-aos="fade-up"
                  data-aos-delay="50"
                >
                  <div className="media d-flex align-items-center py-2">
                    <div className="icon-box d-inline-block rounded-circle bg-primary-soft mb-25">
                      <span className="fal text-primary text-center">
                        <MdEditNote className="fal fa-analytics icon-sm text-primary" />
                      </span>
                    </div>
                  </div>
                  
                  <div className="feature-content">
                    <h3 className="h5">Text Enhancer</h3>
                    <p>
                      Enhance your writing to sound more professional and accurate. Whether you need to rewrite a sentence, summarize, simplify content, or want to change the tone, our AI-powered tools will find the perfect words for your text.
                    </p>
                    <h6 className="mt-4">Upgrade your content with...</h6>
                    <ul className="list-unstyled mb-0">
                      <li className="py-1">
                        <FaCheckCircle className="fas me-2 text-primary mb-1" />
                        Paraphraser
                      </li>
                      <li className="py-1">
                        <FaCheckCircle className="fas me-2 text-primary mb-1" />
                        Expander
                      </li>
                      <li className="py-1">
                       <FaCheckCircle className="fas me-2 text-primary mb-1" />
                        Simplifier
                      </li>
                      <li className="py-1">
                        <FaCheckCircle className="fas me-2 text-primary mb-1" />
                        Summarizer
                      </li>
                      <li className="py-1">
                        <FaCheckCircle className="fas me-2 text-primary mb-1" />
                        Grammar Fixer
                      </li>
                      <li className="py-1">
                        <FaCheckCircle className="fas me-2 text-primary mb-1" />
                        Tone Changer
                      </li>
                    </ul>
                  </div>
                  {/* <Link href="/single-service">
                    <a className="link-with-icon text-decoration-none mt-3">
                      {' '}
                      View Details <i className="far fa-arrow-right"></i>
                    </a>
                  </Link> */}
                </div>
                <div
                  className={`feature-card shadow-sm rounded-custom p-5 ${
                    cardDark
                      ? 'bg-custom-light promo-border-hover border border-2 border-light text-white'
                      : 'bg-white'
                  }`}
                  data-aos="fade-up"
                  data-aos-delay="50"
                >
                  <div className="media d-flex align-items-center py-2">
                    <div className="icon-box d-inline-block rounded-circle bg-success-soft mb-25">
                      <span className="fal text-primary text-center">
                        <HiOutlineSpeakerphone className="fal fa-analytics icon-sm text-success" />
                      </span>
                    </div>
                  </div>
                  <div className="feature-content">
                    <h3 className="h5">Ad & Sales Copywriting</h3>
                    <p className="mb-0">
                      CopywriterPro will help you write effective and persuasive copy that accurately describe your product or service and persuade people to buy.
                    </p>
                  </div>
                  {/* <Link href="/single-service">
                    <a className="link-with-icon text-decoration-none mt-3">
                      {' '}
                      View Details <i className="far fa-arrow-right"></i>
                    </a>
                  </Link> */}
                </div>
                <div
                  className={`feature-card shadow-sm rounded-custom p-5 ${
                    cardDark
                      ? 'bg-custom-light promo-border-hover border border-2 border-light text-white'
                      : 'bg-white'
                  }`}
                  data-aos="fade-up"
                  data-aos-delay="50"
                >
                  <div className="media d-flex align-items-center py-2">
                    <div className="icon-box d-inline-block rounded-circle bg-danger-soft mb-25">
                      <span className="fal text-primary text-center">
                        <HiOutlineMail className="fal fa-analytics icon-sm text-danger" />
                      </span>
                    </div>
                  </div>
                  <div className="feature-content">
                    <h3 className="h5">Email Copywriting</h3>
                    <p className="mb-0">
                      Get help writing email copy that engages and sells. From subject lines to calls to action, our AI writing tools will help you create high-converting email copy.
                    </p>
                  </div>
                  {/* <Link href="/single-service">
                    <a className="link-with-icon text-decoration-none mt-3">
                      {' '}
                      View Details <i className="far fa-arrow-right"></i>
                    </a>
                  </Link> */}
                </div>
                <div
                  className={`feature-card shadow-sm rounded-custom p-5 ${
                    cardDark
                      ? 'bg-custom-light promo-border-hover border border-2 border-light text-white'
                      : 'bg-white'
                  }`}
                  data-aos="fade-up"
                  data-aos-delay="50"
                >
                  <div className="media d-flex align-items-center py-2">
                    <div className="icon-box d-inline-block rounded-circle bg-dark-soft mb-25">
                      <span className="fal text-primary text-center">
                        <CgWebsite className="fal fa-analytics icon-sm text-dark" />
                      </span>
                    </div>
                  </div>
                  <div className="feature-content">
                    <h3 className="h5">Website Copywriting</h3>
                    <p className="mb-0">
                      Give your website a facelift with our website copywriting tool. From meta descriptions to product descriptions, we will turn bad copy into great copy.
                    </p>
                  </div>
                  {/* <Link href="/single-service">
                    <a className="link-with-icon text-decoration-none mt-3">
                      View Details <i className="far fa-arrow-right"></i>
                    </a>
                  </Link> */}
                </div>
                <div
                  className={`feature-card shadow-sm rounded-custom p-5 ${
                    cardDark
                      ? 'bg-custom-light promo-border-hover border border-2 border-light text-white'
                      : 'bg-white'
                  }`}
                  data-aos="fade-up"
                  data-aos-delay="50"
                >
                  <div className="media d-flex align-items-center py-2">
                    <div className="icon-box d-inline-block rounded-circle bg-warning-soft mb-25">
                      <span className="fal text-primary text-center">
                        <MdOutlinePlagiarism className="fal fa-analytics icon-sm text-warning" />
                      </span>
                    </div>
                  </div>
                  <div className="feature-content">
                    <h3 className="h5">Plagiarism Checker</h3>
                    <p className="mb-0">
                    Make sure your content is original and plagiarism-free. CopywriterPro will scan your text for any potential plagiarism issues and flag them for you.
                    </p>
                  </div>
                  {/* <Link href="/single-service">
                    <a className="link-with-icon text-decoration-none mt-3">
                      {' '}
                      View Details <i className="far fa-arrow-right"></i>
                    </a>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureTwo;
