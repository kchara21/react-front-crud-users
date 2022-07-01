import { createContext, useEffect, useState } from "react";

const initialAuth = JSON.parse(localStorage.getItem("user")!) || null;
const AuthContext = createContext(initialAuth);

const AuthProvider = ({children}:any) => {
  let localUser = JSON.parse(localStorage.getItem("user")!) || null;
  const [auth, setAuth] = useState(localUser);

  useEffect(() => {
    let newAuth = JSON.parse(localStorage.getItem("user")!) || null;
    if (!newAuth || JSON.stringify(newAuth) === JSON.stringify(auth)) {
     
      return;
    }

    setAuth(newAuth);
  
  }, [auth]);

  const data: any = { auth };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;