import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import AuthProvider from "./context/authContext";
import ItemContextProvider from "./context/itemsContext";
import itemsData from "./items.json";
import BilboardProductDetail from "./pages/BilboardProductDetail";
import Dummy from "./pages/Dummy";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/Layout";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import SignUp, { action as authAction, checkAuthLoader, checkLoggedinLoader } from "./pages/SignUp";
import UserDashboard from "./pages/UserAccount";
import Wishlist from './pages/Wishlist';
import Category from "./pages/Category";

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
      { path: "category/:category", element: <Category items={items}/> },
      { path: "bilboard-products/:id", element: <BilboardProductDetail /> },
      { path: "sign-up", element: <SignUp />, action: authAction, loader: checkLoggedinLoader},
      { path: "login", element: <Login />, loader: checkLoggedinLoader},
      {
        path: "/user-account",
        element: <UserDashboard />,
        loader: checkAuthLoader,
      },
      {path: "/search-results", element: <SearchResults items={items}/>,},
      {path: "/wishlist", element: <Wishlist items={items}/>,},

    ],
  },
]);
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ItemContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </ItemContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
