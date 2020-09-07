import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import * as yup from "yup";

import { useAuth } from "../../components/AuthContext";
import { useLoginMutation } from "./Login.mutation.generated";
import styles from "./LoginPage.module.scss";

type Values = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6)
});

export const LoginPage: React.FunctionComponent = () => {
  const [login] = useLoginMutation();
  const { authorize } = useAuth();

  const handleSubmit = async (
    values: Values,
    { setSubmitting, setFieldError }: FormikHelpers<Values>
  ) => {
    setSubmitting(true);

    try {
      const { data } = await login({ variables: { input: values } });
      const result = data!.login;

      if (result.__typename === "LoginSuccess") {
        authorize(result.currentUser);
      } else {
        setFieldError("password", result.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
        render={({ errors, isSubmitting }) => (
          <Form className={styles.form}>
            <div>
              <label htmlFor="email-field">Email</label>
              <Field name="email" type="text" id="email-field" />
              <p>{errors.email}</p>
            </div>

            <div>
              <label htmlFor="password-field">Password</label>
              <Field name="password" type="password" id="password-field" />
              <p>{errors.password}</p>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      />
    </div>
  );
};
