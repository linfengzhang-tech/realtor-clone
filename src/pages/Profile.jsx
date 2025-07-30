import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {FcHome} from "react-icons/fc";
import { collection, query, where, getDocs, deleteDoc, doc, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import ListingItem from "../components/ListingItem";

const Profile = () => {
  const navigate = useNavigate(); 
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [editMode, setEditMode] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  const onDelete = (listingId) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      const docRef = doc(db, "listings", listingId);
      deleteDoc(docRef);
    }
  };

  const onEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`);
  };

  return (
    <>
      <section className="max-w-6xl mx-auto px-3">
        <h1 className="text-3xl font-semibold text-center mt-6">My Profile</h1>
        <div className="flex justify-center items-center mt-6 flex-col">
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
          </form>

          <div className="w-full md:w-1/2">
            <button type="submit" className="w-full h-[48px] flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 cursor-pointer uppercase hover:opacity-95 transition duration-150 ease-in-out">
              <Link to="/create-listing" className="flex items-center justify-center">
                <FcHome className="mr-2" /> Sell or rent your home
              </Link>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl px-3 mt-6 mx-auto">
      {!loading && listings.length > 0 && (
        <>
          <h2 className="text-2xl text-center font-semibold mb-6">
            My Listings
          </h2>
          <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {listings.map((listing) => (
              <ListingItem
                key={listing.id}
                id={listing.id}
                listing={listing.data}
                onDelete={() => onDelete(listing.id)}
                onEdit={() => onEdit(listing.id)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
    </>
  );
};

export default Profile;