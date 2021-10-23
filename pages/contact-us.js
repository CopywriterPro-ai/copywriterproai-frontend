import * as Yup from "yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  postContactUs,
  selectors as supportSelector,
} from "@/redux/slices/support";
import ContactTemplate from "@/templates/Contact";
import {
  Form,
  FormGroup,
  Input,
  Textarea,
  SubmitButton,
} from "@/templates/Contact/styles";
import { useUser } from "@/hooks";

const ContactUs = () => {
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
    contactus: { loading, success, message, error },
  } = useSelector(supportSelector.getSupport);
  const isPending = loading === "pending";

  const onSubmit = (data) => {
    let datas;
    if (isAuth) {
      datas = { ...data, email };
    } else {
      datas = { ...data };
    }
    dispatch(postContactUs({ data: datas }));
  };

  useEffect(() => {
    if (success && !isAuth) resetForm();
  }, [isAuth, resetForm, success]);

  return (
    <ContactTemplate title="Contact Us">
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
          <Textarea {...register("message")} rows="10" />
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
  message: Yup.string().required().min(6).label("Message"),
});

export default ContactUs;
