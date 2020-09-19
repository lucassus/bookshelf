import React from "react";

import { BookCopyFragment } from "../BookCopy.fragment.generated";
import { useBorrowBookCopyMutation } from "./BorrowBookCopy.mutation.generated";

type Props = {
  bookCopy: BookCopyFragment;
};

export const BorrowButton: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const [borrowBookCopy, { loading }] = useBorrowBookCopyMutation();
  // const { currentUser } = useAuth();

  const handleClick = () =>
    borrowBookCopy({
      variables: { id: bookCopy.id }
      // TODO: WIP
      // update(cache, { data }) {
      //   if (!data || data.borrowBookCopy.__typename !== "BookCopy") {
      //     return;
      //   }
      //
      //   cache.modify({
      //     id: cache.identify(currentUser!),
      //     fields: {
      //       borrowedBookCopies(refs) {
      //         const newRef = cache.writeFragment({
      //           data: data.borrowBookCopy,
      //           fragment: BookCopyFragmentDoc
      //         });
      //
      //         return [...refs, newRef];
      //       }
      //     }
      //   });
      // }
    });

  return (
    <button disabled={loading} onClick={handleClick}>
      borrow
    </button>
  );
};
