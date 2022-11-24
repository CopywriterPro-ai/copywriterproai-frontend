import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import { cyberBlogData } from "@utils/data";
import Image from "next/image";
import Link from 'next/link';
import {FaArrowRight,FaUser,FaCalendar} from 'react-icons/fa'

SwiperCore.use([Pagination]);

const CyberBlog = () => {
  const swiperOption = {
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 1000,
    autoplay: {
      delay: 2500,
    },
    slidesPerGroup: 1,
    loop: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  };
  return (
    <section className="home-blog-section pt-60 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-12">
            <div className="section-heading text-center">
              <h4 className="text-primary h5">Recent Post</h4>
              <h2>Read our News & Articles</h2>
              <p>
                Assertively maximize cost effective methods of iterate team
                driven manufactured products through equity invested via
                customized benefits.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="cyber-blog">
            <Swiper {...swiperOption}>
                {cyberBlogData.map((item,i)=>(
                    <SwiperSlide key={i+1}>
                <div className="cyber-single-article mb-4 mb-lg-0 p-3 border">
                  <Link href="/blog-single" >
                    <a className="cyber-article-img text-decoration-none">
                    <Image
                      src={item.blogThumb}
                      alt="article"
                      width={386}
                      height={292}
                      className="img-fluid"
                    />
                     <div className="article-content">
                    <div className="article-info d-flex py-3">
                      <div className="pe-3">
                          <i className="pe-2"><FaUser/></i>
                          <span className="text-secondary">{item.postAuthor}</span>
                      </div>
                      <div>
                          <i className="pe-2"><FaCalendar/></i>
                          <span className="text-secondary">
                            {item.postDate}
                          </span>
                      </div>
                    </div>
                      <h2 className="h5 article-title limit-2-line-text">
                        The Steps to GainingPrivileged Access Security
                      </h2>
                        <div className="link-with-icon text-decoration-none"> {item.linkText} <i><FaArrowRight/></i></div>
                    </div>
                    </a>
                  </Link>
                </div>
              </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CyberBlog;
