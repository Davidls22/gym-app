import React, { useState } from "react";
import ClassList from "./components/ClassList";
import Dashboard from "./components/Dashboard";
import { Register, Login, AdminLogin } from "./components/Login";
import BookedClasses from "./components/BookedClasses";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [userType, setUserType] = useState("guest");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  function handleToggleLogin() {
    setShowLogin(!showLogin);
    setShowRegister(false);
    setShowAdminLogin(false);
  }

  function handleToggleRegister() {
    setShowRegister(!showRegister);
    setShowLogin(false);
    setShowAdminLogin(false);
  }

  function handleToggleAdminLogin() {
    setShowAdminLogin(!showAdminLogin);
    setShowLogin(false);
    setShowRegister(false);
  }

  function handleLogin(isAdmin) {
    setUserType(isAdmin ? "admin" : "user");
  }

  function handleLogout() {
    setUserType("guest");
  }

  let mainComponent;

  if (userType === "admin") {
    mainComponent = (
      <>
        <Header />
        <Dashboard onLogout={handleLogout} />
      </>
    );
  } else if (userType === "user") {
    if (currentPage === "classList") {
      mainComponent = (
        <>
          <Header />
          <ClassList userType={userType} />
        </>
      );
    } else if (currentPage === "bookedClasses") {
      mainComponent = (
        <>
          <Header />
          <BookedClasses />
        </>
      );
    } else {
      mainComponent = (
        <>
          <Header />
          <ClassList userType={userType} />
        </>
      );
    }
  } else {
    mainComponent = (
      <div className="container">
        <Header />
        <div className="buttons-container">
          <button onClick={handleToggleRegister}>Register</button>
          {showRegister && <Register onLogin={() => handleLogin(false)} />}
          <button onClick={handleToggleLogin}>Login</button>
          {showLogin && <Login onLogin={() => handleLogin(false)} />}
          <button onClick={handleToggleAdminLogin}>Admin Login</button>
          {showAdminLogin && <AdminLogin onLogin={() => handleLogin(true)} />}
        </div>
      </div>
    );
  }

  // Conditionally render Navbar based on userType
  return (
    <div className="App">
      {userType === "user" && <Navbar onPageChange={setCurrentPage} />}
      {mainComponent}
    </div>
  );
}

export default App;
