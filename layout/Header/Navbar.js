import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiMenu, HiOutlineX } from 'react-icons/hi';

import OffCanvasMenu from './OffCanvasMenu';
import { navCommunityLinks } from '@/utils/data';
import dynamic from 'next/dynamic';

const Navbar = ({ navDark, classOption }) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const stickyheader = document.querySelector('.main-header');
    setHeaderTop(stickyheader.offsetTop);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header
      className={`main-header ${
        navDark ? 'position-absolute' : ''
      } w-100 ${classOption}`}
    >
      <nav
        className={`navbar navbar-expand-xl z-50 ${
          navDark ? 'navbar-dark' : 'navbar-light'
        } sticky-header ${scroll > headerTop ? 'affix' : ''}`}
      >
        <div className="container d-flex align-items-center justify-content-lg-between position-relative">
          <Link href="/">
            <a className="navbar-brand d-flex align-items-center mb-md-0 text-decoration-none">
              {scroll > headerTop || !navDark ? (
                <Image
                  width={190}
                  height={64}
                  src="/logo-color.svg"
                  alt="logo"
                  className="img-fluid logo-color"
                />
              ) : (
                <Image
                  width={190}
                  height={64}
                  src="/logo-white.svg"
                  alt="logo"
                  className="img-fluid logo-white"
                />
              )}
            </a>
          </Link>
          <button
            className="navbar-toggler position-absolute right-0 border-0"
            id="#offcanvasWithBackdrop"
            role="button"
          >
            <span
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBackdrop"
              aria-controls="offcanvasWithBackdrop"
            >
              <HiMenu />
            </span>
          </button>
          <div className="clearfix"></div>
          <div className="collapse navbar-collapse justify-content-center">
            <ul className="nav col-12 col-md-auto justify-content-center main-menu">
              {/* <li>
                <Link href="/">
                  <a className="nav-link">Home</a>
                </Link>
              </li> */}

              <li>
                <Link href="/services">
                  <a className="nav-link">Services</a>
                </Link>
              </li>

              <li>
                <Link href="/pricing">
                  <a className="nav-link">Pricing</a>
                </Link>
              </li>

              <li>
                <Link href="/blogs">
                  <a className="nav-link">Blogs</a>
                </Link>
              </li>
              
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Community
                </a>
                <div className="dropdown-menu border-0 rounded-custom shadow py-0 bg-white">
                  <div className="dropdown-grid rounded-custom width-half">
                    <div className="dropdown-grid-item">
                      {/* <h6 className="drop-heading">Community</h6> */}
                      {navCommunityLinks.map((navLink, i) => (
                        <div key={i + 1}>
                          <Link href={navLink.href}>
                            {navLink.type === 'social-network' ? (
                                <a className="dropdown-link px-0" target="_blank" rel="noopener">
                                  <span className="me-2">{navLink.icon}</span>
                                  <span className="drop-title mb-0">
                                    {navLink.title}{' '}
                                  </span>
                                </a>
                              ) : (
                                <a className="dropdown-link px-0">
                                  <span className="me-2">{navLink.icon}</span>
                                  <span className="drop-title mb-0">
                                    {navLink.title}{' '}
                                  </span>
                                </a>
                              )
                            }
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="action-btns text-end me-5 me-lg-0 d-none d-md-block d-lg-block">
            <Link href="/signin">
              <a className="btn btn-link text-decoration-none me-2">Sign In</a>
            </Link>
            <Link href="/signup">
              <a className="btn btn-primary">Start Writing for Free</a>
            </Link>
          </div>

          <div
            className="offcanvas offcanvas-end d-xl-none"
            tabIndex="-1"
            id="offcanvasWithBackdrop"
          >
            <div className="offcanvas-header d-flex align-items-center mt-4">
              <Link href="/">
                <a className="d-flex align-items-center mb-md-0 text-decoration-none">
                  <Image
                    width={190}
                    height={64}
                    src="/logo-color.svg"
                    alt="logo"
                    className="img-fluid ps-2"
                  />
                </a>
              </Link>
              <button
                type="button"
                className="close-btn text-danger"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <HiOutlineX />
              </button>
            </div>
            <OffCanvasMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
