import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const login = (userInfo) => {
    const fakeToken = "fake-jwt-" + Math.random().toString(36).substring(2);
    setUser(userInfo);
    setToken(fakeToken);
    localStorage.setItem("token", fakeToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };
  useEffect(()=>{
      const savedToken= localStorage.getItem("token");
      if(savedToken){
          setToken(savedToken)
      }
  },[token])

  return (
    <AuthContext.Provider
      value={{ user, setToken, setUser, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
