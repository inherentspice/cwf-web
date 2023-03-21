import { useContext, createContext, useState } from "react"

const AuthContext = createContext(null);

export const AuthProvider = ({user, children}) => {

  const [ authData, setAuthData ] = useState(user);

  const setAuth = (newUser) => {
    if (typeof newUser === "function") {
      setAuthData((prevState) => {
        const updatedUser = newUser(prevState);

        if (updatedUser) {
          localStorage.setItem("cwf-user", JSON.stringify(updatedUser));
        } else {
          localStorage.removeItem("cwf-user");
        }

        return updatedUser;
      });
    } else {
      if (newUser) {
        localStorage.setItem("cwf-user", JSON.stringify(newUser));
      } else {
        localStorage.removeItem("cwf-user");
      }
      setAuthData(newUser);
    }
  };

  return (
    <AuthContext.Provider value={{authData, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
