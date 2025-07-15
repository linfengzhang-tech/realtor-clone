import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Oauth from "../components/Oauth";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <section>
        <h1 className="text-3xl text-center mt-6 font-bold">Sign in</h1>

        <div className="flex justify-center flex-wrap items-center mx-auto px-6 py-12 max-w-6xl">
            <div className="w-full md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                <img src="/realtor.webp" alt="Signin" className="w-full rounded-2xl shadow-lg"/>
            </div>
            <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" placeholder="Email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type={showPassword ? 'text' : 'password'} id="password" placeholder="Password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.password} onChange={handleChange} />
                        <button type="button" onClick={togglePasswordVisibility} className="absolute top-6 right-4 inset-y-0 my-auto text-sm text-gray-400 hover:text-gray-800 transition duration-150 ease-in-out">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-gray-600">
                          <Link to="/forget-password" className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out">Forgot password?</Link>
                        </p>
                        <p className="text-sm text-gray-600">Don't have an account? <Link to="/sign-up" className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out">Register</Link></p>
                    </div>
                    <button type="submit" className="w-full h-[48px] flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 cursor-pointer uppercase hover:opacity-95 transition duration-150 ease-in-out">Sign in</button>
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

export default Signin;