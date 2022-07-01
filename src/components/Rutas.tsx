import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

const Rutas = ({auth,setAuth}:any) => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setAuth={setAuth} />} />
      <Route
        path="/dashboard"
        element={auth ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Rutas;
