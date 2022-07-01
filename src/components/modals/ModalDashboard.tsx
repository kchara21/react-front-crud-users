import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import TableDashboardContext from "../../context/TableDashboardContext";
import { useModalDashboard } from "../../hooks/useModalDashboard";
import { validationModalDashboard } from "../validationModalDashboard";

const initialForm = {
  email: "",
  clave: "",
  nombre: "",
  celular: "",
  rol: "",
  id: null,
};


const ModalDashboard = () => {
  const { show, dataToEdit }: any = useContext(TableDashboardContext);
  let styles = {
    fontWeight: "bold",
    color: "#dc3545",
  };


  const {
    form,
    errors,
    handleClose,
    selectChange,
    handleSubmit,
    handleSetForm,
    handleChange,
    handleBlur,
  } = useModalDashboard(initialForm, validationModalDashboard);

  

  useEffect(() => {
    if (dataToEdit) {
      handleSetForm(dataToEdit);
    } else {
      handleSetForm(initialForm);
    }
  }, [dataToEdit]);


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Select
            value={form.rol}
            className="mb-3"
            onChange={selectChange}
            onBlur={handleBlur}
          >
            <option value="">Choose Role</option>
            <option value="odontologo">Dentist</option>
            <option value="cliente">Client</option>
          </Form.Select>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="name@example.com"
              autoFocus
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.email}
              required
            />
            {errors?.email && <p style={styles}>{errors.email}</p>}
          </Form.Group>

          {!form.id && (
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="clave"
                placeholder="Write your password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={form.clave}
                required
              />
              {errors?.clave && <p style={styles}>{errors.clave}</p>}
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Write your name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.nombre}
              required
            />
            {errors?.nombre && <p style={styles}>{errors.nombre}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cell phone</Form.Label>
            <Form.Control
              type="text"
              name="celular"
              placeholder="Write your cell phone number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.celular}
              required
            />
            {errors?.celular && <p style={styles}>{errors.celular}</p>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} >
          Close
        </Button>
        <Button type="submit" variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDashboard;
