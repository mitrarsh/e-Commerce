import { Link } from "react-router-dom";
import Footer from "../html/sections/Footer";
import NavContainer from "../html/sections/nav-container";

const ErrorPage = () => {
  return (
    <>
      <NavContainer />
      <div className="notFound">
        <h1>404 Not Found</h1>
        <p>Your visited page not found. You may go home page.</p>
        <Link to={'/'}>
          <div className="btn--red btn">Back to home page</div>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
