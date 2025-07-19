import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate(); 
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [editMode, setEditMode] = useState(false);

  const { name, email } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  return (
      <section className="max-w-6xl mx-auto px-3">
        <h1 className="text-3xl font-semibold text-center mt-6">My Profile</h1>
        <div className="flex justify-center items-center mt-6">
          <form className="w-full md:w-1/2" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" value={name} onChange={handleChange} className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${!editMode ? "bg-gray-200" : ""}`} disabled={!editMode}/>
            </div>
              <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" value={email} onChange={handleChange} className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${!editMode ? "bg-gray-200" : ""}`} disabled={!editMode}/>
            </div>

            <div className="mb-6 flex justify-between items-center">
              <div>
                <span> Do you want to change your name or email?</span>&nbsp;
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditMode(!editMode);
                  }}
                  className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out"
                >
                  Edit
                </Link>
              </div>
                <div className="flex justify-end items-center">   
                  <button
                    type="button"
                    onClick={onLogout}
                    className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                  >
                    Sign Out
                  </button>
                </div>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input type="password" id="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <button type="submit" className="w-full h-[48px] flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 cursor-pointer uppercase hover:opacity-95 transition duration-150 ease-in-out">Update</button>
          </form>
        </div>
      </section>
  );
};

export default Profile;