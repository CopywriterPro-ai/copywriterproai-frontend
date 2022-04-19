import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Container } from "../style";
import {
  setToolsModal,
  deleteTools,
  selectors as toolsSelector,
} from "@/redux/slices/tools";

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

const DeleteModal = () => {
  const dispatch = useDispatch();
  const { isOpenModal, currentId } = useSelector(toolsSelector.getTools);

  const handleCloseModal = () => {
    dispatch(setToolsModal(false));
  };

  const handleDeleteCategory = () => {
    dispatch(deleteTools({ id: currentId })).then(({ payload }) => {
      if (payload.status === 204) {
        handleCloseModal();
      }
    });
  };

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={handleCloseModal}
      style={customStyles}
      contentLabel="Delete Modal"
    >
      <Container>
        <h3>Are you sure to delete this?</h3>
        <StyledButtonGroup>
          <StyledCancelButton onClick={handleCloseModal}>
            Cancel
          </StyledCancelButton>
          <StyledDeleteButton onClick={handleDeleteCategory}>
            Delete
          </StyledDeleteButton>
        </StyledButtonGroup>
      </Container>
    </Modal>
  );
};

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  outline: 0;
  border: 0;
  background-color: black;
  color: white;
  padding: 5px 15px;
  border-radius: 2px;
  user-select: none;
`;

const StyledCancelButton = styled(StyledButton)`
  background-color: green;
`;

const StyledDeleteButton = styled(StyledButton)`
  background-color: red;
`;

export default DeleteModal;
