import React, { useEffect, useState } from "react";

import NavBar from "./NavBar";
import Rutas from "./Rutas";

const Principal = () => {
  let localUser = JSON.parse(localStorage.getItem("user")!) || null;
  const [auth, setAuth] = useState(localUser);

  useEffect(() => {
    let newAuth = JSON.parse(localStorage.getItem("user")!) || null;
    if (!newAuth || JSON.stringify(newAuth) === JSON.stringify(auth)) {
      return;
    }
    setAuth(newAuth);
  }, []);


  return (
    <>
      <NavBar setAuth={setAuth} auth={auth}/>
      <Rutas auth={auth} setAuth={setAuth}/>
    </>
  );
};

export default Principal;
