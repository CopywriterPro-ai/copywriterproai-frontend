import React from 'react';
import Link from 'next/link';
import { navCommunityLinks } from '@/utils/data';

const OffCanvasMenu = () => {
  return (
    <div className="offcanvas-body">
      <ul className="nav col-12 col-md-auto justify-content-center main-menu">
        <li>
          <Link href="/">
            <a className="nav-link">Home</a>
          </Link>
        </li>

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
      <div className="action-btns mt-4 ps-3">
        <Link href="/signin">
          <a className="btn btn-outline-primary text-decoration-none me-2">Sign In</a>
        </Link>
        <Link href="/signup">
          <a className="btn btn-primary">Start Writing for Free</a>
        </Link>
      </div>
    </div>
  );
};

export default OffCanvasMenu;
