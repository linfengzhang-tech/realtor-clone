import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { serverTimestamp } from "firebase/firestore";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Oauth = () => {
  const navigate = useNavigate();
  const handleGoogleSignIn = async() => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            timestamp: serverTimestamp(),
          });
        }
        toast.success("Signed in with Google");
        navigate("/profile");
      })
      .catch((error) => {
        toast.error("Error during sign-in: " + error.message);
      });

  };
  return (
    <div className="flex flex-col items-center justify-center mt-4">
        <button className="w-full h-48px flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 cursor-pointer uppercase hover:opacity-95 transition duration-150 ease-in-out" type="button" onClick={handleGoogleSignIn}>
          <FaGoogle className="p-1 mr-2 text-3xl text-white bg-transparent rounded-full" /> Continue with Google
        </button>
    </div>
  );
};

export default Oauth;