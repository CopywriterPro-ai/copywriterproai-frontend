import * as Yup from "yup";

import toastMessage from "./toastMessage";

const AUTO_CLOSE_TIME = 5000;

const yupValidate = (schemaObject = {}, inputObject = {}) => {
  let result = { isValid: false, values: inputObject };
  try {
    const validValue = Yup.object()
      .shape(schemaObject)
      .validateSync(inputObject, { stripUnknown: true });
    result = { isValid: true, values: validValue };
  } catch (err) {
    if (err.name === "ValidationError") {
      toastMessage.warn(err.errors[0], AUTO_CLOSE_TIME, { toastId: err.path });
    }
  }
  return result;
};

export default yupValidate;
