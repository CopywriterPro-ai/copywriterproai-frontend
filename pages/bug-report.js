import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  postBugReport,
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

const BugRequest = () => {
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
    bugreport: { loading, success, message, error },
  } = useSelector(supportSelector.getSupport);
  const isPending = loading === "pending";

  const onSubmit = (data) => {
    let datas;
    const formData = new FormData();

    if (isAuth) {
      datas = { ...data, email };
    } else {
      datas = { ...data };
    }

    formData.append("email", datas.email);
    formData.append("report", datas.report);

    if (datas.screenshot[0]) {
      formData.append("image", datas.screenshot[0]);
    }

    dispatch(postBugReport({ data: formData }));
  };

  useEffect(() => {
    if (success && !isAuth) resetForm();
  }, [isAuth, resetForm, success]);

  return (
    <ContactTemplate title="Report A Bug">
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
          <Textarea {...register("report")} rows="10" />
        </FormGroup>
        <FormGroup>
          <Input type="file" {...register("screenshot")} />
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
  report: Yup.string().required().min(6).label("Report"),
  screenshot: Yup.mixed().label("Screenshoot"),
});

export default BugRequest;
