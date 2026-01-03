// // import React, { createContext, useState, useContext, useEffect } from "react";

// // // 1. Buat Context
// // const AuthContext = createContext(null);

// // // 2. Provider
// // export function AuthProvider({ children }) {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // 🔥 Ambil data user dari localStorage saat app pertama kali jalan
// // useEffect(() => {
// //   const storedUser = localStorage.getItem("admin_user");
// //   const token = localStorage.getItem("authToken");
  
// //   if (storedUser && token) {
// //     setUser(JSON.parse(storedUser));
// //     // Set header otomatis untuk semua request axios berikutnya
// //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// //   }
// //   setLoading(false);
// // }, []);
  
// //   // Login
// //   const login = (userData) => {
// //     setUser(userData);
// //     localStorage.setItem("admin_user", JSON.stringify(userData));
// //   };

// //   // Logout
// //   const logout = () => {
// //     setUser(null);
// //     localStorage.removeItem("admin_user");
// //   };

// //   const isAuthenticated = user !== null;

// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         user,
// //         isAuthenticated,
// //         login,
// //         logout,
// //         loading,
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // // 3. Hook
// // export const useAuth = () => useContext(AuthContext);


// // ==========================================================================================

// import React, { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("authToken") || null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     const storedToken = localStorage.getItem("authToken");
    
//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//       // Set header global agar semua request axios membawa token
//       axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//     }
//     setLoading(false);
//   }, []);
  
//   const login = (userData, userToken) => {
//     setUser(userData);
//     setToken(userToken);
//     localStorage.setItem("user_data", JSON.stringify(userData));
//     localStorage.setItem("authToken", userToken);
//     axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user_data");
//     localStorage.removeItem("authToken");
//     delete axios.defaults.headers.common['Authorization'];
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

// ===========================================================================================

import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    const token = localStorage.getItem("authToken");
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      // Set header otomatis untuk semua request axios berikutnya
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);
  
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user_data", JSON.stringify(userData));
    localStorage.setItem("authToken", token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_data");
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);