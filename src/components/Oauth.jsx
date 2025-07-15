import { FaGoogle } from "react-icons/fa";

const Oauth = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-4">
        <button className="w-full h-48px flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 cursor-pointer uppercase hover:opacity-95 transition duration-150 ease-in-out">
          <FaGoogle className="p-1 mr-2 text-3xl text-white bg-transparent rounded-full" /> Continue with Google
        </button>
    </div>
  );
};

export default Oauth;