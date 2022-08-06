import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

import externalLink from "data/externallink.json";
import Logo from "assets/images/logo-color.png";
import { useResponsive } from "hooks";

const year = new Date().getFullYear();

const ListItem = ({ to = "/", title }) => {
  return (
    <li>
      <Link href={to}>{title}</Link>
    </li>
  );
};

const ListItemHash = ({ to = "/", title }) => {
  return (
    <li>
      <Link smooth href={to}>
        {title}
      </Link>
    </li>
  );
};

const ListItemAnchor = ({ to = "/", title }) => {
  return (
    <li>
      <a href={to} target="__blank">
        {title}
      </a>
    </li>
  );
};

const ListItemSocial = ({ to = "/", title, icon }) => {
  return (
    <SocialIconListStyled>
      <span className={`fab fa-${icon}`} />
      <a href={to} target="__blank">
        {title}
      </a>
    </SocialIconListStyled>
  );
};

const SocialIconListStyled = styled.li`
  padding: 6px 0;
  a {
    color: black;
    padding-left: 15px;

    &:hover {
      text-decoration: none;
    }
  }
`;

const GuestFooter = () => {
  const { isDesktop } = useResponsive();

  return (
    <AppFooter>
      <div className="container">
        <FooterContent className="row justify-content-between">
          {isDesktop && (
            <div className="col-md-4">
              <FooterBrand>
                <Image
                  src={Logo.src}
                  alt="copywriterpro"
                  layout="fixed"
                  height={40}
                  width={185}
                />
                <p>© {year} CopywriterPro. All rights reserved.</p>
                <ul>
                  <ListItemSocial
                    to={externalLink.facebookPage}
                    title="Facebook"
                    icon="facebook-square"
                  />
                  <ListItemSocial
                    to={externalLink.twitter}
                    title="Twitter"
                    icon="twitter"
                  />
                  <ListItemSocial
                    to={externalLink.linkedin}
                    title="LinkedIn"
                    icon="linkedin"
                  />
                </ul>
              </FooterBrand>
            </div>
          )}
          <div className="col-6 col-md-2">
            <FooterList>
              <h4>Explore</h4>
              <ul>
                <ListItemHash to="/#features" title="Features" />
              </ul>
            </FooterList>
          </div>
          <div className="col-6 col-md-2">
            <FooterList>
              <h4>Support</h4>
              <ul>
                <ListItemAnchor
                  to={externalLink.facebookGroup}
                  title="Facebook Group"
                />
                <ListItem to="/feature-request" title="Request a Feature" />
                <ListItem to="/bug-report" title="Report a bug" />
                <ListItem to="/contact-us" title="Contact Us" />
              </ul>
            </FooterList>
          </div>
          <div className="col-6 col-md-2">
            <FooterList>
              <h4>Company</h4>
              <ul>
                {/* <ListItem to="/" title="Careers" /> */}
                <ListItem to="/privacy" title="Privacy Policy" />
                <ListItem to="/terms" title="Terms & Conditions" />
              </ul>
            </FooterList>
          </div>
        </FooterContent>
        {!isDesktop && (
          <FooterBrandMobile>
            <hr />
            <p>© {year} CopywriterPro. All rights reserved.</p>
          </FooterBrandMobile>
        )}
      </div>
    </AppFooter>
  );
};

const AppFooter = styled.footer`
  @media (min-width: 1450px) {
    background-position-y: center;
    // padding-top: 230px;
  }

  // @media (max-width: 767px) {
  //   color: white;
  //   background: #3b453a;
  //   margin-top: 65px;
  // }
`;

const FooterContent = styled.div`
  padding-top: 30px;
  padding-bottom: 60px;

  // @media (max-width: 768px) {
  //   padding-bottom: 0px;
  // }
`;

const FooterBrand = styled.div`
  /* img {
    height: 40px;
  } */
  p {
    margin-top: 15px;
  }

  ul {
    padding: 0;
    list-style: none;
  }
`;

const FooterBrandMobile = styled.div`
  max-width: 88%;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 25px;

  hr {
    border: 1px solid #6a6a6a;
    margin-bottom: 0.7rem;
    margin-top: 0.8rem;
  }

  p {
    font-size: 14px;
    margin: 0;
    padding: 0;
  }
`;

const FooterList = styled.div`
  h4 {
    font-size: 20px;
    line-height: 30px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 20px;

    li {
      padding: 6px 0;
      a {
        color: black;

        // @media (max-width: 767px) {
        //   color: white;
        // }

        &:hover {
          text-decoration: none;
        }
      }
    }
  }
`;

export default GuestFooter;
