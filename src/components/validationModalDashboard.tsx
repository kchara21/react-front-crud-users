import React from "react";

export const validationModalDashboard = (form: any,DataToEdit:any) => {
  let errors: any = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  // let regexCellphone = / [2-9] {2}\d {8} /
  let regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

  if (!form.nombre.trim()) {
    errors.nombre = "El campo NOMBRE es requerido.";
  } else if (!regexName.test(form.nombre.trim())) {
    errors.nombre = "El campo NOMBRE solo acepta letras y espacios en blanco";
  }

  // if (!form.celular.trim()) {
  //   errors.celular = "El campo CELULAR es requerido.";
  // } else if (!regexCellphone.test(form.celular.trim())) {
  //   errors.celular = "El campo CELULAR debe tener 10 digitos y empezar con '0'";
  // }

  if (!form.email.trim()) {
    errors.email = "El campo EMAIL es requerido.";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El campo EMAIL es incorrecto";
  }

  if (!DataToEdit) {
    if (!form.clave.trim()) {
      errors.clave = "El campo CLAVE es requerido.";
    } else if (!regexPassword.test(form.clave.trim())) {
      errors.clave =
        "La clave debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.";
      }
  }else{
    console.log("datatoEdit",DataToEdit);
  }

  return errors;
};
