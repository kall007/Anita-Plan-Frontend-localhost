import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>404 Error</h1>
      <p>Oops! Something went wrong.</p>
      <p>Url is incorrect or you need to log in to see this page</p>
      <p>
        <Link to="/">Go back to homepage</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
