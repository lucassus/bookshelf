import React from "react";

import { CurrentUserFragment } from "../../CurrentUserProvider/CurrentUser.fragment.generated";
import { BookCopyFragment } from "../BookCopyCard.fragment.generated";
import { useBorrowBookCopyMutation } from "./BorrowBookCopy.mutation.generated";

type Props = {
  currentUser: CurrentUserFragment;
  bookCopy: BookCopyFragment;
};

export const BorrowButton: React.FunctionComponent<Props> = ({
  currentUser,
  bookCopy
}) => {
  const [borrowBookCopy, { loading }] = useBorrowBookCopyMutation();

  const handleClick = () =>
    borrowBookCopy({
      variables: { id: bookCopy.id },
      update(cache, { data }) {
        if (!data || data.borrowBookCopy.__typename !== "BookCopy") {
          return;
        }

        const { borrowBookCopy: borrowedBookCopy } = data;

        cache.modify({
          id: cache.identify(currentUser),
          fields: {
            borrowedBookCopies(refs, { toReference }) {
              return [...refs, toReference(borrowedBookCopy)];
            }
          }
        });
      }
    });

  return (
    <button disabled={loading} onClick={handleClick}>
      borrow
    </button>
  );
};
