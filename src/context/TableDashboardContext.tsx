import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
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
  let authUpdated = JSON.parse(localStorage.getItem("user")!) || null;

  const [show, setShow] = useState(false);
  const [dataUser, setDataUser] = useState<formUser[]>([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [auth, setAuth] = useState(authUpdated);
  let api = helpHttp();
  let url = "http://localhost:3000/user";

  const authVerification = ()=>{
    authUpdated = JSON.parse(localStorage.getItem("user")!) || null;
    setAuth(authUpdated);
  }

  useEffect(() => {
    authVerification();
    if (!auth) {
      return;
    }
    let options = {
      headers: { "content-type": "application/json", auth: auth.token },
    };
    api.get(url, options).then((res) => {
      if (!res.err) {
        if (JSON.stringify(res) === JSON.stringify(dataUser)) {
          return;
        } else {
          setDataUser(res);
        }
      } else {
        return;
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
  };

  const deleteData = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let endpoint = `${url}/${id}`;
        let options = {
          headers: {
            "content-type": "application/json",
            auth: authUpdated.token,
          },
        };
        api.del(endpoint, options).then((res) => {
          if (!res.err) {
            let newData = dataUser.filter((el: any) => el.id !== id);
            setDataUser(newData);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          } else {
            console.log("ERROR deleting...", res);
          }
        });
      }
    });
  };

  const createData = (newUser: any) => {
    let options = {
      body: newUser,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        auth: auth.token,
      },
    };

    helpHttp()
      .post(url, options)
      .then((res) => {
        if (!res.err) {
          setDataUser([...dataUser, newUser]);
          Swal.fire({
            icon: "success",
            title: "User Created",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.statusText,
          });
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
    createData,
  };
  return (
    <TableDashboardContext.Provider value={data}>
      {children}
    </TableDashboardContext.Provider>
  );
};

export { TableDashboardProvider };
export default TableDashboardContext;
