import React, { useContext, useEffect, useState } from "react";
import TableDashboardContext from "../context/TableDashboardContext";

export const useModalDashboard = (
  initialForm: any,
  validationModalDashboard: any
) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<any>({});

  const { handleShow, setDataToEdit, createData, updateData, dataToEdit }: any =
    useContext(TableDashboardContext);

  const handleSetForm = (newForm: any) => {
    setForm(newForm);
  };

  const handleClose = () => {
    handleShow(false);
    setDataToEdit(null);
    setErrors({});
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleShow(false);

    if (dataToEdit) {
      delete errors.clave;
    }

    setErrors(validationModalDashboard(form, dataToEdit));

    if (Object.keys(errors).length === 0) {
      if (form.id === null) {
        createData(form);
      } else {
        updateData(form);
      }
    } else {
      console.log(errors);
    }
    handleReset(e);
  };

  const handleReset = (e: any) => {
    setForm({
      email: "",
      clave: "",
      nombre: "",
      celular: "",
      rol: "",
      id: null,
    });
    setDataToEdit(null);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const selectChange = (e: any) => {
    setForm({ ...form, rol: e.target.value });
  };

  const handleBlur = (e: any) => {
    handleChange(e);
    setErrors(validationModalDashboard(form));
  };

  return {
    form,
    errors,
    handleClose,
    handleSubmit,
    handleReset,
    handleChange,
    selectChange,
    handleBlur,
    handleSetForm,
  };
};
