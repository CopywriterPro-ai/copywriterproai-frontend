import { cryptoBlogData } from "@utils/data";
import React from "react";
import Link from 'next/link';
import Image from "next/image";

const CryptoBlog = () => {
  return (
    <section className="crypto-blog bg-dark-black">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-title text-center mb-5">
              <h2 className="text-white">Cryptocurrency Recent Posts </h2>
              <p>
                Right Click on the Download Button in the Font Post and Copy
                Link Address and Paste it in the New Tab The Download will Start
                Automatically.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
            {cryptoBlogData.map((item,i)=>(
                <div className="col-lg-4 col-md-6" key={i+1}>
                 <div className="crypto-blog-card bg-soft-black mb-30 mb-lg-0">
                 <Link href="/blog-single" passHref>
                    <a className="text-decoration-none text-white">
                    <div className="blog-thumb">
                    <Image
                      src={item.blogThumb}
                      className="img-fluid"
                      alt="thumb"
                      width={368} height={240}
                      layout='responsive'
                    />
                    </div>
                    <h3 className="h4 fw-medium text-white">     
                    {item.blogTitle}
                    </h3>
                    <p className="m-0">
                  {item.blogExerpt}
                    </p>
                    <div className="author-meta d-flex align-items-center py-4">
                  <div className="pe-3">
                    <Image
                      src={item.authorAvatar}
                      alt="Avatar"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div>
                    <h5 className="fw-normal h6 m-0 text-white">{item.authorName}</h5>
                    <span className="text-muted">{item.postDate}</span>
                  </div>
                </div>
                    </a>
                </Link>
                 </div>
               </div>
            ))}
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-3">
            <div className="text-center mt-5">
              <Link
                href="/blogs"
              >
                  <a className="btn-outline-primary btn rounded-pill">
                  All Blog Post
                  </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoBlog;
