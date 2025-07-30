import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);  
      } else {
        setUser(null);
      }
    });
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
            <img className="h-5 cursor-pointer" src="/logo-brand.svg" alt="Logo" />
        </div>

        <div>
            <ul className="flex items-center space-x-10">
                <li className={`py-3 border-b-[3px] text-sm text-gray-600 hover:text-red-500 transition duration-300 ${isActive('/') ? 'text-black border-b-red-500 pointer-events-none' : 'text-gray-500 border-b-transparent'}`}>
                    <Link to="/">Home</Link>
                </li>
              <li className={`py-3 border-b-[3px] text-sm hover:text-red-500 transition duration-300 ${isActive('/offers') ? 'text-black border-b-red-500 pointer-events-none' : 'text-gray-500 border-b-transparent'}`}>
                    <Link to="/offers">Offers</Link>
              </li>
              {user ? (
                <li className={`py-3 border-b-[3px] text-sm hover:text-red-500 transition duration-300 ${isActive('/profile') ? 'text-black border-b-red-500 pointer-events-none' : 'text-gray-500 border-b-transparent'}`}>
                  <Link to="/profile">Profile</Link>
                </li>
              ) : (
                <li className={`py-3 border-b-[3px] text-sm hover:text-red-500 transition duration-300 ${isActive('/sign-in') ? 'text-black border-b-red-500 pointer-events-none' : 'text-gray-500 border-b-transparent'}`}>
                  <Link to="/sign-in">Sign in</Link>
                </li>
              )}
            </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;