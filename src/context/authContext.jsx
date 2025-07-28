import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? savedUser : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const logoutTimerRef = useRef(null);

  // const login = (userInfo) => {
  //   const fakeToken = "fake-jwt-" + Math.random().toString(36).substring(2);
  //   setCurrentUser(userInfo);
  //   setToken(fakeToken);
  //   localStorage.setItem("token", fakeToken);
  // };

  const logout = () => {
    clearTimeout(logoutTimerRef.current);
    localStorage.removeItem("token");
    setToken(null);
    setCurrentUser(null);
  };
  useEffect(() => {
    if (token) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = setTimeout(() => {
        logout(), useNavigate("/");
      }, 60 * 60 * 1000);
    } else {
      clearTimeout(logoutTimerRef.current);
    }
    return () => {
      clearTimeout(logoutTimerRef.current);
    };
  }, [token, logout]);

  useEffect(() => {
    const handler = () => setToken(localStorage.getItem("token")); // // Listen for auth changes from actions
    window.addEventListener("auth-changed", handler);
    return () => window.removeEventListener("auth-changed", handler);
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, setToken, setCurrentUser, token, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
