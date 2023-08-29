import React, { useRef, useEffect } from "react";

function Header(props) {
  const firstnameref = useRef();
  const emailref = useRef();
  const hidden = useRef();

  useEffect(() => {
    const setDataToForm = {
      firstName: props.editUser !== null ? props.editUser.firstName : "",
      lastName: props.editUser !== null ? props.editUser.lastName : "",
      username: props.editUser !== null ? props.editUser.username : "",
      email: props.editUser !== null ? props.editUser.email : "",
      age: props.editUser !== null ? props.editUser.age : "",
      gender: props.editUser !== null ? props.editUser.gender : "male",
      phone: props.editUser !== null ? props.editUser.phone : "",
    };
    document.querySelector(
      "input[name='gender'][id='" + setDataToForm.gender + "']"
    ).checked = true;
    props.setformInputData(setDataToForm);
  }, [props.editUser]);

  function validation() {
    let formValid = false;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let age = document.getElementById("age").value;
    let phone = document.getElementById("phone").value;

    let firstCheck = /^[A-Za-z. ]{3,30}$/;
    let lastCheck = /^[A-Za-z. ]{3,30}$/;
    let emailCheck = /^[A-Za-z0-9_]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
    let ageCheck = /^[1-9]?[0-9]{1}$|^100$/;
    let phoneCheck =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (firstName == "") {
      document.getElementById("formerror").innerHTML =
        "** Enter Your First Name";
      document.getElementById("firstName").style.borderColor = "red";
      formValid = false;
    } else if (!firstCheck.test(firstName)) {
      document.getElementById("formerror").innerHTML =
        "** it should only contain letters";
      document.getElementById("firstName").style.borderColor = "red";
      formValid = false;
    } else {
      document.getElementById("formerror").innerHTML = "";
      document.getElementById("firstName").style.borderColor = "#ccc";
      formValid = true;
    }

    if (lastName == "") {
      document.getElementById("formerror1").innerHTML =
        "** Enter Your Last Name";
      document.getElementById("lastName").style.borderColor = "red";
      formValid = false;
    } else if (!lastCheck.test(lastName)) {
      document.getElementById("formerror1").innerHTML =
        "** it should only contain letters";
      document.getElementById("lastName").style.borderColor = "red";
      formValid = false;
    } else {
      document.getElementById("formerror1").innerHTML = "";
      document.getElementById("lastName").style.borderColor = "#ccc";
      formValid = formValid ? true : formValid;
    }

    if (username == "") {
      document.getElementById("formerror2").innerHTML =
        "** Enter Your User Name";
      document.getElementById("username").style.borderColor = "red";
      formValid = false;
    } else {
      document.getElementById("formerror2").innerHTML = "";
      document.getElementById("username").style.borderColor = "#ccc";
      formValid = formValid ? true : formValid;
    }

    if (email == "") {
      document.getElementById("formerror3").innerHTML =
        "** Enter Your Email Address";
      document.getElementById("email").style.borderColor = "red";
      formValid = false;
    } else if (!emailCheck.test(email)) {
      document.getElementById("formerror3").innerHTML =
        "** Email Address in not valid";
      document.getElementById("email").style.borderColor = "red";
      formValid = false;
    } else {
      document.getElementById("formerror3").innerHTML = "";
      document.getElementById("email").style.borderColor = "#ccc";
      formValid = formValid ? true : formValid;
    }
    if (age == "") {
      document.getElementById("formerror4").innerHTML = "** Enter Your Age";
      document.getElementById("age").style.borderColor = "red";
      formValid = false;
    } else if (!ageCheck.test(age)) {
      document.getElementById("formerror4").innerHTML =
        "** it should only contain number";
      document.getElementById("age").style.borderColor = "red";
      formValid = false;
    } else if (age > 18) {
      document.getElementById("formerror4").innerHTML = "";
      document.getElementById("age").style.borderColor = "#ccc";
      formValid = formValid ? true : formValid;
    } else {
      document.getElementById("formerror4").innerHTML =
        "** Age Must be above 18";
      document.getElementById("age").style.borderColor = "red";
      formValid = false;
    }

    if (phone == "") {
      document.getElementById("formerror6").innerHTML =
        "** Enter Your Mobile Number";
      document.getElementById("phone").style.borderColor = "red";
      formValid = false;
    } else if (!phoneCheck.test(phone)) {
      document.getElementById("formerror6").innerHTML =
        "** it should only contain  10 Numbers";
      document.getElementById("phone").style.borderColor = "red";
      formValid = false;
    } else {
      document.getElementById("formerror6").innerHTML = "";
      document.getElementById("phone").style.borderColor = "#ccc";
      formValid = formValid ? true : formValid;
    }

    if (formValid) {
      props.editUser !== null
        ? props.updateSubmit(props.editUser.id)
        : props.handleSubmit();
    }
  }
  return (
    <div className="d-flex justify-content-between mt-5">
      <div className="d-flex flex-row  ms-5 text-light">
        <p className="mb-0 me-2 align-self-center fw-normal">Show </p>
        <select
          className="form-select"
          value={props.usersPerPage}
          onChange={(event) => (
            props.setUsersPerPage(event.target.value), props.setCurrentPage(0)
          )}
          aria-label="Default select example"
          style={{ width: "75px" }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <p className="mb-0  ms-2 align-self-center fw-normal">entries </p>
      </div>
      <div className="d-flex" style={{ minWidth: "750px" }}>
        <input
          type="text"
          className="form-control w-50"
          id="exampleInputEmail1"
          onKeyDown={(event) =>
            event.key === "Enter" ? props.fetchUsers() : null
          }
          value={props.userSearchText}
          onChange={(event) =>
            props.setUserSearchText(event.currentTarget.value)
          }
          aria-describedby="emailHelp"
          placeholder="Filter "
          style={{ width: "300px" }}
        />
        <button className="btn btn-primary ms-2" onClick={props.fetchUsers}>
          {" "}
          Search
        </button>

        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary ms-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Data
        </button>
        {/* Modal */}
        <div
          className="modal fade modal hide"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          show="false"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Data
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => props.setEditUser(null)}
                />
              </div>
              <form>
                <div className="modal-body">
                  <div className="fw-bold">
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First Name:
                      </label>
                      <input
                        ref={firstnameref}
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="First-Name"
                        name="firstName"
                        value={props.formInputData.firstName || ""}
                        onChange={props.handleChange}
                      />
                      <p
                        id="formerror"
                        style={{ color: "red", fontSize: "small" }}
                      ></p>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Last-Name"
                        name="lastName"
                        value={props.formInputData.lastName || ""}
                        onChange={props.handleChange}
                      />
                      <p
                        id="formerror1"
                        style={{ color: "red", fontSize: "small" }}
                      ></p>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        User Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="User-Name"
                        name="username"
                        value={props.formInputData.username || ""}
                        onChange={props.handleChange}
                      />
                      <p
                        id="formerror2"
                        style={{ color: "red", fontSize: "small" }}
                      ></p>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email:
                      </label>
                      <input
                        ref={emailref}
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email-address"
                        name="email"
                        value={props.formInputData.email || ""}
                        onChange={props.handleChange}
                      />
                      <p
                        id="formerror3"
                        style={{ color: "red", fontSize: "small" }}
                      ></p>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Age:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="age"
                        placeholder="Age"
                        min="1"
                        max="100"
                        name="age"
                        value={props.formInputData.age || ""}
                        onChange={props.handleChange}
                      />
                      <p
                        id="formerror4"
                        style={{ color: "red", fontSize: "small" }}
                      ></p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone NO:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Phone Number"
                        name="phone"
                        value={props.formInputData.phone || ""}
                        onChange={props.handleChange}
                      />
                      <p
                        id="formerror6"
                        style={{ color: "red", fontSize: "small" }}
                      ></p>
                    </div>
                    <div className="d-flex mb-3">
                      <label className="form-label me-4">Gender:</label>
                      <div className="form-check me-3">
                        <label
                          className="form-check-label fw-lighter"
                          htmlFor="male"
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            onChange={props.handleChange}
                          />
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <label
                          className="form-check-label fw-lighter"
                          htmlFor="female"
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            onChange={props.handleChange}
                          />
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={props.addModalCloseBtn}
                    onClick={() => props.setEditUser(null)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    value="Submit"
                    className="btn btn-primary"
                    onClick={validation}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
