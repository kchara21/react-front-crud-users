import React, { useContext } from "react";
import TableDashboardContext from "../context/TableDashboardContext";

const TableRowDashboard = ({ el }: any) => {
  const { nombre, email, rol, celular, createdAt, id } = el;
  const { setDataToEdit, handleShow, deleteData }: any = useContext(
    TableDashboardContext
  );


  return (
    <tr>
      <td>{nombre}</td>
      <td>{email}</td>
      <td>{rol}</td>
      <td>{celular}</td>
      <td>{createdAt}</td>
      <td>
        <button
          onClick={() => {
            setDataToEdit(el);
            handleShow(true);
          }}
        >
          Edit
        </button>
        <button onClick={() => deleteData(id)}>Delete</button>
      </td>
    </tr>
  );
};

export default TableRowDashboard;
