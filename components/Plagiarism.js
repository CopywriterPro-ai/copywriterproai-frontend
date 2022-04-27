import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  postCheckPlagiarism,
  plagiarismSelector,
  plagiarismActions,
} from "@/redux/slices/plagiarism";
import { useQuillSelected } from "@/hooks";
import { quillPlagiarism } from "@/utils";

const Plagiarism = ({ quill }) => {
  const dispatch = useDispatch();
  const [textPosition, setTextPosition] = useState({ index: 0, length: 0 });
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
      setTextPosition({ index: 0, length: quill.getLength() });
      dispatch(postCheckPlagiarism({ data: { text: quillText } }));
    }
  };

  const handleSelectedContentPla = () => {
    if (activeSelectedContent) {
      setTextPosition(selectedRange);
      dispatch(postCheckPlagiarism({ data: { text: selectedText } }));
    }
  };

  useEffect(() => {
    quillPlagiarism(quill, writer.data, textPosition);
  }, [quill, textPosition, writer.data]);

  //   useEffect(() => {
  //     dispatch(plagiarismActions.setWriterPlagiarism({ data: {} }));
  //   }, [dispatch]);

  return (
    <StyledPlagiarism>
      <PlagiarismBtn
        IsActive={activeFullContent}
        onClick={handleFullContentPla}
      >
        Check Full Content
      </PlagiarismBtn>

      <PlagiarismBtn
        IsActive={activeSelectedContent}
        onClick={handleSelectedContentPla}
      >
        Check Selected Content
      </PlagiarismBtn>
    </StyledPlagiarism>
  );
};

const StyledPlagiarism = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const PlagiarismBtn = styled.button`
  background-color: white;
  color: ${({ IsActive }) => (IsActive ? "black" : "gray")};
  border: 1.5px solid ${({ IsActive }) => (IsActive ? "#3a4841" : "gray")};
  padding: 1px 10px;
  border-radius: 3px;
  font-size: 15px;
  line-height: 22px;
  user-select: none;
  margin-right: 10px;
  cursor: ${({ IsActive }) =>
    IsActive ? "pointer" : "not-allowed"} !important;
`;

export default Plagiarism;
