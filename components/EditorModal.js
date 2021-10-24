import styled, { keyframes } from "styled-components";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  PARAPHRASING,
  EXPANDER,
  SIMPLIFIER,
  CHANGE_TONE,
} from "@/appconstants";
import {
  setEditorCurrentSelectedText,
  postEditorToolsContent,
  setEditorCurrentSelectedRange,
  selectors as blogSelector,
} from "@/redux/slices/blog";
import { setSigninModal } from "@/redux/slices/ui";
import { useUser } from "@/hooks";
import { isServer } from "@/utils";

const tones = [
  "Formal",
  "Friendly",
  "Neutral",
  "Confident",
  "Curious",
  "Surprised",
  "Happy",
  "Angry",
  "Sad",
  "Concerned",
  "Encouraging",
  "Regretful",
  "Optimistic",
  "Excited",
  "Witty",
  "Persuasive",
  "Empathetic",
];

const Modal = ({ children, position, isSelected }) => {
  let modalRoot;
  let element;

  if (!isServer) {
    modalRoot = document.getElementsByClassName("ql-container")[0];
    element = document.createElement("div");

    element.style.display = `${!isSelected ? "none" : null}`;
    element.style.position = "absolute";
    element.style.top = `${position.bottom + 10}px`;
    element.style.left = `${position.left}px`;
  }

  useEffect(() => {
    if (modalRoot) modalRoot.appendChild(element);

    if (modalRoot) {
      return () => modalRoot.removeChild(element);
    }
  }, [element, modalRoot]);

  return !isServer ? createPortal(children, element) : null;
};

const EditorModal = ({ position, quill }) => {
  const dispatch = useDispatch();

  // const { about } = useSelector(blogSelector.getBlogContent);
  const { selected, range } = useSelector(blogSelector.getEditor());
  const { loading } = useSelector(blogSelector.getToolContent());
  const { isAuth } = useUser();

  const handleGetTool = (task, tone) => {
    let data;
    if (!selected) alert("Please select some text");
    if (!isAuth) {
      dispatch(setSigninModal(true));
      return;
    }

    if (task === PARAPHRASING) {
      const task = PARAPHRASING;
      data = { task, userText: selected };
    } else if (task === EXPANDER) {
      const task = EXPANDER;
      data = { task, userText: selected };
    } else if (task === SIMPLIFIER) {
      const task = SIMPLIFIER;
      data = { task, userText: selected };
    } else if (task === CHANGE_TONE) {
      const task = CHANGE_TONE;
      data = { task, userText: selected, tone };
    }

    dispatch(postEditorToolsContent({ data, task: data.task })).then((res) => {
      if (res.payload.status === 200) {
        const { index, length } = range;
        const Index = index + length;
        quill.setSelection(Index, 0);
        dispatch(setEditorCurrentSelectedText(null));
        dispatch(setEditorCurrentSelectedRange({ index: Index, length: 0 }));
      }
    });
  };

  if (loading === "pending") {
    return (
      <Modal position={position} isSelected={Boolean(selected)}>
        <WritingToolsExtend>
          <Loader>
            <span />
            <span />
            <span />
          </Loader>
        </WritingToolsExtend>
      </Modal>
    );
  }

  return (
    <Modal position={position} isSelected={Boolean(selected)}>
      <WritingTools>
        <ToolItems>
          <ToolItem>
            <ToolItemButton
              title="Paraphrasing"
              onClick={() => handleGetTool(PARAPHRASING)}
            >
              Paraphrasing
            </ToolItemButton>
          </ToolItem>
          <ToolItem>
            <ToolItemButton
              title="Expander"
              onClick={() => handleGetTool(EXPANDER)}
            >
              Expander
            </ToolItemButton>
          </ToolItem>
          <ToolItem>
            <ToolItemButton
              title="Simplified"
              onClick={() => handleGetTool(SIMPLIFIER)}
            >
              Simplified
            </ToolItemButton>
          </ToolItem>
          <ToolItem>
            <ToolItemButton title="Change Tone">
              Change Tone &#9662;
            </ToolItemButton>
            <Dropdown>
              {tones.map((tone) => (
                <DropdownBtn
                  key={tone}
                  title={tone}
                  onClick={() => handleGetTool(CHANGE_TONE, tone)}
                >
                  {tone}
                </DropdownBtn>
              ))}
            </Dropdown>
          </ToolItem>
          <ToolItem>
            <Counter>{selected?.length}</Counter>
          </ToolItem>
        </ToolItems>
      </WritingTools>
    </Modal>
  );
};

const Dropdown = styled.div`
  display: none;
  position: absolute;
  background-color: #fbfbfbe6;
  min-width: 160px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 40%);
  padding: 10px;
  z-index: 1;
  border-radius: 5px;
  overflow-y: scroll;
  max-height: 250px;
`;

const WritingTools = styled.div`
  padding: 10px;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
  display: flex;
  min-height: 36px;
`;

const WritingToolsExtend = styled(WritingTools)`
  width: 394px;
  justify-content: center;
  max-height: 250px;
  min-height: 150px;
  overflow-y: scroll;
`;

const ToolItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 999;
`;

const ToolItem = styled.li`
  display: inline-block;
  position: relative;
  margin: 0 5px;
  text-align: center;

  &:hover ${Dropdown} {
    display: flex;
    flex-direction: column;
  }
`;

const ToolItemButton = styled.button`
  display: block;
  background: transparent;
  border: 0;
  outline: 0;
  padding: 4px;
`;

const DropdownBtn = styled(ToolItemButton)`
  margin: 2px 0;
  text-align: left;
`;

const Counter = styled(ToolItemButton)`
  color: green;
  cursor: default !important;
`;

const loadingKeyframes = keyframes`
  to {
      transform: translateY(20px);
    }
`;

const Loader = styled.div`
  span {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: gray;
    margin: 5px;

    animation: ${loadingKeyframes} 0.6s cubic-bezier(0.6, 0.1, 1, 0.4);
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  span:nth-child(1) {
    animation-delay: 0.1s;
  }

  span:nth-child(2) {
    animation-delay: 0.2s;
  }

  span:nth-child(3) {
    animation-delay: 0.3s;
  }
`;

export default EditorModal;
