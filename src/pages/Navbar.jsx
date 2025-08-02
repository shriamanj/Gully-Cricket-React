import { Link } from "react-router";
import logo from "../assets/3a-logo.png";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-gray-900 text-white px-4 py-2 shadow">
      <Link to="/" className="flex gap-2 items-center">
        <img src={logo} className="w-10 py-1" alt="Logo" />
        <div className="text-2xl font-semibold">3A Softwares</div>
      </Link>
      <div className="flex gap-4">
        <Link
          to="/playground"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 shadow hover:bg-gray-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
        >
          Matches
        </Link>
        <Link
          to="/table"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 shadow hover:bg-gray-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
        >
          Points Table
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
