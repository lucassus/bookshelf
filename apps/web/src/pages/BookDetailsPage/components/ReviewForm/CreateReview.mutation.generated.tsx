import * as Types from "../../../../types.generated";

import { ReviewFragment } from "../Review/Review.fragment.generated";
import { gql } from "@apollo/client";
import { ReviewFragmentDoc } from "../Review/Review.fragment.generated";
import * as Apollo from "@apollo/client";
export type CreateReviewMutationVariables = Types.Exact<{
  input: Types.CreateReviewInput;
}>;

export type CreateReviewMutation = { __typename?: "Mutation" } & {
  createReview: { __typename?: "Review" } & ReviewFragment;
};

export const CreateReviewDocument = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      ...Review
    }
  }
  ${ReviewFragmentDoc}
`;
export type CreateReviewMutationFn = Apollo.MutationFunction<
  CreateReviewMutation,
  CreateReviewMutationVariables
>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateReviewMutation,
    CreateReviewMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateReviewMutation,
    CreateReviewMutationVariables
  >(CreateReviewDocument, baseOptions);
}
export type CreateReviewMutationHookResult = ReturnType<
  typeof useCreateReviewMutation
>;
export type CreateReviewMutationResult = Apollo.MutationResult<
  CreateReviewMutation
>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<
  CreateReviewMutation,
  CreateReviewMutationVariables
>;
