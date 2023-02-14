import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "../pages/login.css";
import s from "../images/s.png";
import axios from "axios";
import { API_BASE_URL } from "../config";
//import Swal from "sweetalert2";
import { useState } from "react";
import { useDispatch } from "react-redux";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //declaring Dispatch
  const dispatch = useDispatch();
  //declaring Navigation
  const navigate = useNavigate();
  const login = (event) => {
    event.preventDefault();
    setLoading(true);
    const requestData = { email, password };
    axios.post(`${API_BASE_URL}/login`, requestData).then((result) => {
      if (result.status === 200) {
        setLoading(false);
        /*Swal.fire({
          icon: "success",
          title: "User signed up successfully",
        });*/
        //here we are create a local storage for user data
        localStorage.setItem("token", result.data.result.token);
        localStorage.setItem("user", JSON.stringify(result.data.result.user));
        //dispatching the data to the redux store here
        dispatch({ type: "LOGIN_SUCCESS", payload: result.data.result.user });
        setLoading(false);
        navigate("/addsale");
      }
      /* SetEmail("");
      SetPassword("");*/
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
            LOGIN
          </p>
          <Form onSubmit={(e) => login(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                onChange={(ev) => setPassword(ev.target.value)}
                type="password"
                value={password}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            ></Form.Group>
            {loading ? (
              <>
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              ""
            )}
            <Button className="form-control " variant="primary" type="submit">
              Log In
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
              <span className="text-muted fs-6">Don't have an account?</span>
              <Link to="/signup" className="ms-1 text-info fw-bold">
                Register
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
