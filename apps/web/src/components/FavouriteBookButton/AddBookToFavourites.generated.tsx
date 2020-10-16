import * as Types from "../../types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type AddBookToFavouritesMutationVariables = Types.Exact<{
  id: Types.Scalars["ExternalID"];
}>;

export type AddBookToFavouritesMutation = { __typename?: "Mutation" } & {
  addBookToFavourites:
    | ({ __typename?: "Book" } & Pick<Types.Book, "id" | "isFavourite">)
    | ({ __typename?: "ResourceNotFoundError" } & Pick<
        Types.ResourceNotFoundError,
        "message"
      >);
};

export const AddBookToFavouritesDocument = gql`
  mutation AddBookToFavourites($id: ExternalID!) {
    addBookToFavourites(id: $id) {
      ... on Book {
        id
        isFavourite
      }
      ... on ResourceNotFoundError {
        message
      }
    }
  }
`;
export type AddBookToFavouritesMutationFn = Apollo.MutationFunction<
  AddBookToFavouritesMutation,
  AddBookToFavouritesMutationVariables
>;

/**
 * __useAddBookToFavouritesMutation__
 *
 * To run a mutation, you first call `useAddBookToFavouritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookToFavouritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookToFavouritesMutation, { data, loading, error }] = useAddBookToFavouritesMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddBookToFavouritesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddBookToFavouritesMutation,
    AddBookToFavouritesMutationVariables
  >
) {
  return Apollo.useMutation<
    AddBookToFavouritesMutation,
    AddBookToFavouritesMutationVariables
  >(AddBookToFavouritesDocument, baseOptions);
}
export type AddBookToFavouritesMutationHookResult = ReturnType<
  typeof useAddBookToFavouritesMutation
>;
export type AddBookToFavouritesMutationResult = Apollo.MutationResult<
  AddBookToFavouritesMutation
>;
export type AddBookToFavouritesMutationOptions = Apollo.BaseMutationOptions<
  AddBookToFavouritesMutation,
  AddBookToFavouritesMutationVariables
>;
