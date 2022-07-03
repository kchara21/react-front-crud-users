import React, { useState } from "react";

import { helpHttp } from "../helpers/helpHttp";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginForm from "../components/LoginForm";

interface error {
  status: string;
  statusText: string;
}

const Login = ({ setAuth }: any) => {
  const [form, setForm] = useState({ email: "", clave: "" });
  let navigate = useNavigate();

  let apiAuth = helpHttp();
  let url = "http://localhost:3000/auth/login";

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let options = {
      body: form,
      headers: { "content-type": "application/json" },
    };

    if (!form.email || !form.clave) {
      alert("Datos incompletos");
      return;
    } else {
      apiAuth.post(url, options).then((res) => {
        if (!res.err) {
          setAuth(res);
          const { message, ...rest } = res;
          localStorage.setItem("user", JSON.stringify(rest));
          navigate("/dashboard");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.message.message,
          });
        }
      });
    }
  };

  return (
    <div style={{ padding: "4rem 1rem" }}>
     <LoginForm handleChange={handleChange} handleSubmit={handleSubmit}/>
    </div>
  );
};

export default Login;
