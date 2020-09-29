import React from "react";

import { useCurrentUser } from "../../CurrentUserProvider";
import { BookCopyFragment } from "../BookCopy.fragment.generated";
import { useBorrowBookCopyMutation } from "./BorrowBookCopy.mutation.generated";

type Props = {
  bookCopy: BookCopyFragment;
};

export const BorrowButton: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const [borrowBookCopy, { loading }] = useBorrowBookCopyMutation();
  const currentUser = useCurrentUser();

  const handleClick = () =>
    borrowBookCopy({
      variables: { id: bookCopy.id },
      update(cache, { data }) {
        if (!data || data.borrowBookCopy.__typename !== "BookCopy") {
          return;
        }

        const { borrowBookCopy: borrowedBookCopy } = data;

        cache.modify({
          id: cache.identify(currentUser!),
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
