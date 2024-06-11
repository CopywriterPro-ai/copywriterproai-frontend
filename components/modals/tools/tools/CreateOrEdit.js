import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Container } from "../style";
import {
  postTools,
  patchTools,
  setToolsModal,
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
    height: "80vh",
    overlfow: "scroll",
  },
  overlay: { zIndex: 9999 },
};

const InputGroup = ({ register, name, label, type = "text", placeholder }) => {
  return (
    <StyledInputGroup>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name)}
        autoComplete="off"
        id={name}
        type={type}
        placeholder={placeholder}
      />
    </StyledInputGroup>
  );
};

const SelectGroup = ({ name, label, register }) => {
  const { items: categories } = useSelector(toolsSelector.getToolCategories);

  return (
    <StyledSelectGroup>
      <label htmlFor={name}>{label}</label>
      <select id={name} {...register(name)}>
        {categories.length === 0 && (
          <option value="">Please create a category first</option>
        )}
        {categories.map((category) => (
          <option key={category.key} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </StyledSelectGroup>
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
    font-size: 16px;
    line-height: 50px;
    outline: 0;
    padding: 0 10px;
    width: 100%;
  }
`;

const StyledSelectGroup = styled.div`
  margin: 8px 0;
  label {
    display: block;
    margin-bottom: 0.1rem;
  }
  select {
    background: #fafafa;
    border-radius: 5px;
    border: 0;
    box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
    font-size: 16px;
    line-height: 50px;
    outline: 0;
    padding: 6px 10px;
    width: 100%;
  }
`;

const CreateOrEditModal = () => {
  const dispatch = useDispatch();
  const { action } = useSelector(toolsSelector.getToolsContent);
  const { isOpenModal } = useSelector(toolsSelector.getTools);
  const currentTool = useSelector(toolsSelector.getToolById());

  const { register, control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues:
      action === "edit"
        ? { ...currentTool, category: currentTool.category.id }
        : {},
  });

  const {
    fields: fieldsFields,
    append: appendField,
    remove: removeField,
  } = useFieldArray({ control, name: "fields" });

  const handleCloseModal = () => {
    dispatch(setToolsModal(false));
  };

  const onSubmit = (data) => {
    if (action === "create") {
      dispatch(postTools({ data })).then(({ payload }) => {
        if (payload.status === 201) {
          handleCloseModal();
        }
      });
    } else if (action === "edit") {
      dispatch(
        patchTools({
          id: currentTool.id,
          data: { ...currentTool, ...data },
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
        <h3>{action === "create" ? "Create Tool" : "Update Tool"}</h3>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup
              register={register}
              name="name"
              label="Name"
              placeholder="Youtube Video Ideas"
            />
            <InputGroup
              register={register}
              name="key"
              label="Key"
              placeholder="youtube-video-ideas"
            />
            <InputGroup
              register={register}
              name="videoId"
              label="Youtube Video Id"
              placeholder="I9_Yenz0NUA"
            />
            <SelectGroup label="Category" name="category" register={register} />

            {fieldsFields.map(
              (
                { id, name, tips, key, type, placeholder, validation },
                index
              ) => (
                <StyledFields key={id}>
                  <input
                    {...register(`fields.${index}.name`)}
                    defaultValue={name}
                    placeholder="Name"
                  />
                  <input
                    {...register(`fields.${index}.tips.text`)}
                    defaultValue={tips?.text}
                    placeholder="Tips Text"
                  />
                  <input
                    {...register(`fields.${index}.key`)}
                    defaultValue={key}
                    placeholder="Key"
                  />
                  <select
                    {...register(`fields.${index}.type`)}
                    defaultValue={type}
                  >
                    <option value="InputText">Input</option>
                    <option value="TextArea">Textarea</option>
                    <option value="selectBox">SelectBox</option>
                    <option value="InputNumber">Number</option>
                  </select>
                  <input
                    {...register(`fields.${index}.placeholder`)}
                    defaultValue={placeholder}
                    placeholder="Placeholder"
                  />
                  <input
                    type="number"
                    {...register(`fields.${index}.validation.max`)}
                    defaultValue={validation?.max}
                    placeholder="Max Input Character"
                  />
                  <label>
                    <input
                      type="checkbox"
                      {...register(`fields.${index}.validation.required`)}
                      defaultChecked={validation?.required}
                    />
                    Require Field
                  </label>

                  <StyledRemoveButton onClick={() => removeField(index)}>
                    Remove
                  </StyledRemoveButton>
                </StyledFields>
              )
            )}

            <StyledAddFieldButton onClick={() => appendField({})}>
              Add Tool Field
            </StyledAddFieldButton>

            <StyledSubmitButton type="submit">
              {action === "create" ? "Create" : "Update"}
            </StyledSubmitButton>
          </form>
        </div>
      </Container>
    </Modal>
  );
};

const StyledFieldButton = styled.button`
  border: 0;
  padding: 5px 8px;
  border-radius: 5px;
  color: white;
`;

const StyledRemoveButton = styled(StyledFieldButton)`
  background-color: red;
`;

const StyledAddFieldButton = styled(StyledFieldButton)`
  display: block;
  margin: 5px 0;
  background-color: skyblue;
`;

const StyledSubmitButton = styled.button`
  border: 0;
  font-size: 15px;
  line-height: 40px;
  background-color: #607d8b;
  border-radius: 5px;
  color: #fff;
  padding: 0 10px;
`;

const StyledFields = styled.div`
  border: 0;

  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  padding: 15px 2px;
  margin: 5px 0;
  max-width: 500px;
  border-radius: 5px;
  margin: 5px 0;

  input {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    font-size: 15px;
    line-height: 35px;
    outline: 0;
    padding: 0 8px;
    width: 99%;
    margin: 5px 2px;
  }

  select {
    border-radius: 5px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.08);
    font-size: 15px;
    line-height: 35px;
    outline: 0;
    padding: 6px 8px;
    width: 99%;
    margin: 5px 2px;
  }

  input[type="checkbox"] {
    transform: scale(1.5);
  }
`;

let validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  key: Yup.string().required().label("Key"),
  videoId: Yup.string().required().label("Video ID"),
  category: Yup.string().required().label("Category"),
  fields: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required().label("Field Name"),
        tips: Yup.object().shape({
          text: Yup.string().required().label("Field Tips"),
        }),
        key: Yup.string().required().label("Field Key"),
        type: Yup.string().required().label("Field Type"),
        placeholder: Yup.string().optional().label("Field Placeholder"),
        validation: Yup.object().shape({
          required: Yup.boolean().label("Field Validation Required"),
          max: Yup.number().label("Field Validation Max length"),
        }),
      })
    )
    .min(1),
});

export default CreateOrEditModal;
