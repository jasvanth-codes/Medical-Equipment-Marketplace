import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load saved login when application starts
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");

      if (savedUser && savedToken) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (error) {
      console.error("Auth restore error:", error);

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login
  const login = (userData, token) => {
    try {
      if (!userData || !token) {
        console.error("Login failed: user data or token missing");
        return false;
      }

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      setUser(userData);

      console.log("USER SAVED:", userData);
      console.log("TOKEN SAVED:", true);

      return true;
    } catch (error) {
      console.error("Login storage error:", error);
      return false;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    console.log("USER LOGGED OUT");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        isAuthenticated: !!user && !!localStorage.getItem("token"),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;