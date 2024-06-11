import React from 'react';
import Link from 'next/link';
import {
  BiBriefcase,
  BiBuildingHouse,
  BiCurrentLocation,
  BiWallet,
} from 'react-icons/bi';

import SectionTitle from '../common/SectionTitle';
import { careerJobCard } from '../../utils/data';

const RelatedJob = () => {
  return (
    <section className="related-job-list ptb-120 bg-light">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-4 col-md-12">
            <SectionTitle
              subtitle="Related Jobs"
              title="More Openings Jobs at Quiety"
            />
          </div>
          <div className="col-lg-7 col-md-12">
            <p>
              Phosfluorescently disintermediate revolutionary paradigms before
              enabled interfaces. Dynamically transition skills vis-a-vis
              virtual customer service via impactful partnerships with
              technically sound paradigms with cutting-edge initiatives.{' '}
            </p>
          </div>
        </div>
        <div className="row">
          {careerJobCard.slice(0, 3).map((jobCard, i) => (
            <div key={i + 1} className="col-lg-4 col-md-6">
              <div className="text-decoration-none mt-4 mt-lg-0 mt-xl-0 single-open-job p-5 bg-white d-block rounded-custom">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted h6 mb-2 job-time">
                    <i className="far fa-lg me-2">
                      <BiBriefcase className="mb-1" />
                    </i>{' '}
                    {jobCard.type}
                  </span>
                  <span
                    className={`badge rounded-pill px-3 py-2 mb-3 ${jobCard.className} small`}
                  >
                    {jobCard.position}
                  </span>
                </div>
                <h3 className="h5">{jobCard.title} </h3>
                <ul className="job-info-list list-inline list-unstyled text-muted">
                  {jobCard.listItem.map((list, i) => (
                    <span key={i + 1}>
                      <li className="list-inline-item">
                        <span className="far fa-lg me-1">
                          <BiBuildingHouse className="mb-1" />
                        </span>{' '}
                        {list.media}
                      </li>
                      <li className="list-inline-item">
                        <span className="far fa-lg me-1">
                          <BiCurrentLocation className="mb-1" />
                        </span>{' '}
                        {list.location}
                      </li>
                      <li className="list-inline-item">
                        <span className="far fa-lg me-1">
                          <BiWallet className="mb-1" />
                        </span>{' '}
                        {list.salary}
                      </li>
                    </span>
                  ))}
                </ul>
                <Link href="/career-single" passHref>
                  <div className="btn btn-primary btn-sm d-inline-block mt-4">
                    Apply Now
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedJob;
