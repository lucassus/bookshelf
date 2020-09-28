import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import * as yup from "yup";

import { CurrentUserFragment } from "../../components/AuthContext/CurrentUser.fragment.generated";
import { normalizeValidationErrors } from "../../utils/normalizeValidationErrors";
import styles from "../LoginPage/LoginPage.module.scss";
import { useUpdateProfileMutation } from "./UpdateProfile.mutation.generated";

type Values = {
  email: string;
  name: string;
  info: string;
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
  name: yup.string().required(),
  info: yup.string()
});

type Props = {
  currentUser: CurrentUserFragment;
};

export const ProfilePage: React.FunctionComponent<Props> = ({
  currentUser
}) => {
  const [updateProfile] = useUpdateProfileMutation();

  const handleSubmit = async (
    values: Values,
    { setSubmitting, setErrors }: FormikHelpers<Values>
  ) => {
    setSubmitting(true);

    try {
      const { data } = await updateProfile({ variables: { input: values } });
      const result = data!.updateProfile;

      if (result.__typename === "ValidationErrors") {
        setErrors(normalizeValidationErrors(result.errors));
        setSubmitting(false);
      }
    } catch {
      setSubmitting(false);
    }
  };

  const initialValues = {
    email: currentUser.email!,
    name: currentUser.name,
    info: currentUser.info
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
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
              <label htmlFor="name-field">Name</label>
              <Field name="name" type="text" id="name-field" />
              <p>{errors.name}</p>
            </div>

            <div>
              <label htmlFor="info-field">Info</label>
              <Field name="info" type="text" id="info-field" />
              <p>{errors.info}</p>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Update
            </button>
          </Form>
        )}
      />
    </div>
  );
};
