// import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { renderToString } from "react-dom/server";

import { plagiarismSelector } from "@/redux/slices/plagiarism";
import { useUser } from "@/hooks";
// import { toastMessage, decodeEntities } from "@/utils";

// const subString = (str = "", max = 10) => {
//   let string = str;
//   if (string.length > max) {
//     string = string.substring(0, max);
//   }
//   return string;
// };

// const SingleTooltip = ({ source }) => {
//   return (
//     <StyledSingleTooltip>
//       <strong>Words Matched: {source.wordsMatched}</strong>
//       <ul>
//         {source.sources.map((link, index) => (
//           <li key={index}>
//             <a
//               title={link}
//               href={link}
//               target="_blank"
//               rel="noreferrer nofollow"
//             >
//               {subString(link, 30)}...
//             </a>
//           </li>
//         ))}
//       </ul>
//     </StyledSingleTooltip>
//   );
// };

// const StyledSingleTooltip = styled.div`
//   ul {
//     list-style: none;
//     margin: 0;
//     padding: 0;
//   }

//   a {
//     color: gray;
//     text-decoration: none;
//     font-weight: 500;
//   }
// `;

const WriterPlagiarism = ({ quill }) => {
  const { writer } = useSelector(plagiarismSelector.getPlagiarism);
  const mark = useSelector(plagiarismSelector.getPlagiarismWriterMark);
  const { subscribe, isAuth } = useUser();

  const {
    data: writerData,
    position: writerPosition,
    content: writerContent,
  } = writer;

  // useEffect(() => {
  //   ReactTooltip.rebuild();
  // });

  // const handleMarkInEditor = (item) => {
  //   const editorText = quill && quill.getText();
  //   if (editorText && editorText.length) {
  //     const findText = decodeEntities(item.text);
  //     const firstIndex = editorText.indexOf(findText);
  //     const textLength = findText.length;
  //     if (firstIndex >= 0 && textLength) {
  //       quill.setSelection(firstIndex, textLength);
  //     } else {
  //       toastMessage.warn("String not found", 1000);
  //     }
  //   }
  // };

  // return (
  //   <>
  //     {writerData.length > 0 &&
  //       writerData.map((item, index) => (
  //         <StyledPlagiarismItem
  //           key={index}
  //           onClick={() => handleMarkInEditor(item)}
  //         >
  //           <div
  //             data-for="plagiarism-src"
  //             data-html={true}
  //             data-tip={renderToString(<SingleTooltip source={item.source} />)}
  //           >
  //             {decodeEntities(item.text)}
  //           </div>
  //         </StyledPlagiarismItem>
  //       ))}
  //     <ReactTooltip
  //       id="plagiarism-src"
  //       effect="solid"
  //       delayHide={200}
  //       delayShow={200}
  //       delayUpdate={50}
  //       place="bottom"
  //       border={true}
  //       type="warning"
  //       clickable={true}
  //     />
  //   </>
  // );

  const plagiwords = subscribe?.activeSubscription?.plagiarismCheckerWords;

  return (
    <StyledPlagiarismContainer>
      <StyledPlagiarismCredit>
        Plagiarism words left: {isAuth && plagiwords > 0 ? plagiwords : 0}
      </StyledPlagiarismCredit>
      <StyledPlagiarismContent>
        <div dangerouslySetInnerHTML={{ __html: mark }}></div>
      </StyledPlagiarismContent>
    </StyledPlagiarismContainer>
  );
};

// const StyledPlagiarismItem = styled.div`
//   margin: 20px 0;
//   border: 1px solid gray;
//   padding: 5px;
//   border-radius: 4px;
//   cursor: pointer;
//   user-select: none;
// `;

const StyledPlagiarismContainer = styled.div`
  padding: 10px;
  /* margin-top: 30px; */
`;

const StyledPlagiarismCredit = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const StyledPlagiarismContent = styled.div`
  margin-top: 15px;
`;

export default WriterPlagiarism;
