/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { blogs } from '@/utils/blogs';

const blogRoute = '/blogs';
const blogImagesRoute = '/blog-images';

const BlogFeature = () => {
  return (
    <section className="masonary-blog-section ptb-120">
      <div className="container">
        {/* <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="single-article feature-article rounded-custom my-3">
              <Link href="/blog-single">
                <a className="article-img">
                  <img
                    src="/blog/blog-10.jpg"
                    alt="article"
                    className="img-fluid"
                  />
                </a>
              </Link>
              <div className="article-content p-4">
                <div className="article-category mb-4 d-block">
                  <a
                    href="#!"
                    className="d-inline-block text-dark badge bg-primary-soft"
                  >
                    Marketing
                  </a>
                </div>
                <Link href="/blog-single">
                  <a>
                    <h2 className="h5 article-title limit-2-line-text">
                      Why product managers must be strategic about chasing new
                      trends
                    </h2>
                  </a>
                </Link>
                <p className="limit-2-line-text">
                  Society is fragmenting into two parallel realities. In one
                  reality, you have infinite upside and opportunity. In the
                  other reality, you'll continue to see the gap between your
                  standard of living and those at the top grow more and more.
                </p>

                <a href="#!">
                  <div className="d-flex align-items-center pt-4">
                    <div className="avatar">
                      <img
                        src="/testimonial/1.jpg"
                        alt="avatar"
                        width="40"
                        className="img-fluid rounded-circle me-3"
                      />
                    </div>
                    <div className="avatar-info">
                      <h6 className="mb-0 avatar-name">Donna Martin</h6>
                      <span className="small fw-medium text-muted">
                        April 24, 2022
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="single-article feature-article rounded-custom my-3">
              <Link href="/blog-single">
                <a className="article-img">
                  <img
                    src="/blog/blog-11.jpg"
                    alt="article"
                    className="img-fluid"
                  />
                </a>
              </Link>
              <div className="article-content p-4">
                <div className="article-category mb-4 d-block">
                  <a
                    href="#!"
                    className="d-inline-block text-dark badge bg-danger-soft"
                  >
                    Development
                  </a>
                </div>
                <Link href="/blog-single">
                  <a>
                    <h2 className="h5 article-title limit-2-line-text">
                      Two tried-and-true frameworks for achieving product/market
                      fit
                    </h2>
                  </a>
                </Link>
                <p className="limit-2-line-text">
                  Society is fragmenting into two parallel realities. In one
                  reality, you have infinite upside and opportunity. In the
                  other reality, you'll continue to see the gap between your
                  standard of living and those at the top grow more and more.
                </p>

                <a href="#!">
                  <div className="d-flex align-items-center pt-4">
                    <div className="avatar">
                      <img
                        src="/testimonial/4.jpg"
                        alt="avatar"
                        width="40"
                        className="img-fluid rounded-circle me-3"
                      />
                    </div>
                    <div className="avatar-info">
                      <h6 className="mb-0 avatar-name">Donna Martin</h6>
                      <span className="small fw-medium text-muted">
                        April 24, 2022
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div> */}
        <div className="row">
          {blogs.map((blog, i) => (
            <div key={i + 1} className="col-lg-4 col-md-6">
              <div className="single-article rounded-custom my-3">
                <Link href={blogRoute + blog.link}>
                  <a className="article-img">
                    <img className="animate-element"
                      src={`${blogImagesRoute}${blog.link}${blog.link}.webp`}
                      alt="article"
                    />
                  </a>
                </Link>
                <div className="article-content p-4">
                  <div className="article-category mb-4 d-block">
                    {/* <a
                      href="#!"
                      className={`d-inline-block text-dark badge ${blog.class}`}
                    >
                      {blog.tags}
                    </a> */}
                  </div>
                  <Link href={blogRoute + blog.link}>
                    <a>
                      <h2 className="h5 article-title limit-2-line-text">
                        {blog.title}
                      </h2>
                    </a>
                  </Link>
                  <p className="limit-2-line-text">{blog.description}</p>

                  <a href="#!">
                    <div className="d-flex align-items-center pt-4">
                      <div className="avatar">
                        <img
                          src={blog.author.photo}
                          alt="avatar"
                          width="40"
                          className="img-fluid rounded-circle me-3"
                        />
                      </div>
                      <div className="avatar-info">
                        <h6 className="mb-0 avatar-name">{blog.author.name} </h6>
                        <span className="small fw-medium text-muted">
                          {blog.date}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="row justify-content-center align-items-center mt-5">
          <div className="col-auto my-1">
            <a href="#!" className="btn btn-soft-primary btn-sm">
              Previous
            </a>
          </div>
          <div className="col-auto my-1">
            <nav>
              <ul className="pagination rounded mb-0">
                <li className="page-item">
                  <a className="page-link" href="#!">
                    1
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#!">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#!">
                    3
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-auto my-1">
            <a href="#!" className="btn btn-soft-primary btn-sm">
              Next
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default BlogFeature;
