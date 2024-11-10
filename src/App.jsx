import React, { useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import createAppRouter from './routes/Router.jsx';
import UserContextProvider from './pages/user/login/context/User.jsx';
import {jwtDecode} from "jwt-decode";

export default function App() {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("userToken") ? true : false
  );
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLogin(true);
      const decoded = jwtDecode(token);
      setUserData(decoded);
    }
  }, []);

  const router = createAppRouter(isLogin, userData, setIsLogin, setUserData);

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}
