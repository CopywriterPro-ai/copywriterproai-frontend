import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import {
  setUpdatePasswordModal,
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
};

const Updatepassword = () => {
  const dispatch = useDispatch();

  const {
    update: { password: modalIsOpen },
  } = useSelector(uiSelector.getModal);

  function closeModal() {
    dispatch(setUpdatePasswordModal(false));
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Update Modal"
    >
      <Container>
        <FormTitle>Update Password</FormTitle>
        <form>
          <Formgroup>
            <label>Current password</label>
            <input />
          </Formgroup>
          <Formgroup>
            <label>New Password</label>
            <input />
          </Formgroup>
          <Formgroup>
            <label>Confirm Password</label>
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

export default Updatepassword;
