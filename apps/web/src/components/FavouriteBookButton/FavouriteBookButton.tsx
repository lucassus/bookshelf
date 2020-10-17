import React, { MouseEventHandler } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

import { useAddBookToFavouritesMutation } from "./AddBookToFavourites.generated";
import { FavouriteBookButtonFragment } from "./FavouriteBookButton.fragment.generated";
import { useRemoveBookFromFavouritesMutation } from "./RemoveBookFromFavourites.generated";

type Props = {
  book: FavouriteBookButtonFragment;
};

export const FavouriteBookButton: React.FunctionComponent<Props> = ({
  book
}) => {
  const [addToFavourites] = useAddBookToFavouritesMutation();
  const [removeFromFavourites] = useRemoveBookFromFavouritesMutation();

  const { id, isFavourite } = book;

  const handleAddToFavourites: MouseEventHandler = () =>
    addToFavourites({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        addBookToFavourites: {
          __typename: "Book",
          id,
          isFavourite: true
        }
      }
    });

  const handleRemoveFromFavourites = () =>
    removeFromFavourites({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        removeBookFromFavourites: {
          __typename: "Book",
          id,
          isFavourite: false
        }
      }
    });

  return (
    <button
      onClick={isFavourite ? handleRemoveFromFavourites : handleAddToFavourites}
      aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
      data-testid="favourite-book-button"
    >
      {isFavourite ? <FaStar /> : <FaRegStar />}
    </button>
  );
};
