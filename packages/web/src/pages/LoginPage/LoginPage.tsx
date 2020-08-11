import React from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "../../components/AuthContext";
import { useLoginMutation } from "./Login.mutation.generated";

type Inputs = {
  email: string;
  password: string;
};

export const LoginPage: React.FunctionComponent = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [login, { loading }] = useLoginMutation();
  const { authorize } = useAuth();

  const onSubmit = async (input: Inputs) => {
    const result = await login({ variables: { input } });

    if (result.data) {
      const { success, message, currentUser } = result.data.login;

      if (success && currentUser) {
        authorize(currentUser);
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
