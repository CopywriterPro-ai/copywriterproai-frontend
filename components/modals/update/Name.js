import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import { setUpdateNameModal, selectors as uiSelector } from "@/redux/slices/ui";
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

const Updatename = () => {
  const dispatch = useDispatch();

  const {
    update: { name: modalIsOpen },
  } = useSelector(uiSelector.getModal);

  function closeModal() {
    dispatch(setUpdateNameModal(false));
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Update Modal"
    >
      <Container>
        <FormTitle>Update Name</FormTitle>
        <form>
          <Formgroup>
            <label>First name</label>
            <input />
          </Formgroup>
          <Formgroup>
            <label>Last name</label>
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

export default Updatename;
