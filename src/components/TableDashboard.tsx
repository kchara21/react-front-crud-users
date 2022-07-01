import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import ModalDashboard from "./modals/ModalDashboard";
import TableRowDashboard from "./TableRowDashboard";
import TableDashboardContext from '../context/TableDashboardContext';

const TableDashboard = () => {
  const {handleShow,dataUser}:any = useContext(TableDashboardContext);
  
  return (
    <>
      <Button
        style={{ margin: "1rem" }}
        variant="primary"
        onClick={() => handleShow(true)}
      >
        Create User
      </Button>
      <ModalDashboard />
      <Table
        striped
        bordered
        hover
        style={{ width: "90%", margin: "0 auto", marginTop: "3rem" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Cell phone</th>
            <th>CreatedAt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataUser.length === 0 ? (
            <tr>
              <td colSpan={3}>Sin datos</td>
            </tr>
          ) : (
            dataUser.map((el: any) => <TableRowDashboard key={el.id} el={el} />)
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TableDashboard;
