import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <h1>
      <div>Sign in </div>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </h1>
  );
};

export default SignIn;
