import * as Types from "../../types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type UpdateBookFavouriteMutationVariables = Types.Exact<{
  id: Types.Scalars["ExternalID"];
  isFavourite: Types.Scalars["Boolean"];
}>;

export type UpdateBookFavouriteMutation = { __typename?: "Mutation" } & {
  updateBookFavourite:
    | ({ __typename?: "Book" } & Pick<Types.Book, "id" | "isFavourite">)
    | ({ __typename?: "MutationError" } & Pick<Types.MutationError, "message">);
};

export const UpdateBookFavouriteDocument = gql`
  mutation UpdateBookFavourite($id: ExternalID!, $isFavourite: Boolean!) {
    updateBookFavourite(id: $id, isFavourite: $isFavourite) {
      ... on Book {
        id
        isFavourite
      }
      ... on MutationError {
        message
      }
    }
  }
`;
export type UpdateBookFavouriteMutationFn = Apollo.MutationFunction<
  UpdateBookFavouriteMutation,
  UpdateBookFavouriteMutationVariables
>;

/**
 * __useUpdateBookFavouriteMutation__
 *
 * To run a mutation, you first call `useUpdateBookFavouriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookFavouriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookFavouriteMutation, { data, loading, error }] = useUpdateBookFavouriteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      isFavourite: // value for 'isFavourite'
 *   },
 * });
 */
export function useUpdateBookFavouriteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateBookFavouriteMutation,
    UpdateBookFavouriteMutationVariables
  >
) {
  return Apollo.useMutation<
    UpdateBookFavouriteMutation,
    UpdateBookFavouriteMutationVariables
  >(UpdateBookFavouriteDocument, baseOptions);
}
export type UpdateBookFavouriteMutationHookResult = ReturnType<
  typeof useUpdateBookFavouriteMutation
>;
export type UpdateBookFavouriteMutationResult = Apollo.MutationResult<
  UpdateBookFavouriteMutation
>;
export type UpdateBookFavouriteMutationOptions = Apollo.BaseMutationOptions<
  UpdateBookFavouriteMutation,
  UpdateBookFavouriteMutationVariables
>;
