/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

import LoremContent from "@/components/LoremContent";
import logo from "@/assets/images/copywriterpro.ai-logo.png";

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

const Play = () => {
  const noticeRef = useRef(null);
  const [notice, setNotice] = useState({ open: true, height: 0 });
  const [mobileNav, setMobileNav] = useState({ open: false });

  useEffect(() => {
    const element = noticeRef?.current;
    if (element && notice.open) {
      setNotice({ ...notice, height: element.offsetHeight });
    } else {
      setNotice({ ...notice, height: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notice.open]);

  return (
    <div>
      {notice.open && (
        <NoticeBar ref={noticeRef}>
          <Container>
            <NoticBarContent>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              <button onClick={() => setNotice({ ...notice, open: false })}>
                ✖
              </button>
            </NoticBarContent>
          </Container>
        </NoticeBar>
      )}

      <Nav noticeHeight={notice.height}>
        <Container>
          <NavFlex>
            <NavUL>
              <li style={{ display: "block" }}>
                <img src={logo.src} alt="copywriterpro-logo" height={20} />
              </li>
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

      <main>
        <Container>
          <LoremContent />
        </Container>
      </main>
    </div>
  );
};

const Nav = styled.nav`
  backdrop-filter: blur(8px);
  position: sticky;
  top: ${({ noticeHeight }) => noticeHeight + "px"};
  width: 100%;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.4);
  transition: top 0.5s ease;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1450px;
  padding-left: 1rem;
  padding-right: 1rem;
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
  column-gap: 1rem;
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

    ul {
      list-style: none;
      padding: 0;

      li {
        padding: 0.5rem 1rem;
        margin: 0;
        border-bottom: 1px solid #00000013;

        a {
          color: #000;
          text-decoration: none;
          font-size: 14px;
        }
      }
    }
  }
`;

export default Play;
