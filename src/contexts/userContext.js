// UserContext.js

import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({}); // Initialize userData as an object

  const setLoggedInUserId = async (id, token) => {
    setUserId(id);

    // Fetch user data based on the user id and set it in the context
    // For now, we assume that the user data includes a 'token' property
    const fetchedUserData = { token }; // Update with your actual logic

    setUserData(fetchedUserData);
  };

  return (
    <UserContext.Provider value={{ userId, userData, setLoggedInUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  console.log('userData:', context.userData);

  return context;
};
