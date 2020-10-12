import * as Types from "../../types.generated";

import { CurrentUserFragment } from "../../components/CurrentUserProvider/CurrentUser.fragment.generated";
import { gql } from "@apollo/client";
import { CurrentUserFragmentDoc } from "../../components/CurrentUserProvider/CurrentUser.fragment.generated";
import * as Apollo from "@apollo/client";
export type RegisterMutationVariables = Types.Exact<{
  input: Types.RegistrationInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register:
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

export const RegisterDocument = gql`
  mutation Register($input: RegistrationInput!) {
    register(input: $input) {
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
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
