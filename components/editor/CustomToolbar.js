import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import {
  postCheckPlagiarism,
  plagiarismSelector,
  plagiarismActions,
} from "@/redux/slices/plagiarism";
import { useQuillSelected } from "@/hooks";

const CustomToolbar = ({ quill }) => {
  const dispatch = useDispatch();

  const [showPlagiarism, setShowPlagiarism] = useState(false);
  const { range: selectedRange, text: selectedText } = useQuillSelected(quill);
  const { writer } = useSelector(plagiarismSelector.getPlagiarism);

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
  const activeFullContent = activeContent(quillText) && !activeSelectedContent;

  const handleFullContentPla = () => {
    if (activeFullContent) {
      dispatch(
        plagiarismActions.setWriterPlagiarism({
          content: quillText,
          position: { index: 0, length: quill.getLength() },
        })
      );
      dispatch(postCheckPlagiarism({ data: { text: quillText } }));
    }
  };

  const handleSelectedContentPla = () => {
    if (activeSelectedContent) {
      dispatch(
        plagiarismActions.setWriterPlagiarism({
          content: quillText,
          position: selectedRange,
        })
      );
      dispatch(postCheckPlagiarism({ data: { text: selectedText } }));
    }
  };

  useEffect(() => {
    dispatch(plagiarismActions.setWriterPlagiarism({ data: [] }));
  }, [dispatch]);

  const plagiarismToggle = () => {
    setShowPlagiarism(!showPlagiarism);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div id="toolbar">
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
        <ButtonDropdown isOpen={showPlagiarism} toggle={plagiarismToggle}>
          <StyledDropdownToggle color="default" caret size="sm">
            Plagiarism Checker
          </StyledDropdownToggle>
          <StyledDropdownMenu>
            <StyledDropdownItem
              disabled={!activeFullContent}
              onClick={handleFullContentPla}
            >
              Full Content
            </StyledDropdownItem>
            <StyledDropdownItem
              disabled={!activeSelectedContent}
              onClick={handleSelectedContentPla}
            >
              Selected Content
            </StyledDropdownItem>
          </StyledDropdownMenu>
        </ButtonDropdown>
      </StyledPlagiarismTool>
    </div>
  );
};

const StyledDropdownToggle = styled(DropdownToggle)`
  box-shadow: none !important;
  background-color: #40b1a7;
  border-radius: 8px;
  color: #fff;
  padding: 10px 20px;

  &:hover, 
  &:focus,
  &:active {
    background-color: #40b1a7;
    border-radius: 8px;
    color: #fff;
  }
`;

const StyledDropdownItem = styled(DropdownItem)`
  box-shadow: none !important;
  border-radius: 8px;
  color: #fff;
  padding: 10px 20px;
  left: 0;
  margin-right: 12px;

  &:active {
    background-color: inherit;
  }
  &:last-child {
    border-bottom: 0;
  }
`;

const StyledPlagiarismTool = styled.div`
  margin-right: 2rem;
`;

const StyledDropdownMenu = styled(DropdownMenu)`
  padding: 0;
  border-radius: 8;
  left: 0 !important;
`;

export default CustomToolbar;
