import { Image, Transformation } from "cloudinary-react";
import React from "react";
import { useParams, Link } from "react-router-dom";

import { BookCopiesList } from "../../components/BookCopiesList";
import { useCurrentUser } from "../../components/CurrentUserProvider";
import { ErrorAlert } from "../../components/ErrorAlert";
import { FavouriteBookButton } from "../../components/FavouriteBookButton";
import { NotFoundPage } from "../NotFoundPage";
import styles from "./BookDetailsPage.module.scss";
import { Review } from "./components/Review";
import { ReviewForm } from "./components/ReviewForm";
import { useGetBookQuery } from "./GetBook.query.generated";

export const BookDetailsPage: React.FunctionComponent = () => {
  const params = useParams();
  const currentUser = useCurrentUser();

  const { loading, data, error } = useGetBookQuery({
    variables: { id: params.id }
  });

  if (loading) {
    return <span>Loading book...</span>;
  }

  if (error || !data) {
    return <ErrorAlert message="Count not load book!" />;
  }

  const { book } = data;

  if (book.__typename === "ResourceNotFoundError") {
    return <NotFoundPage message={book.message} />;
  }

  const canAddReview =
    currentUser &&
    !book.reviews.map((review) => review.author.id).includes(currentUser.id);

  return (
    <div className={styles.container}>
      <h2>{book.title}</h2>

      <div className={styles.book}>
        <div>
          <Image
            className={styles.bookCover}
            publicId={book.cover.path}
            alt="Book cover"
          >
            <Transformation height={400} crop="scale" />
          </Image>
        </div>

        <div className={styles.details}>
          <h3>
            Written by{" "}
            <Link to={`/authors/${book.author.id}`}>{book.author.name}</Link>
          </h3>

          <p>{book.description}</p>

          {currentUser && <FavouriteBookButton book={book} />}
        </div>
      </div>

      {book.copies.length > 0 && (
        <div className={styles.bookCopies}>
          <h3>Copies</h3>
          <BookCopiesList bookCopies={book.copies} />
        </div>
      )}

      {book.reviews.length > 0 && (
        <div>
          <h2>Reviews</h2>

          <dl>
            {book.reviews.map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </dl>
        </div>
      )}

      {canAddReview && <ReviewForm book={book} />}
    </div>
  );
};
