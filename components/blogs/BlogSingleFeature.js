import React from 'react';

import ProfileCard from './ProfileCard';

const BlogSingleFeature = ({ blog }) => {
  return (
    <>
      <section className="blog-details ptb-60">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 pe-2" dangerouslySetInnerHTML={{ __html: blog }} />
            {/* <div className="col-lg-4">
              <ProfileCard />
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSingleFeature;
