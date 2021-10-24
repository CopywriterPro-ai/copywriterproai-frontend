import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Container } from "../style";
import {
  postToolCategories,
  patchToolCategory,
  setCategoriesModal,
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
};

const InputGroup = ({ name, label, register, type = "text", placeholder }) => {
  return (
    <StyledInputGroup>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        autoComplete="off"
        id={name}
        {...register(name)}
        placeholder={placeholder}
      />
    </StyledInputGroup>
  );
};

const TextAreaGroup = ({
  name,
  label,
  register,
  type = "text",
  placeholder,
}) => {
  return (
    <StyledTextAreaGroup>
      <label htmlFor={name}>{label}</label>
      <textarea
        type={type}
        id={name}
        {...register(name)}
        placeholder={placeholder}
      ></textarea>
    </StyledTextAreaGroup>
  );
};

const StyledInputGroup = styled.div`
  margin: 8px 0;
  label {
    display: block;
    margin-bottom: 0.1rem;
  }
  input {
    background: #fafafa;
    border-radius: 5px;
    border: 0;
    box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
    /* color: #666; */
    font-size: 16px;
    line-height: 50px;
    outline: 0;
    padding: 0 10px;
    width: 100%;
  }
`;

const StyledTextAreaGroup = styled.div`
  margin: 8px 0;
  label {
    display: block;
    margin-bottom: 0.1rem;
  }
  textarea {
    background: #fafafa;
    border-radius: 5px;
    border: 0;
    box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
    /* color: #666; */
    font-size: 16px;
    line-height: 50px;
    outline: 0;
    padding: 0 10px;
    width: 100%;
  }
`;

const CreateOrEditModal = () => {
  const dispatch = useDispatch();

  const { action } = useSelector(toolsSelector.getToolsContent);
  const { isOpenModal } = useSelector(toolsSelector.getToolCategories);
  const currentCategory = useSelector(toolsSelector.getCategoryById());

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: action === "edit" ? currentCategory : {},
  });

  const handleCloseModal = () => {
    dispatch(setCategoriesModal(false));
  };

  const onSubmit = (data) => {
    if (action === "create") {
      dispatch(postToolCategories({ data })).then(({ payload }) => {
        if (payload.status === 201) {
          handleCloseModal();
        }
      });
    } else if (action === "edit") {
      dispatch(
        patchToolCategory({
          id: currentCategory.id,
          data: { ...currentCategory, ...data },
        })
      ).then(({ payload }) => {
        if (payload.status === 200) {
          handleCloseModal();
        }
      });
    }
  };

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={handleCloseModal}
      style={customStyles}
      contentLabel="Reset Modal"
    >
      <Container>
        <h3>{action === "create" ? "Create Category" : "Update Category"}</h3>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div></div>
            <InputGroup
              label="Name"
              name="name"
              register={register}
              placeholder="Google"
            />
            <InputGroup
              label="Key"
              name="key"
              register={register}
              placeholder="google"
            />
            <TextAreaGroup
              label="Description"
              name="description"
              register={register}
              placeholder="Description..."
            />
            <InputGroup
              label="Icon URL"
              name="icon.src"
              register={register}
              placeholder="https://i.ibb.co/BcXHz9j/website.png"
            />
            <StyledSubmitButton type="submit">
              {action === "create" ? "Create" : "Update"}
            </StyledSubmitButton>
          </form>
        </div>
      </Container>
    </Modal>
  );
};

const StyledSubmitButton = styled.button`
  border: 0;
  font-size: 15px;
  line-height: 40px;
  background-color: #607d8b;
  border-radius: 5px;
  color: #fff;
  padding: 0 10px;
`;

let validationSchema = Yup.object().shape({
  description: Yup.string().required().label("Description"),
  icon: Yup.object().shape({
    src: Yup.string().url().required().label("Icon"),
  }),
  key: Yup.string().required().label("Key"),
  name: Yup.string().required().label("Name"),
});

export default CreateOrEditModal;
