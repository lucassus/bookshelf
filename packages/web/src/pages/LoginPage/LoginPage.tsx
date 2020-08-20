import { yupResolver } from "@hookform/resolvers";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useAuth } from "../../components/AuthContext";
import { useLoginMutation } from "./Login.mutation.generated";
import styles from "./LoginPage.module.scss";

type Inputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6)
});

export const LoginPage: React.FunctionComponent = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });
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

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <label htmlFor="email-field">Email</label>
          <input type="text" id="email-field" name="email" ref={register} />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="password-field">Password</label>
          <input
            type="password"
            id="password-field"
            name="password"
            ref={register}
          />
          <p>{errors.password?.message}</p>
        </div>

        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
};
