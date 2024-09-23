import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import Admin from "./components/Auth/Admin";
import Auth from "./components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store";
import Booking from "./components/Booking/Booking";
import UserProfile from "./profile/UserProfile";
import AddMovie from "./components/Movies/AddMovie";
import AdminProfile from "./profile/AdminProfile";
import React from "react";

function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />

          {/* Public Routes (Only for unauthenticated users) */}
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <React.Fragment> {/* Use React.Fragment here */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </React.Fragment>
          )}

          {/* User Routes (Only for logged-in users) */}
          {isUserLoggedIn && (
            <React.Fragment> {/* Use React.Fragment here */}
              <Route path="/user" element={<UserProfile />} />
              <Route path="/booking/:id" element={<Booking />} />
            </React.Fragment>
          )}

          {/* Admin Routes (Only for logged-in admins) */}
          {isAdminLoggedIn && (
            <React.Fragment> {/* Use React.Fragment here */}
              <Route path="/add" element={<AddMovie />} />
              <Route path="/user-admin" element={<AdminProfile />} />
            </React.Fragment>
          )}

          {/* Redirects and Default Behavior */}
          <Route
            path="*"
            element={<Navigate to={isUserLoggedIn ? "/user" : isAdminLoggedIn ? "/user-admin" : "/"} />}
          />
        </Routes>
      </section>
    </div>
  );
}

export default App;
