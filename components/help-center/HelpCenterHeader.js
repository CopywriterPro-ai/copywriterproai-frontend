import React from 'react';

const HelpCenterHeader = () => {
  return (
    <section
      className="page-header position-relative overflow-hidden ptb-120 bg-dark"
      style={{
        background: "url('/page-header-bg.svg')no-repeat bottom left",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-12">
            <div className="text-center">
              <h1 className="display-5 fw-bold">Support</h1>
              <p className="lead">
                Seamlessly actualize client-based users after out-of-the-box
                value. Globally embrace strategic high-quality platforms before
                frictionless expertise.
              </p>

              <div className="form-block-banner mw-60 m-auto mt-5">
                <form name="search" className="search-form d-flex">
                  <input
                    type="email"
                    className="form-control me-2"
                    name="search"
                    data-name="search"
                    placeholder="Search for a topic or question"
                    id="searchForm"
                    required=""
                  />
                  <input
                    type="button"
                    value="Search"
                    data-wait="Please wait..."
                    className="btn btn-primary"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-circle rounded-circle circle-shape-3 position-absolute bg-dark-light right-5"></div>
      </div>
    </section>
  );
};

export default HelpCenterHeader;
