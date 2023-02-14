import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "../pages/login.css";
import s from "../images/s.png";
import { useState } from "react";
import { API_BASE_URL } from "../../src/config";
import Swal from "sweetalert2";
import axios from "axios";
function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signup = (event) => {
    event.preventDefault();
    setLoading(true);
    const requestData = { fullName: fullName, email, company, password };
    axios
      .post(`${API_BASE_URL}/signup`, requestData)
      .then((result) => {
        if (result.status === 200) {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "User signed up successfully",
          });
        }
        setFullName("");
        setEmail("");
        setPassword("");
        setCompany("");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Signup failed , Please try again later",
        });
      });
  };
  return (
    <div className="row">
      <div className="col-md-7 col-sm-12">
        <img src={s} alt="Not fount" id="logo" />
      </div>
      <div className="col-md-5 col-sm-12">
        <div className="card p-2 m-3 shadow" id="logincard">
          <p className="Card-header " style={{ fontWeight: "600" }}>
            Registration Form
          </p>
          <Form onSubmit={(e) => signup(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                value={fullName}
                onChange={(ev) => setFullName(ev.target.value)}
                placeholder="Enter Full Name"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                value={email}
                type="email"
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder="Enter email"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                value={company}
                type="text"
                onChange={(ev) => setCompany(ev.target.value)}
                placeholder="Enter Company Name"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                value={password}
                type="password"
                onChange={(ev) => setPassword(ev.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            ></Form.Group>
            {loading ? (
              <>
                <div class="spinner-border text-info" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              ""
            )}
            <Button className="form-control " variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <div className="my-3">
            <hr className="text-muted"></hr>
            <h6 className="text-muted text-centre">OR</h6>
            <hr className="text-muted"></hr>
          </div>
          <div className="mt-3 mb-5 d-grid">
            <button
              className="form control custom-btn custom-btn-white"
              style={{ width: "100%", border: "none" }}
            >
              <span className="text-muted fs-6"> Have an account?</span>
              <Link to="/login" className="ms-1 text-info fw-bold">
                Login
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
