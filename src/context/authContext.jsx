import { createContext, useContext, useEffect, useRef, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const logoutTimerRef=useRef(null)

  // const login = (userInfo) => {
  //   const fakeToken = "fake-jwt-" + Math.random().toString(36).substring(2);
  //   setUser(userInfo);
  //   setToken(fakeToken);
  //   localStorage.setItem("token", fakeToken);
  // };

  const logout = () => {
    clearTimeout(logoutTimerRef.current)
    localStorage.removeItem("token");
    setToken(null);
    setUser(null); 
  };
  useEffect(()=>{

    if(token){
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current= setTimeout(()=>{logout()}, 60*60*1000)}
      else{clearTimeout(logoutTimerRef.current)}
    return ()=>clearTimeout(logoutTimerRef.current)
  },[token])

  useEffect(()=>{
  const handler = () => setToken(localStorage.getItem("token")); // // Listen for auth changes from actions
  window.addEventListener("auth-changed", handler);
  return () => window.removeEventListener("auth-changed", handler);
  },[])

  return (
    <AuthContext.Provider
      value={{ user, setToken, setUser, token, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
