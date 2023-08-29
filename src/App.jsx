import ReactDOM from "react-dom";
import Header from "./Header";
import Main from "./Main";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Footer from "./Footer";
import { Route,Switch } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [userSearchText, setUserSearchText] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [loading, setloading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const fields = "&select=firstName,lastName,username,age,phone,email,gender";

  const [formInputData, setformInputData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    age: 0,
    gender: "male",
    phone: ""
  });
  const addModalCloseBtn = useRef();

  useEffect(() => {
    setloading(true);
    fetchUsers();
  }, [currentPage, usersPerPage, userSearchText]);

  const fetchUsers = async () => {
    let apiUrl =
      "https://dummyjson.com/users?limit=" +
      usersPerPage +
      "&skip=" +
      currentPage * usersPerPage;
    if (userSearchText !== "") {
      if (isSearchOn) {
        apiUrl =
          "https://dummyjson.com/users/search?limit=" +
          usersPerPage +
          "&skip=" +
          currentPage * usersPerPage +
          "&q=" +
          userSearchText;
      } else {
        apiUrl =
          "https://dummyjson.com/users/search?limit=" +
          usersPerPage +
          "&skip=" +
          0 * usersPerPage +
          "&q=" +
          userSearchText;
      }
    } else {
      setIsSearchOn(false);
    }
    axios.get(apiUrl + fields).then((res) => {
      setTotalUsers(res.data.total);
      if (userSearchText !== "" && !isSearchOn) {
        setCurrentPage(0);
        setIsSearchOn(true);
      }
      setUsers(res.data.users);
      setloading(false);
    });
  };

  const handleChange = (evnt) => {
    setformInputData({
      ...formInputData,
      [evnt.target.name]: evnt.target.value,
    });
  };

  const handleSubmit = () => {
    const userData = {
      firstName: formInputData.firstName,
      lastName: formInputData.lastName,
      username: formInputData.username,
      email: formInputData.email,
      age: formInputData.age,
      gender:formInputData.gender,
      phone: formInputData.phone,
    };
    setloading(true);
    axios.post("https://dummyjson.com/users/add", userData).then((response) => {
      setUsers([response.data, ...users]);

      const isEmpty = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        age: 0,
        gender:"male",
        phone: "",
      };
      setformInputData(isEmpty);
      setloading(false);
      addModalCloseBtn.current.click();
    });
  };

  const deleteUser = (index) => {
    setloading(true);
    axios.delete("https://dummyjson.com/users/" + index).then((response) => {
      setUsers(users.filter((v, i) => v.id !== index));
      setloading(false);
    });
  };

  const editData = (userId) => {
    const user = users.filter((v) => v.id === userId);
    setEditUser(user[0]);
  };

  const updateSubmit = (userId) => {
    setloading(true);
    axios
      .put("https://dummyjson.com/users/" + userId, formInputData)
      .then((response) => {
        const updateduser = users.map((obj) => {
          if (obj.id == userId) {
            return response.data;
          }
          return obj;
        });
        setUsers(updateduser);
        const isEmpty = {
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          age: 0,
          gender:"male",
          phone: "",
        };
        setformInputData(isEmpty);
        addModalCloseBtn.current.click();
      });
    setloading(false);
  };

  // const shortNames =()=>{
  //     const sortName=users.filter((v,i)=>{

  //     })

  // }

  return (
    <>
      <div className="container p-3 ">
        <Header
          userSearchText={userSearchText}
          setUserSearchText={setUserSearchText}
          setCurrentPage={setCurrentPage}
          fetchUsers={fetchUsers}
          usersPerPage={usersPerPage}
          setUsersPerPage={setUsersPerPage}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formInputData={formInputData}
          setformInputData={setformInputData}
          addModalCloseBtn={addModalCloseBtn}
          editUser={editUser}
          updateSubmit={updateSubmit}
          setEditUser={setEditUser}
        />

        <Main
          users={users}
          currentPage={currentPage}
          usersPerPage={usersPerPage}
          deleteUser={deleteUser}
          loading={loading}
          editData={editData}
          setUsers={setUsers}
        />

        <Footer
          totalUsers={totalUsers}
          usersPerPage={usersPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default App;
