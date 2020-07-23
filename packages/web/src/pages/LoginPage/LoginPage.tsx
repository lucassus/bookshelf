import React from "react";
import { useForm } from "react-hook-form";

import { useLoginMutationMutation } from "./Login.mutation.generated";

type Inputs = {
  email: string;
  password: string;
};

export const LoginPage: React.FunctionComponent = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [login, { loading }] = useLoginMutationMutation();

  const onSubmit = async (data: Inputs) => {
    const result = await login({ variables: { input: data } });

    if (result.data) {
      const { success, authToken, message } = result.data.login;

      if (success && authToken) {
        window.localStorage.setItem("authToken", authToken);
      } else {
        window.alert(message);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email-field">Email</label>
        <input type="text" id="email-field" name="email" ref={register} />

        <label htmlFor="password-field">Password</label>
        <input
          type="password"
          id="password-field"
          name="password"
          ref={register}
        />

        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
};
