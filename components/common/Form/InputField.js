import styled from "styled-components";

const InputField = ({
  type = "text",
  placeholder,
  register,
  required = true,
  errors,
}) => {
  return (
    <div>
      <input
        type={type}
        className="form-control"
        {...register}
        placeholder={placeholder}
        required={required}
      />
      {/* {errors[register.name] && (
        <ErrorMessage>{errors[register.name].message}</ErrorMessage>
      )} */}
    </div>
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
