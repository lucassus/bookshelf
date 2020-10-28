import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import * as yup from "yup";

import { Button } from "../../../../components/Button";
import { Book } from "../../../../types.generated";
import styles from "../../../LoginPage/LoginPage.scss";
import { ReviewFragmentDoc } from "../Review/Review.fragment.generated";
import { useCreateReviewMutation } from "./CreateReview.mutation.generated";

const schema = yup.object().shape({
  rating: yup.number().required(),
  text: yup.string().required().min(16)
});

type Props = {
  book: Pick<Book, "__typename" | "id">;
};

type Values = {
  rating: string;
  text: string;
};

export const ReviewForm: React.FunctionComponent<Props> = ({ book }) => {
  const [createReview] = useCreateReviewMutation({
    update(cache, result) {
      const review = result.data?.createReview;

      if (!review) {
        return;
      }

      cache.modify({
        id: cache.identify(book),
        fields: {
          reviews(existingReviewRefs) {
            const newReviewRef = cache.writeFragment({
              data: review,
              fragment: ReviewFragmentDoc,
              fragmentName: "Review"
            });

            return [...existingReviewRefs, newReviewRef];
          }
        }
      });
    }
  });

  const initialValues: Values = { rating: "", text: "" };

  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    setSubmitting(true);

    try {
      await createReview({
        variables: {
          input: {
            bookId: book.id,
            rating: Number(values.rating),
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
      >
        {({ errors, isSubmitting }) => (
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
      </Formik>
    </div>
  );
};
