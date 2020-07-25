import React from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "../../components/AuthContext";
import { useLoginMutationMutation } from "./Login.mutation.generated";

type Inputs = {
  email: string;
  password: string;
};

export const LoginPage: React.FunctionComponent = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [login, { loading }] = useLoginMutationMutation();
  const auth = useAuth();

  const onSubmit = async (data: Inputs) => {
    const result = await login({ variables: { input: data } });

    if (result.data) {
      const { success, authToken, message } = result.data.login;

      if (success && authToken) {
        auth.authorize(authToken);
      } else {
        window.alert(message);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email-field">Email</label>
          <input type="text" id="email-field" name="email" ref={register} />
        </div>

        <div>
          <label htmlFor="password-field">Password</label>
          <input
            type="password"
            id="password-field"
            name="password"
            ref={register}
          />
        </div>

        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
};
