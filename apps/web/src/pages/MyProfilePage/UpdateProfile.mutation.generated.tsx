import * as Types from "../../types.generated";

import { CurrentUserFragment } from "../../components/CurrentUserProvider/CurrentUser.fragment.generated";
import { gql } from "@apollo/client";
import { CurrentUserFragmentDoc } from "../../components/CurrentUserProvider/CurrentUser.fragment.generated";
import * as Apollo from "@apollo/client";
export type UpdateProfileMutationVariables = Types.Exact<{
  input: Types.UpdateProfileInput;
}>;

export type UpdateProfileMutation = { __typename?: "Mutation" } & {
  updateProfile:
    | ({ __typename: "ProtectedUser" } & CurrentUserFragment)
    | ({ __typename: "ValidationErrors" } & {
        errors: Array<
          { __typename?: "ValidationError" } & Pick<
            Types.ValidationError,
            "path" | "message"
          >
        >;
      });
};

export const UpdateProfileDocument = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      __typename
      ... on ProtectedUser {
        ...CurrentUser
      }
      ... on ValidationErrors {
        errors {
          path
          message
        }
      }
    }
  }
  ${CurrentUserFragmentDoc}
`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >
) {
  return Apollo.useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument, baseOptions);
}
export type UpdateProfileMutationHookResult = ReturnType<
  typeof useUpdateProfileMutation
>;
export type UpdateProfileMutationResult = Apollo.MutationResult<
  UpdateProfileMutation
>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;
