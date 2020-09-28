import React from "react";

import { useAuth } from "../../AuthContext";
import { BookCopyFragment } from "../BookCopy.fragment.generated";
import { useBorrowBookCopyMutation } from "./BorrowBookCopy.mutation.generated";

type Props = {
  bookCopy: BookCopyFragment;
};

export const BorrowButton: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const [borrowBookCopy, { loading }] = useBorrowBookCopyMutation();
  // TODO: Create `CurrentUserProvider` and `useCurrentUser` hook
  const { currentUser } = useAuth();

  const handleClick = () =>
    borrowBookCopy({
      variables: { id: bookCopy.id },
      update(cache, { data }) {
        if (!data || data.borrowBookCopy.__typename !== "BookCopy") {
          return;
        }

        cache.modify({
          // @ts-expect-error
          id: cache.identify(currentUser),
          fields: {
            borrowedBookCopies(refs, { toReference }) {
              return [...refs, toReference(data.borrowBookCopy)];
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
