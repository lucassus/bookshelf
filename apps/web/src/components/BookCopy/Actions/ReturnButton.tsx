import React from "react";

import { useAuth } from "../../AuthContext";
import { BookCopyFragment } from "../BookCopy.fragment.generated";
import { useReturnBookCopyMutation } from "./ReturnBookCopy.mutation.generated";

type Props = {
  bookCopy: BookCopyFragment;
};

export const ReturnButton: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const [returnBookCopy, { loading }] = useReturnBookCopyMutation();
  const { currentUser } = useAuth();

  const handleClick = () => {
    return returnBookCopy({
      variables: { id: bookCopy.id },
      update(cache, { data }) {
        if (!data || data.returnBookCopy.__typename !== "BookCopy") {
          return;
        }

        const { returnBookCopy: returnedBookCopy } = data;

        cache.modify({
          // TODO: Figure out how to pass null-check here
          id: cache.identify(currentUser!),
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
