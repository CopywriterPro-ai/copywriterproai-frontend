import React from 'react';
import Link from 'next/link';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { GiEntryDoor } from "react-icons/gi";
import { MdFreeCancellation, MdOutlineCompare, MdOutlineDashboardCustomize, MdMiscellaneousServices } from "react-icons/md"

import SectionTitle from '../common/AppSectionTitle';
import { faqData } from '../../utils/data';

const Icons = {
  freeService : MdMiscellaneousServices,
  entry: GiEntryDoor,
  competition: MdOutlineCompare,
  securePayment: RiSecurePaymentFill,
  cancelSubscription: MdFreeCancellation,
  feature: MdOutlineDashboardCustomize,
};

const FaqThree = () => {
  return (
    <section className="faq-section ptb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-12">
            <SectionTitle
              subtitle="FAQ"
              title="Frequently Asked Questions"
              description="Our AI copywriting tool is designed to help you create high-quality content quickly and easily, and we're always here to help you make the most of it."
              centerAlign
            />
          </div>
        </div>
        <div className="row justify-content-center">
          {
            faqData.map((faq) => {
              const Icon = Icons[faq.icon];
              return (
                <div key={faq.id} className="col-lg-6 col-md-10">
                  <div
                    className="faq-content-wrap d-flex mb-5"
                    data-aos="fade-up"
                    data-aos-delay={faq.id * 50}
                  >
                    <span className="faq-icon me-3">
                      <i className="text-primary">
                        <Icon className="fal mb-2" />
                      </i>
                    </span>
                    <div className="faq-info">
                      <h5>{faq.question}</h5>
                      <p className="mb-0">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="container">
        <div
          className="bg-dark shadow-lg p-5 rounded-custom  mt-lg-4 mt-3"
          data-aos="fade-up"
          data-aos-delay="250"
        >
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-7">
              <div className="cta-content">
                <h3 className="mb-2">Have More Questions?</h3>
                <p className="mb-lg-0 mb-xl-0">
                  Drop us a note and we’ll get back to you soon
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="action-btns text-lg-end">
                <Link href="/contact-us">
                  <a className="btn btn-light">Get in Touch</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqThree;
