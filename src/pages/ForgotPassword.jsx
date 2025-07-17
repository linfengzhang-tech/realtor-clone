import { useState } from "react";
import { Link } from "react-router-dom";
import Oauth from "../components/Oauth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState(''); 

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userRef = doc(db, "users", email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        await sendPasswordResetEmail(auth, email).then(() => {
          toast.success("Password reset email sent");
        });
      } else {
        toast.error("Please enter a valid email address");
      }
    } catch (error) {
      toast.error("Failed to send password reset email");
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <section>
        <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>

        <div className="flex justify-center flex-wrap items-center mx-auto px-6 py-12 max-w-6xl">
            <div className="w-full md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                <img src="/realtor.webp" alt="Signin" className="w-full rounded-2xl shadow-lg"/>
            </div>
            <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" placeholder="Email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={email} onChange={handleChange} />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-gray-600">
                          <Link to="/sign-in" className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out">Sign in instead</Link>
                        </p>
                        <p className="text-sm text-gray-600">Don't have an account? <Link to="/sign-up" className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out">Register</Link></p>
                    </div>
                    <button type="submit" className="w-full h-[48px] flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 cursor-pointer uppercase hover:opacity-95 transition duration-150 ease-in-out">Send Reset Password</button>
                  </form>
                  <div className="flex items-center justify-center my-4">
                    <div className="w-full border-b border-gray-300"></div>
                    <p className="text-sm text-gray-800 font-semibold mx-4">OR</p>
                    <div className="w-full border-b border-gray-300"></div>
                  </div>

                  <Oauth />
            </div>
        </div>
    </section>
  )
};

export default ForgotPassword;