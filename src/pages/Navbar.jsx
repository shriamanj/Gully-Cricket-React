
import { Link } from "react-router";
import logo from "../assets/3a-logo.png";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

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
    <div className="flex justify-between items-center bg-gray-900 text-white px-4 py-2 shadow">
      <Link to="/" className="flex gap-2 items-center">
        <img src={logo} className="w-10 py-1" alt="Logo" />
        <div className="text-2xl font-semibold">3A Softwares</div>
      </Link>
      <div className="flex gap-4 items-center">
        <Link
          to="/playground"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-700 shadow hover:bg-gray-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
        >
          Matches
        </Link>
        <Link
          to="/table"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-700 shadow hover:bg-gray-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
        >
          Points Table
        </Link>
        {showInstall && (
          <button
            onClick={handleInstallClick}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg border border-gray-700 shadow hover:bg-gray-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
          >
            Install
          </button>
        )}
      </div>
    </div>
  );
};
export default Navbar;
