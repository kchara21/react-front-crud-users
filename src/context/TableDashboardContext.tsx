import { createContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

interface formUser {
  email: string;
  clave: string;
  rol: "odontologo" | "cliente";
  nombre: string;
  celular: number;
  id: number | null;
}

const TableDashboardContext = createContext(null);

const TableDashboardProvider = ({ children }: any) => {
  const [show, setShow] = useState(false);
  const [dataUser, setDataUser] = useState<formUser[]>([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  let api = helpHttp();
  let url = "http://localhost:3000/user";
  let auth = JSON.parse(localStorage.getItem("user")!) || null;

  useEffect(() => {
    api.get(url).then((res) => {
      if (!res.err) {
        if (JSON.stringify(res) === JSON.stringify(dataUser)) {
          return;
        } else {
          setDataUser(res);
        }
      } else {
        setDataUser([]);
      }
    });
  }, [dataUser]);



  const handleShow = (res: boolean) => {
    setShow(res);
  };

  const updateData = (data: any) => {
    let endpoint = `${url}/${data.id}`;
    let options = {
      body: data,
      headers: { "content-type": "application/json", auth: auth.token },
    };

    api
      .put(endpoint, options)
      .then((res) => {
        if (!res.err) {
          let newData = dataUser.map((el) => (el.id === data.id ? data : el));
          setDataUser(newData);
        } else {
          console.log("ERROR editing user...", res);
        }
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  const deleteData = (id: number) => {
    let isDelete = window.confirm(
      `Are you sure to delete this register with the id ${id}`
    );

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json", auth: auth.token },
      };
      api.del(endpoint, options).then((res) => {
        if (!res.err) {
          let newData = dataUser.filter((el: any) => el.id !== id);
          setDataUser(newData);
        } else {
          console.log("ERROR deleting...", res);
        }
      });
    } else {
      return;
    }
  };

  const createData = (newUser: any) => {
    console.log('NewUser',newUser);
    let options = {
      body: newUser,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    helpHttp()
      .post(url, options)
      .then((res) => {
        if (!res.err) {
          setDataUser([...dataUser, newUser]);
        } else {
          console.log("Error creating user...", res);
        }
      });
  };

  const data: any = {
    show,
    dataUser,
    dataToEdit,
    handleShow,
    setDataToEdit,
    updateData,
    deleteData,
    createData
  };
  return <TableDashboardContext.Provider value={data}>{children}</TableDashboardContext.Provider>
};

export { TableDashboardProvider };
export default TableDashboardContext;
