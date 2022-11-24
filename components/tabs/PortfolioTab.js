import Image from "next/image";
import React from "react";


const PortfolioTab = () => {
  return (
    <section className="portfolio bg-light ptb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-10">
            <div className="section-heading text-center">
              <h2>Our Portfolio</h2>
              <p>
                Credibly grow premier ideas rather than bricks-and-clicks
                strategic theme areas distributed for stand-alone web-readiness.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div className="tab-button mb-5">
              <ul
                className="nav nav-pills d-flex justify-content-center"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-all-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-all"
                    type="button"
                    role="tab"
                    aria-controls="pills-all"
                    aria-selected="true"
                  >
                    All
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-branding-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-branding"
                    type="button"
                    role="tab"
                    aria-controls="pills-branding"
                    aria-selected="false"
                  >
                    Branding
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-design-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-design"
                    type="button"
                    role="tab"
                    aria-controls="pills-design"
                    aria-selected="false"
                  >
                    Design
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-logo-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-logo"
                    type="button"
                    role="tab"
                    aria-controls="pills-logo"
                    aria-selected="false"
                  >
                    Logo
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-web-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-web"
                    type="button"
                    role="tab"
                    aria-controls="pills-web"
                    aria-selected="false"
                  >
                    Web
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-all"
              role="tabpanel"
              aria-labelledby="pills-all-tab"
            >
              <div className="row">
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio1.jpg"
                        alt="portfolio"
                        width={416}
                        height={385}
                        className="Image-fluid"
                      />
                      <div className="portfolio-info">
                        <div className="categories">
                          <span>Design,</span>
                          <span>Web</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio2.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                        <div className="categories">
                          <span>Branding,</span>
                          <span>Logo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio3.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                        
                        <div className="categories">
                          <span>Branding,</span>
                          <span>Logo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio4.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                       
                        <div className="categories">
                          <span>Design</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio5.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                        
                        <div className="categories">
                          <span>Branding,</span>
                          <span>Logo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio6.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                        
                        <div className="categories">
                          <span>Branding,</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="pills-branding"
              role="tabpanel"
              aria-labelledby="pills-branding-tab"
            >
              <div className="row">
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio2.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                        
                        <div className="categories">
                          <span>Branding,</span>
                          <span>Logo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio3.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                        
                        <div className="categories">
                          <span>Branding,</span>
                          <span>Logo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio4.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                        
                        <div className="categories">
                          <span>Design</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="pills-design"
              role="tabpanel"
              aria-labelledby="pills-design-tab"
            >
              <div className="row">
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio1.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                      
                        <div className="categories">
                          <span>Design,</span>
                          <span>Web</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio5.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                        <div className="categories">
                          <span>Branding,</span>
                          <span>Logo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio6.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                        <div className="categories">
                          <span>Branding,</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="pills-logo"
              role="tabpanel"
              aria-labelledby="pills-logo-tab"
            >
              <div className="row">
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio1.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                        <div className="categories">
                          <span>Design,</span>
                          <span>Web</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio2.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                        <div className="categories">
                          <span>Branding,</span>
                          <span>Logo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio3.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                        <div className="categories">
                          <span>Branding,</span>
                          <span>Logo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="pills-web"
              role="tabpanel"
              aria-labelledby="pills-web-tab"
            >
              <div className="row">
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio1.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                        <div className="categories">
                          <span>Design,</span>
                          <span>Web</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio5.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                        <div className="categories">
                          <span>Branding,</span>
                          <span>Logo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-portfolio-item mb-30">
                    <div className="portfolio-item-Image">
                      <Image
                        src="/portfolio/portfolio2.jpg"
                        alt="portfolio "
                        className="Image-fluid"
                        width={416}
                        height={385}
                      />
                      <div className="portfolio-info">
                        <div className="categories">
                          <span>Branding,</span>
                          <span>Logo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioTab;
