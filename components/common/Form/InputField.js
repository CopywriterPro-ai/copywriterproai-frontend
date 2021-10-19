import styled from "styled-components";

const InputField = ({
  type = "text",
  placeholder,
  register,
  errors,
  height = "55px",
  width = "432px",
}) => {
  return (
    <FormGroup>
      <Input
        type={type}
        {...register}
        placeholder={placeholder}
        customStyle={{ height, width }}
      />
      {errors[register.name] && (
        <ErrorMessage>{errors[register.name].message}</ErrorMessage>
      )}
    </FormGroup>
  );
};

const FormGroup = styled.div`
  margin: 15px 0;
`;

const Input = styled.input`
  height: ${({ customStyle }) => customStyle.height};
  width: ${({ customStyle }) => customStyle.width};
  background: #f6f6f6;
  border: 1px solid #e1e1e1;
  box-shadow: 0px 0px 2px 1px #0000001a inset;
  border-radius: 7px;
  padding: 0 20px;
  font-size: 20px;
  outline: none;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 18px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

export default InputField;
