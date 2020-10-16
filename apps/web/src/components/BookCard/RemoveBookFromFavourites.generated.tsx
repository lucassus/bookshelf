import * as Types from "../../types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type RemoveBookFromFavouritesMutationVariables = Types.Exact<{
  id: Types.Scalars["ExternalID"];
}>;

export type RemoveBookFromFavouritesMutation = { __typename?: "Mutation" } & {
  removeBookFromFavourites:
    | ({ __typename?: "Book" } & Pick<Types.Book, "id" | "isFavourite">)
    | ({ __typename?: "ResourceNotFoundError" } & Pick<
        Types.ResourceNotFoundError,
        "message"
      >);
};

export const RemoveBookFromFavouritesDocument = gql`
  mutation RemoveBookFromFavourites($id: ExternalID!) {
    removeBookFromFavourites(id: $id) {
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
export type RemoveBookFromFavouritesMutationFn = Apollo.MutationFunction<
  RemoveBookFromFavouritesMutation,
  RemoveBookFromFavouritesMutationVariables
>;

/**
 * __useRemoveBookFromFavouritesMutation__
 *
 * To run a mutation, you first call `useRemoveBookFromFavouritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBookFromFavouritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBookFromFavouritesMutation, { data, loading, error }] = useRemoveBookFromFavouritesMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveBookFromFavouritesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveBookFromFavouritesMutation,
    RemoveBookFromFavouritesMutationVariables
  >
) {
  return Apollo.useMutation<
    RemoveBookFromFavouritesMutation,
    RemoveBookFromFavouritesMutationVariables
  >(RemoveBookFromFavouritesDocument, baseOptions);
}
export type RemoveBookFromFavouritesMutationHookResult = ReturnType<
  typeof useRemoveBookFromFavouritesMutation
>;
export type RemoveBookFromFavouritesMutationResult = Apollo.MutationResult<
  RemoveBookFromFavouritesMutation
>;
export type RemoveBookFromFavouritesMutationOptions = Apollo.BaseMutationOptions<
  RemoveBookFromFavouritesMutation,
  RemoveBookFromFavouritesMutationVariables
>;
