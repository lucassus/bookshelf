import * as Types from "../../../types.generated";

import { BookCopyCardFragment } from "../BookCopyCard.fragment.generated";
import { gql } from "@apollo/client";
import { BookCopyCardFragmentDoc } from "../BookCopyCard.fragment.generated";
import * as Apollo from "@apollo/client";
export type ReturnBookCopyMutationVariables = Types.Exact<{
  id: Types.Scalars["ExternalID"];
}>;

export type ReturnBookCopyMutation = { __typename?: "Mutation" } & {
  returnBookCopy:
    | ({ __typename?: "BookCopy" } & BookCopyCardFragment)
    | ({ __typename?: "MutationError" } & Pick<Types.MutationError, "message">);
};

export const ReturnBookCopyDocument = gql`
  mutation ReturnBookCopy($id: ExternalID!) {
    returnBookCopy(id: $id) {
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
export type ReturnBookCopyMutationFn = Apollo.MutationFunction<
  ReturnBookCopyMutation,
  ReturnBookCopyMutationVariables
>;

/**
 * __useReturnBookCopyMutation__
 *
 * To run a mutation, you first call `useReturnBookCopyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReturnBookCopyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [returnBookCopyMutation, { data, loading, error }] = useReturnBookCopyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReturnBookCopyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReturnBookCopyMutation,
    ReturnBookCopyMutationVariables
  >
) {
  return Apollo.useMutation<
    ReturnBookCopyMutation,
    ReturnBookCopyMutationVariables
  >(ReturnBookCopyDocument, baseOptions);
}
export type ReturnBookCopyMutationHookResult = ReturnType<
  typeof useReturnBookCopyMutation
>;
export type ReturnBookCopyMutationResult = Apollo.MutationResult<
  ReturnBookCopyMutation
>;
export type ReturnBookCopyMutationOptions = Apollo.BaseMutationOptions<
  ReturnBookCopyMutation,
  ReturnBookCopyMutationVariables
>;
