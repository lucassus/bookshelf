import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import * as yup from "yup";

import { Button } from "../../../../components/Button";
import styles from "../../../LoginPage/LoginPage.scss";
import { useCreateReviewMutation } from "./CreateReview.mutation.generated";

const schema = yup.object().shape({});

type Props = {
  bookId: string;
};

type Values = {
  rating?: string;
  text?: string;
};

// TODO: Hide it when logged out
// TODO: Hide it when already reviewed
export const ReviewForm: React.FunctionComponent<Props> = ({ bookId }) => {
  const [createReview] = useCreateReviewMutation();

  const initialValues: Values = { rating: undefined, text: undefined };

  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    setSubmitting(true);

    try {
      // TODO: Update the cached query
      await createReview({
        variables: {
          input: {
            bookId,
            rating: values.rating ? Number(values.rating) : null,
            text: values.text
          }
        }
      });
    } finally {
      setSubmitting(false);
    }
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
              <label htmlFor="rating-field">Rating</label>
              <Field name="rating" as="select" id="rating-field">
                <option value="" />
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Field>
              <p>{errors.rating}</p>
            </div>

            <div>
              <label htmlFor="text-field">Text</label>
              <Field name="text" type="text" id="text-field" />
              <p>{errors.text}</p>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              Add a review
            </Button>
          </Form>
        )}
      />
    </div>
  );
};
