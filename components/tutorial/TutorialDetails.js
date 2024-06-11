import React from 'react';
import Link from 'next/link';
import { BiCommentDetail } from 'react-icons/bi';
import { FaRegEnvelope, FaRegListAlt } from 'react-icons/fa';
import { GoChevronDown } from 'react-icons/go';
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import styled from "styled-components";
import { tutorials } from '@/utils/data';

const TutorialDetails = ({ doc }) => {
  const router = useRouter();
  if (!router.isFallback && !doc?.content) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <section className="support-content ptb-120">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-4 col-md-4 d-none d-md-block d-lg-block">
              <div className="support-article-sidebar sticky-sidebar">
                <div className="nav flex-column nav-pills support-article-tab bg-light rounded-custom p-5 d-none d-md-block d-lg-block">
                  <ul className="list-unstyled ps-0">
                    {
                      tutorials.map((tutorial, index) => {
                        return (
                          <li className="mb-1" key={index}>
                            <div className="d-flex justify-content-between">
                              <button
                                className="nav-link btn-toggle align-items-center rounded collapsed"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${tutorial.caterory}`}
                                aria-expanded="true">
                                {tutorial.caterory}
                              </button>
                              <i><GoChevronDown/></i>
                            </div>

                            <div className="collapse ms-3 mt-2" id={tutorial.caterory}>
                              <div
                                className="nav flex-column nav-pills support-article-tab bg-light "
                                id="v-pills-support"
                                role="tablist"
                                aria-orientation="vertical"
                              >
                                {
                                  tutorial.listItem.map((tool, toolIndex) => {
                                    return (
                                      <Link href={`/tutorial${tool.href}`} key={toolIndex}>
                                        <button
                                          className="nav-link text-start"
                                          data-bs-target="#support-tab-1"
                                          type="button"
                                          role="tab"
                                          aria-selected="true"
                                        >
                                          {tool.tool}
                                        </button>
                                      </Link>
                                    )
                                  })
                                }
                              </div>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
                <div className="bg-light p-5 mt-4 rounded-custom quick-support">
                  <Link href="/contact-us">
                    <a className="text-decoration-none text-muted d-flex align-items-center py-2">
                      <div className="quick-support-icon rounded-circle bg-success-soft me-3">
                        <i className="far text-success">
                          <FaRegListAlt />
                        </i>
                      </div>
                      <div className="contact-option-text">
                        Quick Support Form
                      </div>
                    </a>
                  </Link>
                  <Link href="mailto:support@copywriterpro.ai">
                    <a className="text-decoration-none text-muted d-flex align-items-center py-2">
                      <div className="quick-support-icon rounded-circle bg-primary-soft me-3">
                        <i className="far text-primary">
                          <FaRegEnvelope />
                        </i>
                      </div>
                      <div className="contact-option-text">
                        support@copywriterpro.ai
                      </div>
                    </a>
                  </Link>
                  {/* <Link href="#!">
                    <a className="text-decoration-none text-muted d-flex align-items-center py-2">
                      <div className="quick-support-icon rounded-circle bg-danger-soft me-3">
                        <i className="far text-danger">
                          <BiCommentDetail />
                        </i>
                      </div>
                      <div className="contact-option-text">
                        Live Support Chat
                      </div>
                    </a>
                  </Link> */}
                </div>
              </div>
            </div>
            
            <div className="col-lg-8 col-md-8 p-lg-5">
              <div className="support-article-wrap">
                <div>
                  <TutorialWrapper dangerouslySetInnerHTML={{ __html: doc.content }}></TutorialWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const TutorialWrapper = styled.div`
  h2, h3, h4, h5, h6 {
    line-height: 3;
  }
  img {
    margin-top: 2rem;
    width: 100%;
  }
`;

export default TutorialDetails;
