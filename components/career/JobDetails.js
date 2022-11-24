import React from 'react';
import Image from 'next/image';

import JobOverview from './JobOverview';

const JobDetails = () => {
  return (
    <section className="job-details ptb-120">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-8 pe-5">
            <div className="job-details-wrap">
              <h2>Job Details</h2>
              <p>
                Objectively restore stand-alone markets rather than
                enterprise-wide products. Uniquely underwhelm best-of-breed
                mindshare through adaptive niches. Seamlessly parallel task
                open-source content without resource sucking technology.
              </p>
              <div className="job-details-info mt-5">
                <h3 className="h5">Job Responsibilities</h3>
                <ul className="content-list list-unstyled">
                  <li>
                    Be involved in every step of the product design cycle from
                    discovery and user acceptance testing.
                  </li>
                  <li>
                    Work with BAs, product managers and tech teams to lead the
                    Product Design
                  </li>
                  <li>
                    Maintain quality of the design process and ensure that when
                    designs are translated into code they accurately.
                  </li>
                  <li>
                    Accurately estimate design tickets during planning sessions.
                  </li>
                  <li>
                    Contribute to sketching sessions involving
                    non-designersCreate, and pattern libraries.
                  </li>
                  <li>
                    Design pixel perfect responsive UI’s and understand that
                    adopting common interface
                  </li>
                  <li>
                    Interface patterns is better for UX than reinventing the
                    wheel
                  </li>
                </ul>
              </div>
              <div className="job-details-info mt-5">
                <h3 className="h5">Job Requirements</h3>
                <ul className="content-list list-unstyled">
                  <li>
                    Interactively plagiarize covalent outside the box thinking
                    vis-a-vis.
                  </li>
                  <li>
                    Holisticly communicate integrated channels via backend
                    interfaces. Authoritatively.
                  </li>
                  <li>
                    Globally actualize effective processes through synergistic
                    ROI. Interactively.
                  </li>
                </ul>
              </div>

              <div className="job-details-info mt-5">
                <h3 className="h5">Skill & Experience</h3>
                <ul className="content-list list-unstyled">
                  <li>
                    You have at least 3 years’ experience working as a Product
                    Designer.
                  </li>
                  <li>
                    You have experience using Sketch and InVision or Framer X
                  </li>
                  <li>
                    You have some previous experience working in an agile
                    environment – Think two-week sprints.
                  </li>
                  <li>
                    You are familiar using Jira and Confluence in your workflow
                  </li>
                </ul>
              </div>

              <Image
                width={820}
                height={454}
                src="/apply-now-1.jpg"
                className="img-fluid mt-5 rounded-custom"
                alt="apply"
              />
            </div>
          </div>
          <div className="col-lg-4">
            <JobOverview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
