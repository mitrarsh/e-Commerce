import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ItemContextProvider from "./context/itemsContext";
import itemsData from "./items.json";
import BilboardProductDetail from "./pages/BilboardProductDetail";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/Layout";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import SignUp , {action as authAction} from "./pages/SignUp";
import ErrorPage from './pages/Error';
import UserDashboard from "./pages/UserDashboard";
import AuthProvider from "./context/authContext";

const items = itemsData.items;

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
      { path: "user-dashboard", element: <UserDashboard /> },
    ],
  },
]);
const App = () => {
  return (
 <AuthProvider>
      <ItemContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </ItemContextProvider>
 </AuthProvider>
  );
};

export default App;
