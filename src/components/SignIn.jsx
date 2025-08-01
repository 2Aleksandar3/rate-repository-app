import React from "react";
import SignInContainer from "./SignInContainer";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      navigate("/");
      console.log("Access token:", data.authenticate.accessToken);
    } catch (e) {
      console.error("Sign in error:", e.message);
    }
  };

  return <SignInContainer onSubmit={handleSubmit} />;
};

export default SignIn;
