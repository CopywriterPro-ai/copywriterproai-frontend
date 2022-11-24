import * as Yup from "yup";
import React, { useEffect } from "react";
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  postContactUs,
  postFeatureRequest,
  postBugReport,
  selectors as supportSelector,
} from "@/redux/slices/support";
import { InputField } from "@/components/common/Form";
import { useUser } from "@/hooks";

import { toastMessage } from "@/utils";

const ContactForm = ({ headline, formType }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const dispatcher = async (datas) => {
    if(formType === "contactUs") {
      return dispatch(postContactUs({ data: datas }));
    } else if(formType === "requestFeature") {
      return dispatch(postFeatureRequest({ data: datas }));
    } else if(formType === "reportBug") {
      return dispatch(postBugReport({ data: datas }));
    }
  }

  const onSubmit = (data) => {
    let datas;

    if (isAuth) {
      datas = { ...data, email };
    } else {
      datas = { ...data };
    }

    // if(datas.image.length && !['image/jpeg', 'image/png'].includes(datas?.image[0]?.type)) {
    //   toastMessage.error("Image type not allowed!");
    //   return;
    // }
    
    dispatcher(datas).then(({ payload }) => {
      const {
        status,
        data: { message },
      } = payload;
      if (status === 201) {
        toastMessage.success(message);
      } else if (status >= 400) {
        toastMessage.error(message);
      }
    });
  };

  useEffect(() => {
    if (success && !isAuth) resetForm();
  }, [isAuth, resetForm, success]);

  return (
    <section
      className="contact-us-form pt-60 pb-120"
      style={{
        background: "url('/shape/contact-us-bg.svg')no-repeat center bottom",
      }}
    >
      <div className="container">
        <div className="row justify-content-lg-between align-items-center">
          <div className="col-lg-6 col-md-12">
            <div className="section-heading">
              <h2>{ headline }</h2>
              {/* <p>
                Collaboratively promote client-focused convergence vis-a-vis
                customer directed alignments via standardized infrastructures.
              </p> */}
            </div>
            <form className="mt-5 register-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="name" className="mb-1">
                    Name <span className="text-danger">*</span>
                  </label>
                  <div className="mb-3">
                    <InputField
                      register={register("name")}
                      placeholder="Name"
                      ariaLabel={"name"}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label htmlFor="email" className="mb-1">
                    Email<span className="text-danger">*</span>
                  </label>
                  <div className="mb-3">
                    <InputField
                      register={register("email")}
                      placeholder="Email"
                      ariaLabel={"email"}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-12">
                  <label htmlFor="yourMessage" className="mb-1">
                    Message <span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <textarea
                      {...register("message")}
                      className="form-control"
                      id="yourMessage"
                      required
                      placeholder="How can we help you?"
                      style={{ height: '150px' }}
                    ></textarea>
                  </div>
                </div>
                {/* <div className="col-sm-12 col-12">
                  <label htmlFor="yourMessage" className="mb-1">
                    Attach Image
                  </label>
                  <div className="mb-3">
                    <InputField
                      type="file"
                      register={register("image")}
                      placeholder="Image"
                      ariaLabel={"image"}
                      required={false}
                      errors={errors}
                    />
                  </div>
                </div> */}
              </div>
              {/* {success && <p>{message}</p>}
              {error && <p>Message sending failed</p>} */}
              <button type="submit" className="btn btn-primary mt-4">
                Get in Touch
              </button>
            </form>
          </div>
          <div className="col-lg-5 col-md-10">
            <div className="contact-us-img">
              <Image
                width={526}
                height={406}
                src="/contact-us-img-1.svg"
                alt="contact us"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  message: Yup.string().required().label("Message"),
  image: Yup.mixed().label("Image"),
});

export default ContactForm;
