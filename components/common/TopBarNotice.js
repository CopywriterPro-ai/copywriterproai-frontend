import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { setTopBarStatus, selectors as uiSelector } from "@/redux/slices/ui";

const TopBarNotice = () => {
  const dispatch = useDispatch();
  const noticeTopRef = useRef();
  const { showTopBar } = useSelector(uiSelector.getHeaderSize);

  const handleTopBar = (val) => {
    dispatch(setTopBarStatus(val));
  };

  return (
    <>
      {showTopBar && (
        <TopNotice ref={noticeTopRef}>
          <div style={{ maxWidth: "80%" }}>
            New Year’s Sale! Apply <u>MYSTERYDEAL</u> and Get a Flat 60% OFF!
            Ends January 10.
          </div>
          <div style={{ position: "absolute", right: "10px" }}>
            <i
              onClick={() => handleTopBar(false)}
              style={{ cursor: "pointer" }}
              className="fas fa-times"
            ></i>
          </div>
        </TopNotice>
      )}
    </>
  );
};

const TopNotice = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  position: fixed;
  background: #2cae97;
  color: white;
  margin: 0px;
  top: 0px;
  z-index: 1031;
  color: white;
  font-size: 17px;
  text-align: center;
  font-weight: 500;
`;

export default TopBarNotice;
