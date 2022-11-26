import React from 'react';
import Image from 'next/image';
import { AiOutlineSelect, AiFillRead, AiFillEdit } from 'react-icons/ai';
import { MdEditNote } from 'react-icons/md';

const WorkProcessOne = () => {
  return (
    <section className="work-process ptb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-10">
            <div className="section-heading text-center">
              <h4 className="h5 text-primary">Process</h4>
              <h2>Get Your Writing Done in 4 Simple Steps</h2>
              <p>
                Make writing a breeze with our AI Copywriting Tool. Our four-step process makes it easy to get started and finish your project with ease.
              </p>
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-5 col-md-12 order-1 order-lg-0">
            <div className="img-wrap">
              <Image
                width={526}
                height={621}
                src="/writing-steps.webp"
                alt="work process"
                className="img-fluid rounded-custom"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 order-0 order-lg-1">
            <ul className="work-process-list list-unstyled">
              <li className="d-flex align-items-start mb-4">
                <div className="process-icon-2 border border-2 rounded-custom bg-white me-4 mt-2">
                  <i className="far fa-2x">
                    <AiOutlineSelect />
                  </i>
                </div>
                <div className="icon-content">
                  <span className="text-primary h6">Step 1</span>
                  <h3 className="h5 mb-2">Pick a Writing Tool</h3>
                  <p>
                    We offer a variety of options to fit different content needs. Choose any one from over 50+ AI copywriting tools.
                  </p>
                </div>
              </li>
              <li className="d-flex align-items-start mb-4">
                <div className="process-icon-2 border border-2 rounded-custom bg-white me-4 mt-2">
                  <i className="far fa-3x">
                    {' '}
                    <AiFillEdit />
                  </i>
                </div>
                <div className="icon-content">
                  <span className="text-primary h6">Step 2</span>
                  <h3 className="h5 mb-2">Tell Us What the Content Is About</h3>
                  <p>
                    Provide a brief description of what you need the content to cover. This could be a brief description or a few keywords.
                  </p>
                </div>
              </li>
              <li className="d-flex align-items-start mb-4">
                <div className="process-icon-2 border border-2 rounded-custom bg-white me-4 mt-2">
                  <i className="far fa-2x">
                    <AiFillRead />
                  </i>
                </div>
                <div className="icon-content">
                  <span className="text-primary h6">Step 3</span>
                  <h3 className="h5 mb-2">Go Through the Results</h3>
                  <p>
                    Our AI copywriting tool will generate a list of potential content based on the  pieces of information you&apos;ve provided. Pick the one that best suits your needs.
                  </p>
                </div>
              </li>
              <li className="d-flex align-items-start mb-4 mb-lg-0">
                <div className="process-icon-2 border border-2 rounded-custom bg-white me-4 mt-2">
                  <i className="far fa-2x">
                    {' '}
                    <MdEditNote />
                  </i>
                </div>
                <div className="icon-content">
                  <span className="text-primary h6">Step 4</span>
                  <h3 className="h5 mb-2">Make Changes and Publish</h3>
                  <p>
                    Review the results and make any necessary changes, like rewriting a sentence or simplifying a piece of content. Once you&apos;re happy with the final product, publish it to your website or blog.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcessOne;
