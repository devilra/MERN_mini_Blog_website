import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FcDislike } from "react-icons/fc";

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  return (
    <div className="py-4 px-2 bg-neutral-400 flex justify-end items-center space-x-4 ">
      <Link to="/">
        <FcDislike size={30} />
      </Link>
      <Link
        className="px-5 py-2 text-white font-bold border border-neutral-900 rounded-md"
        to="/create">
        create
      </Link>
      <button
        onClick={() => logout()}
        className="bg-rose-500  text-white font-bold px-7 py-2 rounded-md">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
