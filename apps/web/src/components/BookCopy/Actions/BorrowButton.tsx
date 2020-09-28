import React from "react";

import { useAuth } from "../../AuthContext";
import { BookCopyFragment } from "../BookCopy.fragment.generated";
import { useBorrowBookCopyMutation } from "./BorrowBookCopy.mutation.generated";

type Props = {
  bookCopy: BookCopyFragment;
};

export const BorrowButton: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const [borrowBookCopy, { loading }] = useBorrowBookCopyMutation();
  const { currentUser } = useAuth();

  const handleClick = () =>
    borrowBookCopy({
      variables: { id: bookCopy.id },
      update(cache, { data }) {
        if (!data || data.borrowBookCopy.__typename !== "BookCopy") {
          return;
        }

        const { borrowBookCopy: borrowedBookCopy } = data;

        cache.modify({
          // @ts-expect-error
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
