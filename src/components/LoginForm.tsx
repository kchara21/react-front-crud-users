import React from "react";
import { Button, Card, Form } from "react-bootstrap";

const LoginForm = ({ handleChange, handleSubmit }: any) => {
  return (
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
  );
};

export default LoginForm;
