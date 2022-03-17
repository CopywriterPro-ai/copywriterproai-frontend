import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Container } from "./style";
import { setBlogResetModal, selectors as uiSelector } from "@/redux/slices/ui";
import { writeAlongActions } from "@/redux/slices/blog";
import { resetCompleteBlog } from "@/redux/slices/completeBlog";
import { AI_COMPLETE_BLOG_WRITER, AI_BLOG_WRITER } from "@/appconstants";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ResetBlogModal = ({ quill, id }) => {
  const dispatch = useDispatch();
  const { blogs } = useSelector(uiSelector.getModal);

  const closeModal = () => {
    dispatch(setBlogResetModal(false));
  };

  const handleReset = () => {
    quill?.setContents([]);

    switch (id) {
      case AI_BLOG_WRITER:
        dispatch(writeAlongActions.resetBlog());
        break;
      case AI_COMPLETE_BLOG_WRITER:
        dispatch(resetCompleteBlog());
        break;
      default:
        break;
    }
    dispatch(setBlogResetModal(false));
    quill?.focus();
  };

  return (
    <Modal
      isOpen={blogs.reset}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Reset Modal"
    >
      <Container>
        <h3>Are you sure to reset this?</h3>
        <ButtonGroup>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={handleReset}>Reset</Button>
        </ButtonGroup>
      </Container>
    </Modal>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.button`
  background-color: white;
  border: 1px solid #dedede;
  outline: 0;
`;

export default ResetBlogModal;
