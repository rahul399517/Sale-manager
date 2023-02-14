import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../config";
import axios from "axios";
import { useEffect } from "react";
import Topsale from "../pages/topsales";
import TotalRevenue from "../pages/totalrevenue";
function Header() {
  //creating config_obj to congigure the authorized user
  const CONFIG_OBJ = {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  // all posts
  const [allmyData, setAllMyData] = useState([]);
  const GetMyAllData = async () => {
    const response = await axios.get(`${API_BASE_URL}/myallposts`, CONFIG_OBJ);
    //debugger;
    if (response.status === 200) {
      setAllMyData(response.data.posts);
      GetMyAllData();
    } else {
      Swal.fire({
        icon: "error",
        title: "Some error occured",
      });
    }
  };
  useEffect(() => {
    GetMyAllData();
  }, []);
  //API call for delete post
  const deleteData = async (postId) => {
    console.log(postId);
    //debugger;
    const response = await axios.delete(
      `${API_BASE_URL}/deletepost/${postId}`,
      CONFIG_OBJ
    );
    if (response.status === 200) {
      GetMyAllData();
    } else {
      Swal.fire({
        icon: "error",
        title: "Some error occured",
      });
    }
  };
  // for top sales
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // for today revenue
  const [topsale, setTopSale] = useState(false);

  const handletopsaleClose = () => setTopSale(false);
  const handletopsaleShow = () => setTopSale(true);
  //logout
  //declaring Dispatch
  const dispatch = useDispatch();
  //declaring Navigation
  const navigate = useNavigate();
  //hide menu on logout
  let user = useSelector((state) => state.user);
  console.log(user);
  //Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGIN_ERROR" });
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/login">Sales App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {localStorage.getItem("token") ? (
                <Nav.Link href="/addsale">Add Sales</Nav.Link>
              ) : (
                ""
              )}
              {localStorage.getItem("token") ? (
                <Nav.Link onClick={handleShow}>Top 5 Sales</Nav.Link>
              ) : (
                ""
              )}
              {localStorage.getItem("token") ? (
                <Nav.Link onClick={handletopsaleShow}>Todays Revenue</Nav.Link>
              ) : (
                ""
              )}

              {localStorage.getItem("token") ? (
                <Nav.Link eventKey={2} onClick={() => logout()}>
                  <i class="fa-solid fa-right-from-bracket"></i> Logout
                </Nav.Link>
              ) : (
                ""
              )}
            </Nav>
            <Nav>
              {!localStorage.getItem("token") ? (
                <Nav.Link href="/login">Login</Nav.Link>
              ) : (
                ""
              )}
              {!localStorage.getItem("token") ? (
                <Nav.Link href="/signup">Register</Nav.Link>
              ) : (
                ""
              )}

              {localStorage.getItem("token") ? (
                <Nav.Link eventKey={2}>
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "40px",
                      border: "2px solid white",
                    }}
                    src={user.profileImg}
                    alt="Not available"
                  />{" "}
                  {user.fullName}
                </Nav.Link>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/*model for top 5 sales */}
      <Modal show={show} onHide={handleClose} style={{ overflow: "scroll" }}>
        <Modal.Header closeButton>
          <Modal.Title>Top 5 Sales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {allmyData &&
            allmyData
              .map((post) => {
                return (
                  <div
                    className="col-md-3  col-sm-12 mb-sm-2"
                    id="postspace"
                    key={post._id}
                  >
                    <Topsale
                      postData={post}
                      deleteData={deleteData}
                      GetMyAllData={GetMyAllData}
                    />
                  </div>
                );
              })
              .reverse()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/*model for today revenue */}
      <Modal show={topsale} onHide={handletopsaleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Todays Revenue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {allmyData &&
            allmyData
              .map((post) => {
                return (
                  <div
                    className="col-md-3  col-sm-12 mb-sm-2"
                    id="postspace"
                    key={post._id}
                  >
                    <TotalRevenue
                      postData={post}
                      deleteData={deleteData}
                      GetMyAllData={GetMyAllData}
                    />
                  </div>
                );
              })
              .reverse()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handletopsaleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;
