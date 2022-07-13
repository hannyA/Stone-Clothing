import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <h1>
      <div>Sign in </div>
      <button onClick={logGoogleUser}>Sign in with Google</button>

      <SignUpForm />
    </h1>
  );
};

export default SignIn;
