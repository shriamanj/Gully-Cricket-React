import { Link } from "react-router";
import logo from "../assets/3a-logo.png";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    if (!showMenu) return;
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowInstall(false);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-gray-900 text-white px-4 py-2 shadow">
        <Link to="/" className="flex gap-2 items-center">
          <img src={logo} className="w-10 py-1" alt="Logo" />
          <div className="text-2xl font-semibold">3A Softwares</div>
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            to="/playground"
            className="hidden sm:flex bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-700 shadow hover:bg-gray-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
          >
            Matches
          </Link>
          <Link
            to="/table"
            className="hidden sm:flex bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-700 shadow hover:bg-gray-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
          >
            Points Table
          </Link>
          {showInstall && (
            <button
              onClick={handleInstallClick}
              className="hidden sm:flex bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-700 shadow hover:bg-gray-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
            >
              Install
            </button>
          )}
          <button
            id="menu-btn"
            onClick={() => setShowMenu(!showMenu)}
            className="flex sm:hidden text-white focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {showMenu && (
        <div  ref={menuRef} className="z-10 border-b-2 flex flex-col justify-end sm:hidden absolute text-right top-16 font-semibold bg-white px-4 py-4 w-full space-y-2">
          <Link
            to="/playground"
            className="block text-gray-700 hover:text-blue-500"
          >
            Matches
          </Link>
          <Link to="/table" className="block text-gray-700 hover:text-blue-500">
            Points Table
          </Link>
          {showInstall && (
            <button
              onClick={handleInstallClick}
              className="flex justify-end text-gray-700 hover:text-blue-500"
            >
              Download App
            </button>
          )}
        </div>
      )}
    </>
  );
};
export default Navbar;
