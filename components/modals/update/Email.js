import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import {
  setUpdateEmailModal,
  selectors as uiSelector,
} from "@/redux/slices/ui";
import { Container, FormTitle, Formgroup, UpdateButton } from "./style";

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

const Updateemail = () => {
  const dispatch = useDispatch();

  const {
    update: { email: modalIsOpen },
  } = useSelector(uiSelector.getModal);

  function closeModal() {
    dispatch(setUpdateEmailModal(false));
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Update Modal"
    >
      <Container>
        <FormTitle>Update Email</FormTitle>
        <form>
          <Formgroup>
            <label>Email</label>
            <input />
          </Formgroup>
          <Formgroup>
            <label></label>
            <UpdateButton>Update</UpdateButton>
          </Formgroup>
        </form>
      </Container>
    </Modal>
  );
};

export default Updateemail;
