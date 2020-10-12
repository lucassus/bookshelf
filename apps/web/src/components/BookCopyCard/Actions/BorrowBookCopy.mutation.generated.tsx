import * as Types from "../../../types.generated";

import { BookCopyCardFragment } from "../BookCopyCard.fragment.generated";
import { gql } from "@apollo/client";
import { BookCopyCardFragmentDoc } from "../BookCopyCard.fragment.generated";
import * as Apollo from "@apollo/client";
export type BorrowBookCopyMutationVariables = Types.Exact<{
  id: Types.Scalars["ExternalID"];
}>;

export type BorrowBookCopyMutation = { __typename?: "Mutation" } & {
  borrowBookCopy:
    | ({ __typename?: "BookCopy" } & BookCopyCardFragment)
    | ({ __typename?: "MutationError" } & Pick<Types.MutationError, "message">);
};

export const BorrowBookCopyDocument = gql`
  mutation BorrowBookCopy($id: ExternalID!) {
    borrowBookCopy(id: $id) {
      ... on BookCopy {
        ...BookCopyCard
      }
      ... on MutationError {
        message
      }
    }
  }
  ${BookCopyCardFragmentDoc}
`;
export type BorrowBookCopyMutationFn = Apollo.MutationFunction<
  BorrowBookCopyMutation,
  BorrowBookCopyMutationVariables
>;

/**
 * __useBorrowBookCopyMutation__
 *
 * To run a mutation, you first call `useBorrowBookCopyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBorrowBookCopyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [borrowBookCopyMutation, { data, loading, error }] = useBorrowBookCopyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBorrowBookCopyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    BorrowBookCopyMutation,
    BorrowBookCopyMutationVariables
  >
) {
  return Apollo.useMutation<
    BorrowBookCopyMutation,
    BorrowBookCopyMutationVariables
  >(BorrowBookCopyDocument, baseOptions);
}
export type BorrowBookCopyMutationHookResult = ReturnType<
  typeof useBorrowBookCopyMutation
>;
export type BorrowBookCopyMutationResult = Apollo.MutationResult<
  BorrowBookCopyMutation
>;
export type BorrowBookCopyMutationOptions = Apollo.BaseMutationOptions<
  BorrowBookCopyMutation,
  BorrowBookCopyMutationVariables
>;
