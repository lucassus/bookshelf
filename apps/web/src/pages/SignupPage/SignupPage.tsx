import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import * as yup from "yup";

import { useAuth } from "../../components/AuthContext";
import { normalizeValidationErrors } from "../../utils/normalizeValidationErrors";
import { useRegisterMutation } from "./Register.mutation.generated";
import styles from "./SignupPage.module.scss";

type Values = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const schema = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords don't match")
});

export const SignupPage: React.FunctionComponent = () => {
  const [register] = useRegisterMutation();
  const { authorize } = useAuth();

  const handleSubmit = async (
    values: Values,
    { setSubmitting, setErrors }: FormikHelpers<Values>
  ) => {
    setSubmitting(true);

    try {
      const { name, email, password } = values;
      const { data } = await register({
        variables: { input: { name, email, password } }
      });
      const result = data!.register;

      if (result.__typename === "ProtectedUser") {
        authorize(result);
      } else {
        setErrors(normalizeValidationErrors(result.errors));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirmation: ""
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
        render={({ errors, isSubmitting }) => (
          <Form className={styles.form}>
            <div>
              <label htmlFor="name-field">Name</label>
              <Field name="name" type="text" id="name-field" />
              <p>{errors.name}</p>
            </div>

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

            <div>
              <label htmlFor="password-confirmation-field">
                Password confirmation
              </label>
              <Field
                name="passwordConfirmation"
                type="password"
                id="password-confirmation-field"
              />
              <p>{errors.passwordConfirmation}</p>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Signup
            </button>
          </Form>
        )}
      />
    </div>
  );
};
