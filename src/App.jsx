import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "./App.css";
import AuthProvider from "./context/authContext";
import ItemContextProvider from "./context/itemsContext";
import itemsData from "./items.json";
import BilboardProductDetail from "./pages/BilboardProductDetail";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/Layout";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import SignUp, { action as authAction, checkAuthLoader } from "./pages/SignUp";
import UserDashboard from "./pages/UserAccount";
import Dummy from './pages/Dummy';

const items = itemsData.items;
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "bilboard-products/:id", element: <BilboardProductDetail /> },
      { path: "sign-up", element: <SignUp />, action: authAction },
      { path: "login", element: <Login /> },
      { path: "dummy", element: <Dummy /> },
      {
        path: "/user-account",
        element: <UserDashboard />,
        loader: checkAuthLoader,
      },
    ],
  },
]);
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ItemContextProvider>
          <RouterProvider router={router}>
            
          </RouterProvider>
        </ItemContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
