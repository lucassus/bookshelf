import React from "react";

import { CurrentUserFragment } from "../../CurrentUserProvider/CurrentUser.fragment.generated";
import { BookCopyFragment } from "../BookCopyCard.fragment.generated";
import { useReturnBookCopyMutation } from "./ReturnBookCopy.mutation.generated";

type Props = {
  currentUser: CurrentUserFragment;
  bookCopy: BookCopyFragment;
};

export const ReturnButton: React.FunctionComponent<Props> = ({
  currentUser,
  bookCopy
}) => {
  const [returnBookCopy, { loading }] = useReturnBookCopyMutation();

  const handleClick = () => {
    return returnBookCopy({
      variables: { id: bookCopy.id },
      update(cache, { data }) {
        if (!data || data.returnBookCopy.__typename !== "BookCopy") {
          return;
        }

        const { returnBookCopy: returnedBookCopy } = data;

        cache.modify({
          id: cache.identify(currentUser),
          fields: {
            borrowedBookCopies(refs, { readField }) {
              return refs.filter(
                (bookCopyRef) =>
                  readField("id", bookCopyRef) !== returnedBookCopy.id
              );
            }
          }
        });
      }
    });
  };

  return (
    <button disabled={loading} onClick={handleClick}>
      return
    </button>
  );
};
