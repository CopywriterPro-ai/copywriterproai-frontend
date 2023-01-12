import React from "react";
import styled from "styled-components";
import { useResponsive } from "@/hooks";

const BlogData = ({ textData }) => {
  const { timeToRead, readabilityScore, sentence, word, character } = textData;
  const { isMobile } = useResponsive();
  
  return (
    <BlogFooter>
      <BlogInformation>
        <p><i>{ timeToRead } reading time</i></p>
        <p><i>{ readabilityScore } readability score</i></p>
        <p><i>{ sentence } { sentence > 1 ? "sentences" : "sentence"}</i></p>
        <p><i>{ word } { word > 1 ? "words" : "word"}</i></p>
        <p><i>{ character } { character > 1 ? "characters" : "character"}</i></p>
      </BlogInformation>
    </BlogFooter>
  );
};

const BlogFooter = styled.footer`
  display: flex;
  position: sticky;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2.2rem;
  background: #FFFFFF;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.15);
  text-align: center;

  @media (max-width: 576px) {
    min-width: max-content;
    display: none;
  }
`;

const BlogInformation = styled.div`
  display: flex;
  align-items: center;
  padding-left: 2rem;

  p {
    font-size: 14.5px;
    font-weight: 500;
    margin: 0 2rem 0 0;

    @media (max-width: 700px) {
      font-size: 12.5px;
    }

    @media (max-width: 600px) {
      font-size: 11px;
    }
  }
`;

export default BlogData;
