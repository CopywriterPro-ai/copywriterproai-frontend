import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  postFeatureRequest,
  selectors as supportSelector,
} from "@/redux/slices/support";
import ContactTemplate from "templates/Contact";
import {
  Form,
  FormGroup,
  Input,
  Textarea,
  SubmitButton,
} from "@/templates/Contact/styles";
import { useUser } from "@/hooks";

const FeatureRequest = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    isAuth,
    userInfo: { email },
  } = useUser();
  const {
    featurerequest: { loading, success, message, error },
  } = useSelector(supportSelector.getSupport);

  const isPending = loading === "pending";

  const onSubmit = (data) => {
    let datas;
    if (isAuth) {
      datas = { ...data, email };
    } else {
      datas = { ...data };
    }

    dispatch(postFeatureRequest({ data: datas }));
  };

  useEffect(() => {
    if (success && !isAuth) resetForm();
  }, [isAuth, resetForm, success]);

  return (
    <ContactTemplate title="Request A Feature">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Input
            readOnly={isAuth}
            type="text"
            {...register("email")}
            defaultValue={isAuth ? email : ""}
            placeholder="Email"
          />
        </FormGroup>
        <FormGroup>
          <Textarea placeholder="Feature" {...register("feature")} rows="10" />
        </FormGroup>
        {success && <p>{message}</p>}
        {error && <p>Message sending failed</p>}
        <FormGroup style={{ textAlign: "center" }}>
          <SubmitButton disabled={isPending} type="submit">
            Submit
          </SubmitButton>
        </FormGroup>
      </Form>
    </ContactTemplate>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  feature: Yup.string().required().min(6).label("Feature"),
});

export default FeatureRequest;
