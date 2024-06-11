import React, { useEffect } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import { AdminLayout as Layout } from "@/layout";
import { updateNotice } from "@/redux/slices/ui";
import { useNotice, useUser } from "@/hooks";
import { toastMessage } from "@/utils";

const NoticeUpdate = () => {
  const { data: noticeData, loading } = useNotice();
  const dispatch = useDispatch();
  const { isAuth, userInfo } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (Object.values(noticeData).length > 1) {
      const { title, description, active, expiryTime = dayjs() } = noticeData;
      setValue("title", title);
      setValue("description", description);
      setValue("active", active);
      setValue("expiryTime", dayjs(expiryTime).format("YYYY-MM-DD"));
    }
  }, [noticeData, setValue]);

  const onSubmit = (data) => {
    if (isAuth && userInfo?.role === "admin") {
      loading === "idle" &&
        dispatch(updateNotice({ data })).then(({ payload }) => {
          if (payload.status === 200) {
            toastMessage.success("Successfully update");
          } else {
            toastMessage.warn("Something went wrong...");
          }
        });
    } else {
      toastMessage.error("Access denied");
    }
  };

  return (
    <Layout>
      <Container>
        <h4>Notice Update</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputController>
            <label htmlFor="title">Title</label>
            <input type="text" {...register("title")} id="title" />
            {errors.title && <p>{errors.title.message}</p>}
          </InputController>
          <InputController>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              {...register("description")}
              id="description"
              rows="4"
            />
            {errors.description && <p>{errors.description.message}</p>}
          </InputController>
          <InputController>
            <label htmlFor="expiryTime">Expiry Time</label>
            <input type="date" {...register("expiryTime")} id="expiryTime" />
            {errors.expiryTime && <p>Please provide valid date</p>}
          </InputController>
          <InputController>
            <label htmlFor="active">Active</label>
            <input type="checkbox" {...register("active")} id="active" />
            {errors.active && <p>{errors.active.message}</p>}
          </InputController>
          <SubmitButton type="submit">Update</SubmitButton>
        </form>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: center;
`;

const InputController = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 15px 0;

  input {
    outline: 0;
    border: 0;
    padding: 2px;
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  }

  input[type="checkbox"] {
    transform: scale(1.4);
    padding: 10px;
  }

  textarea {
    outline: 0;
    border: 0;
    padding: 2px;
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    resize: none;
  }

  label {
    margin-bottom: 0.2rem;
  }

  p {
    color: red;
  }
`;

const SubmitButton = styled.button`
  background: #03a9f4;
  color: white;
  border: 0;
  padding: 5px 20px;
  border-radius: 5px;
  user-select: none;
`;

const validationSchema = Yup.object().shape({
  title: Yup.string().required().max(50).label("Title"),
  description: Yup.string().required().max(150).label("Description"),
  expiryTime: Yup.date().required().label("Expiry Time"),
  active: Yup.boolean().label("Notice Active"),
});

export default NoticeUpdate;
