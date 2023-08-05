import React from 'react';
import './Navbar.css'
import { signOut } from "firebase/auth";
import { auth  } from '../../firebase/firebase';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      toast.success("Signed Out Successfully")
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <nav className="navbar">
      <div>
        <h2 className="text__title2">La Padrera</h2>
      </div>
      <div>
        <div></div>
        <button className="signout-btn" onClick={handleSignOut}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
