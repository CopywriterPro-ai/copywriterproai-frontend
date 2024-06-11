import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Container } from "./style";
import { setBlogDeleteModal, selectors as uiSelector } from "@/redux/slices/ui";
import { deleteBlog, selectors as draftSelector } from "@/redux/slices/draft";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: { zIndex: 9999 },
};

const DeleleBlogModal = () => {
  const dispatch = useDispatch();

  const { blogs } = useSelector(uiSelector.getModal);
  const { activeId } = useSelector(draftSelector.getDraftBlogs());

  const closeModal = () => {
    dispatch(setBlogDeleteModal(false));
  };

  const handleDelete = () => {
    dispatch(deleteBlog({ id: activeId })).then(({ payload }) => {
      if (payload.status === 204) {
        dispatch(setBlogDeleteModal(false));
      }
    });
  };

  return (
    <Modal
      isOpen={blogs.delete}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Delete Modal"
    >
      <Container>
        <h3>Are you sure to delete this?</h3>
        <ButtonGroup>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
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

export default DeleleBlogModal;
