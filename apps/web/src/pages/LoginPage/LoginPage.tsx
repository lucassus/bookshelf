import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useNavigate } from "react-router";
import * as yup from "yup";

import { resetWsConnection } from "../../apolloClient";
import { Button } from "../../components/Button";
import { normalizeValidationErrors } from "../../utils/normalizeValidationErrors";
import { useLoginMutation } from "./Login.mutation.generated";
import styles from "./LoginPage.scss";

type Values = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6)
});

export const LoginPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [login] = useLoginMutation({
    update: (cache) => cache.reset()
  });

  const handleSubmit = async (
    values: Values,
    { setSubmitting, setErrors }: FormikHelpers<Values>
  ) => {
    setSubmitting(true);

    try {
      const { data } = await login({ variables: { input: values } });
      const result = data!.login;

      if (result.__typename === "LoginSuccess") {
        navigate("/");
        resetWsConnection();
      }

      if (result.__typename === "LoginFailure") {
        setErrors(normalizeValidationErrors(result.validationErrors));
        setSubmitting(false);
      }
    } catch {
      setSubmitting(false);
    }
  };

  const initialValues: Values = { email: "", password: "" };

  return (
    <div>
      <h2>Login</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ errors, isSubmitting }) => (
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

            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>

      <h3>Example credentials</h3>
      <ul>
        <li>Regular user: bob@example.com / password</li>
        <li>Admin user: luke@example.com / password</li>
      </ul>
    </div>
  );
};
