import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

import {
  postCheckPlagiarism,
  plagiarismSelector,
  plagiarismActions,
} from "@/redux/slices/plagiarism";
import { useUser, useQuillSelected } from "@/hooks";
import { selectors as subscriberSelector } from "@/redux/slices/subscriber";
import pricesInfo from "@/data/price.json";
import { toastMessage } from "@/utils";
import { setSigninModal } from "@/redux/slices/ui";

const CustomToolbar = ({ quill }) => {
  const dispatch = useDispatch();

  const [showPlagiarism, setShowPlagiarism] = useState(false);
  const { range: selectedRange, text: selectedText } = useQuillSelected(quill);
  const { writer } = useSelector(plagiarismSelector.getPlagiarism);
  const { data: subscriptionInfo } = useSelector(
    subscriberSelector.getOwnSubscriber
  );
  const {
    isAuth,
    subscribe: {
      freeTrial: { eligible: freeTrailEligible },
      activeSubscription: { words, subscription },
    },
  } = useUser();

  const plagiarismChecker = pricesInfo[subscriptionInfo?.activeSubscription?.subscription]?.hasPlagiarism;

  const isPending = writer.loading === "pending";
  const quillText = quill?.getText() || "";

  const activeContent = useCallback(
    (texts) => {
      if (typeof texts !== "string") {
        return false;
      }
      const textsArr = texts
        .toString()
        .trim()
        .split(" ")
        .filter((text) => Boolean(text));

      return !isPending && textsArr.length >= 15;
    },
    [isPending]
  );

  const activeSelectedContent = activeContent(selectedText);

  const handleContent = () => {
    if (!isAuth) {
      dispatch(setSigninModal(true));
      return;
    }

    if(!plagiarismChecker) {
      toastMessage.warn("Upgrade to Professional Package!");
    }
    else if (!selectedText) {
      toastMessage.error("Please select text to check plagiarism!");
    }
    else if (activeSelectedContent) {
      dispatch(
        plagiarismActions.setWriterPlagiarism({
          content: quillText,
          position: selectedRange,
        })
      );
      dispatch(postCheckPlagiarism({ data: { text: selectedText } }));
    }
    else {
      toastMessage.error("Minimum 15 words are required!");
    }
  };

  useEffect(() => {
    dispatch(plagiarismActions.setWriterPlagiarism({ data: [] }));
  }, [dispatch]);

  const plagiarismToggle = () => {
    setShowPlagiarism(!showPlagiarism);
  };

  return (
    <Toolbar>
      <div id="toolbar" style={{padding: "0"}}>
        <span className="ql-formats">
          <select
            className="ql-size"
            defaultValue={""}
            onChange={(e) => e.persist()}
          >
            <option value="small"></option>
            <option value="large"></option>
            <option value="huge"></option>
            <option selected></option>
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-underline"></button>
          <button className="ql-strike"></button>
          <button className="ql-blockquote"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-link"></button>
        </span>
        <span className="ql-formats">
          <select className="ql-color">
            <option value="green"></option>
            <option value="red"></option>
            <option value="white"></option>
            <option value="black"></option>
            <option selected></option>
          </select>
          <select className="ql-background">
            <option value="green"></option>
            <option value="red"></option>
            <option value="white"></option>
            <option value="black"></option>
            <option selected></option>
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-header" value="1"></button>
          <button className="ql-header" value="2"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
        </span>
        <span className="ql-formats">
          <select className="ql-header">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
            <option selected></option>
          </select>
        </span>
        <span className="ql-formats">
          <select className="ql-align">
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
            <option selected></option>
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-clean"></button>
        </span>
      </div>

      <StyledPlagiarismTool>
        <StyledButton onClick={handleContent}>
          Plagiarism Checker
        </StyledButton>
      </StyledPlagiarismTool>
    </Toolbar>
  );
};

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  box-shadow: none !important;
  background-color: #10a37f !important;
  border-radius: 8px;
  color: #fff !important;
  padding: 10px 25px;

  &:hover, 
  &:focus,
  &:active {
    background-color: #10a37f !important;
    border-radius: 8px;
    color: #fff !important;
  }

  @media (max-width: 1000px) {
    padding: 5px 14px;
    font-size: 14px;
  }

  @media (max-width: 900px) {
    padding: 4px 12px;
    font-size: 12px;
  }
`;

const StyledPlagiarismTool = styled.div`
  margin-right: 1rem;

  @media (max-width: 1000px) {
    margin-right: 0;
  }
`;

export default CustomToolbar;
