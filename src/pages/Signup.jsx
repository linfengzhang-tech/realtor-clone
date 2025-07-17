import { useState } from "react";
import { Link } from "react-router-dom";
import Oauth from "../components/Oauth";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: name });
        const formDataCopy = { ...formData, timestamp: serverTimestamp() };
        delete formDataCopy.password;
        setDoc(doc(db, "users", user.uid), formDataCopy);
        toast.success("Registration successful");
        navigate("/");
      })
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/email-already-in-use") {
        toast.error("This email is already in use. Please try another one.");
      } else {
        toast.error("Failed to register: " + errorMessage);
      }
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="/key.webp"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Full Name"
              className="text-sm mb-6 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
              className="mb-6 w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="mb-6 w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6 text-sm">
                Have an account?
                <Link
                  to="/sign-in"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Sign in
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded-md shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            >
              Sign Up
            </button>
            </form>

            <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <Oauth />
        </div>
      </div>
    </section>
  );
};

export default Signup;