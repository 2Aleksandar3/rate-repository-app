import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { CREATE_USER } from "../graphql/queries";
import SignUpForm from "./SignUpForm";
import useSignIn from "../hooks/useSignIn";

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      await createUser({ variables: { username, password } });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.error("Sign up failed:", e.message);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
