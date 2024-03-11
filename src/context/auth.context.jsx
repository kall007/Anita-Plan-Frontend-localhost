import React, {useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5005";

const AuthContext = React.createContext();


function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  // Function to store the authentication token in the browser's local storage
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  //Function to authenticate user
  const authenticateUser = () => {
    //Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    //If the token exists in the localStorage
    if (storedToken) {
        //Send a GET request to the authentication verification endpoint
        axios
          .get(`${BASE_URL}/auth/verify`, {
            //Include the JWT token in the request's "Authorization" Headers
            headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => {
        // If the server verifies that JWT token is valid
        const user = response.data;
         // Update state variables
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);  // Set the user state with the received user data
    })
    .catch((error) => {
        // If there's an error response from the server (e.g., invalid token)
        if (error) {
            // Set the authentication error state
            setAuthError(error.response.data.message);
            return;
        }
          // Update state variables in case of error
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null); // Clear the user state
    });
  } else {
    // If the token is not available in localStorage
    // Update state variables accordingly
    setIsLoggedIn(false);
    setIsLoading(false);
    setUser(null); // Clear the user state
  }
};

// Function to remove the authentication token from local storage upon logout
const removeToken = () => {
    //Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
};

// Function to handle user logout
const logOutUser = () => {
    removeToken();
     // Re-authenticate the user to update the authentication state
    authenticateUser();
};

// Effect hook to authenticate the user upon initial render
useEffect(() => {
// Initialize authentication state upon component mount,
// ensuring the user's authentication status is accurately reflected.
})

return (
    <AuthContext.Provider
        value={{
            isLoggedIn,
            isLoading,
            user,
            storeToken,
            authenticateUser,
            logOutUser,
            authError,
    }}
    >
        {props.children}
    </AuthContext.Provider>
);

}
//test
export { AuthWrapper, AuthContext };