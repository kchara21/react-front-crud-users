import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { helpHttp } from "../helpers/helpHttp";
import { useNavigate } from "react-router-dom";

interface error {
  status: string;
  statusText: string;
}

const Login = ({ setAuth }: any) => {
  const [form, setForm] = useState({ email: "", clave: "" });
  const [error, setError] = useState<error | null>(null);
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
          setError(res);
        }
      });
    }
  };



  return (
    <div style={{ padding: "4rem 1rem" }}>
      <Card
        style={{
          maxWidth: "300px",
          margin: "2rem auto",
          textAlign: "center",
          height: "350px",
        }}
      >
        <Card.Body>
          <Card.Title style={{ textAlign: "center", padding: "2rem" }}>
            LOGIN
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                style={{ width: "100%" }}
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                style={{ width: "100%" }}
                type="password"
                name="clave"
                placeholder="Password"
                onChange={handleChange}
              />
            </Form.Group>

            <Button style={{ width: "100%" }} variant="primary" type="submit">
              LOGIN
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
