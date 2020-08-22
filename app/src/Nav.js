import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductionPage from "./components/production/ProductionPage";
import firebase from "./Firebase";

import NavUser from "../src/components/production/NavUser";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function useAuth() {
  const [user, setUser] = useState();

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        };
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
}

export function UserLogin() {
  const [authError, setAuthError] = useState(null);

  const signinUser = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error);
      console.log(error);
    }
  };

  if (authError) {
    alert(authError.message);
  }

  return (
    <>
      <nav id="userLogin" className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <Link to="/" className="navbar-brand">
          <img src="https://colorlib.com/preview/theme/eighty8/img/logo-big.png" className="brand" />{" "}
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto text-md-center text-center">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/booking" className="nav-link">
                Booking
              </Link>
            </li>
          </ul>

          <button className="btn btn-warning mr-5 text-md-center offset-5 offset-lg-0 font-weight-bolder" onClick={signinUser}>
            <i className="fa fa-google" aria-hidden="true"></i> Login
          </button>

          <ul className="navbar-nav">
            <li className="nav-item d-none d-lg-block">
              <a className="nav-link">
                <i className="fa fa-google-plus" aria-hidden="true"></i>
              </a>
            </li>

            <li className="nav-item d-none d-lg-block">
              <a className="nav-link">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
            <li className="nav-item d-none d-lg-block">
              <a className="nav-link">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
            </li>
            <li className="nav-item d-none d-lg-block">
              <a className="nav-link">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </li>
            <li className="nav-item d-none d-lg-block">
              <a className="nav-link">
                <i className="fa fa-soundcloud" aria-hidden="true"></i>
              </a>
            </li>
            <li className="nav-item d-none d-lg-block">
              <a className="nav-link">
                <i className="fa fa-youtube-play" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

function Nav({ dispatch }) {
  const user = useAuth();
  return user ? (
    <div>
      {dispatch({ type: "Uid", payload: user.uid })}
      <NavUser user={user} />
      {/* <Router>
        <Redirect from="/" to="/production" />
      </Router> */}
    </div>
  ) : (
    <UserLogin />
  );
}

export default Nav;
