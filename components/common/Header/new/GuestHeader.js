/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

import logo from "@/assets/images/copywriterpro.ai-logo.png";
import { useWindowSize, useNotice } from "@/hooks";

const leftMenu = [
  {
    name: "Features",
    link: "/playground22/#features",
    external: false,
    submenu: [],
  },
  {
    name: "Resources",
    link: "/playground22/#resources",
    external: false,
    submenu: [],
  },
  {
    name: "Pricing",
    link: "/playground22/#pricing",
    external: false,
    submenu: [],
  },
  {
    name: "Community",
    link: "https://stackoverflow.com/",
    external: true,
    submenu: [],
  },
];

const rightMenu = [
  {
    name: "Login",
    link: "/playground22/#login",
    isButton: false,
    external: false,
    submenu: [],
  },
  {
    name: "Start free 7-day trial",
    link: "/playground22/#signup",
    isButton: true,
    external: false,
    submenu: [],
  },
];

const mobileMenu = [...leftMenu, ...rightMenu];

const Header = () => {
  const noticeRef = useRef(null);
  const { data: noticeData } = useNotice();
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [noticeHeight, setNoticeHeight] = useState(0);
  const [mobileNav, setMobileNav] = useState({ open: false });
  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    setNoticeOpen(noticeData.active);
  }, [noticeData.active]);

  useEffect(() => {
    const element = noticeRef?.current;
    if (element && noticeOpen) {
      setNoticeHeight(element.offsetHeight);
    } else {
      setNoticeHeight(0);
    }
  }, [noticeOpen, windowWidth]);

  return (
    <>
      {noticeOpen && (
        <NoticeBar ref={noticeRef}>
          <Container>
            <NoticBarContent>
              {noticeData?.description}
              <button onClick={() => setNoticeOpen(false)}>✖</button>
            </NoticBarContent>
          </Container>
        </NoticeBar>
      )}

      <Nav noticeHeight={noticeHeight}>
        <Container>
          <NavFlex>
            <NavUL>
              <LogoItem>
                <Link href="/">
                  <img src={logo.src} alt="copywriterpro-logo" height={20} />
                </Link>
              </LogoItem>
              {leftMenu.map((menu) => (
                <li key={menu.link}>
                  {menu.external ? (
                    <a href={menu.link} target="_blank" rel="noreferrer">
                      {menu.name}
                    </a>
                  ) : (
                    <Link href={menu.link}>{menu.name}</Link>
                  )}
                </li>
              ))}
            </NavUL>
            <NavULSecond>
              {rightMenu.map((menu) => (
                <li key={menu.link}>
                  <Link href={menu.link}>
                    {menu.isButton ? <button>{menu.name}</button> : menu.name}
                  </Link>
                </li>
              ))}
            </NavULSecond>
            <MobileToogler>
              <i
                onClick={() =>
                  setMobileNav({ ...mobileNav, open: !mobileNav.open })
                }
                className="fas fa-bars"
              ></i>
            </MobileToogler>
          </NavFlex>
        </Container>
        <MobileNavbar mobileNavOpen={mobileNav.open}>
          {mobileNav.open && (
            <ul>
              {mobileMenu.map((menu) => (
                <li key={menu.link}>
                  {menu.external ? (
                    <a href={menu.link} target="_blank" rel="noreferrer">
                      {menu.name}
                    </a>
                  ) : (
                    <Link href={menu.link}>{menu.name}</Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </MobileNavbar>
      </Nav>
    </>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 1450px;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Nav = styled.nav`
  backdrop-filter: blur(8px);
  position: sticky;
  top: ${({ noticeHeight }) => noticeHeight + "px"};
  width: 100%;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.4);
  transition: top 0.5s ease;
`;

const NoticeBar = styled.div`
  position: sticky;
  top: 0;
  background-color: #01315d;
  width: 100%;
  padding: 0.4rem 0;
  color: #fff;
`;

const NoticBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    font-size: 18px;
    background-color: transparent;
    border: none;
    color: #fff;
  }
`;

const NavFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

const NavUL = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  column-gap: 2.5rem;
  align-items: center;
  margin: 0;

  li {
    a {
      color: #000;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
    }
  }

  @media (max-width: 1000px) {
    column-gap: 1rem;
  }

  @media (max-width: 768px) {
    li {
      display: none;
    }
  }
`;

const NavULSecond = styled(NavUL)`
  button {
    height: 45px;
    background-color: #003e77;
    color: #fff;
    border: 0;
    padding: 0 20px;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoItem = styled.li`
  display: block !important;
  cursor: pointer;
`;

const MobileToogler = styled.div`
  display: none;
  box-shadow: 0px 0px 5px rgba(0, 127, 255, 0.25);
  border-radius: 5px;

  i {
    padding: 5px 8px;
    font-size: 20px;
    color: #1d728d;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavbar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    padding: ${({ mobileNavOpen }) => mobileNavOpen && "0.5rem 0"};
    transition: padding 0.5s ease-out;
    background: white;

    ul {
      list-style: none;
      padding: 0;

      li {
        padding: 0.5rem 1rem;
        margin: 0;
        border-bottom: 1px solid #00000013;

        &:last-child {
          border-bottom: 0;
        }
        a {
          color: #000;
          text-decoration: none;
          font-size: 14px;
        }
      }
    }
  }
`;

export default Header;
