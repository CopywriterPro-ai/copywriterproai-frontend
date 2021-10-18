import React, { useState, useRef, forwardRef } from "react";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import styled from "styled-components";

import externalLink from "../../../data/externallink.json";
import NavMeunuIcon from "@assets/images/navmenu.png";
import Logo from "@assets/images/logo-color.png";
import { useResponsive, useElementSize } from "hooks";

const AppNavLink = ({ to = "/", title = "Page Title", shape = false }) => {
  const { isDesktop } = useResponsive();

  const isShape = Boolean(shape && isDesktop);

  return (
    <NavItem>
      <Link href={to} passHref>
        <AppNavLinkShape Shape={isShape.toString()}>{title}</AppNavLinkShape>
      </Link>
    </NavItem>
  );
};

const AppbarBrand = forwardRef(({ onClick, href }, ref) => {
  return (
    <NavbarBrand href={href} onClick={onClick} ref={ref}>
      <AppLogo src={Logo} alt="copywriterpro.ai"></AppLogo>
    </NavbarBrand>
  );
});

// const AppNavHashLink = ({ to = "/", title = "Page Title", shape = false }) => {
//   const { isDesktop } = useResponsive();

//   const isShape = Boolean(shape && isDesktop);

//   return (
//     <NavItem>
//       <Link href={to} passHref>
//         <AppNavLinkShape shape={isShape.toString()}>{title}</AppNavLinkShape>
//       </Link>
//     </NavItem>
//   );
// };

const AppHeader = () => {
  const noticeTopRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const { height: topNoticeHeight } = useElementSize(noticeTopRef);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      {showNotice && (
        <TopNotice ref={noticeTopRef}>
          <div style={{ maxWidth: "80%" }}>
            Find out about exclusive offers and useful resources by joining our
            Facebook group.{"  "}
            <a href={externalLink.facebookGroup} target="__blank">
              <JoinButton>Join</JoinButton>
            </a>
          </div>
          <div style={{ position: "absolute", right: "10px" }}>
            <i
              onClick={() => setShowNotice(false)}
              style={{ cursor: "pointer" }}
              className="fas fa-times"
            ></i>
          </div>
        </TopNotice>
      )}
      <NavBar
        shownotice={showNotice.toString()}
        noticeheight={`${topNoticeHeight}px`}
        light
        expand="md"
      >
        <div className="container">
          <Link href="/" passHref>
            <AppbarBrand />
            {/* <NavbarBrand>
              <AppLogo src={Logo} alt="copywriterpro.ai"></AppLogo>
            </NavbarBrand> */}
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <AppNavLink to="/features" title="Features" />
              <AppNavLink to="/pricing" title="Pricing" />
            </Nav>

            <Nav className="ml-auto" navbar>
              <AppNavLink to="/signin" title="Sign in" />
              <AppNavLink to="/signup" title="Sign up" shape={true} />
            </Nav>
          </Collapse>
        </div>
      </NavBar>
    </header>
  );
};

const TopNotice = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  position: fixed;
  background: #2cae97;
  color: white;
  margin: 0px;
  top: 0px;
  z-index: 1031;
  color: white;
  font-size: 16px;
  text-align: center;
`;

const JoinButton = styled.button`
  background: #ffffff00;
  color: white;
  border: 1px solid white;
  border-radius: 3px;
  padding: 0 5px;
`;

const AppLogo = styled.img`
  height: 45px;

  @media (max-width: 768px) {
    height: 55px;
    padding-left: 11px;
  }

  @media (max-width: 576px) {
    height: 50px;
    padding-left: 0px;
  }

  @media (max-width: 425px) {
    height: 45px;
  }

  @media (max-width: 375px) {
    height: 37px;
  }

  @media (max-width: 319px) {
    height: 31px;
  }

  @media (max-width: 270px) {
    height: 29px;
  }
`;

const NavBar = styled(Navbar)`
  margin-top: ${({ shownotice, noticeheight }) =>
    shownotice === "true" ? noticeheight : null};
  padding-top: 25px;

  @media (max-width: 768px) {
    margin-left: 10px;
  }
`;

const AppNavLinkShape = styled(NavLink)`
  background-image: ${({ Shape }) =>
    Shape === "true" ? `url(${NavMeunuIcon})` : null};
  padding: 12px 26px !important;
  color: ${({ Shape }) =>
    Shape === "true" ? "white !important" : "black !important"};
  font-weight: ${({ Shape }) => (Shape === "true" ? 500 : null)};
  background-repeat: ${({ Shape }) => (Shape === "true" ? "no-repeat" : null)};
  background-size: ${({ Shape }) => (Shape === "true" ? "contain" : null)};
  background-position-x: ${({ Shape }) => (Shape === "true" ? "right" : null)};
`;

export default AppHeader;
