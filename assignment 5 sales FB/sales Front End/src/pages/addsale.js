import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../config";

import { useEffect } from "react";
import "./addsale.css";
import DataCard from "./datacard";
function AddSale() {
  const [productName, setProductName] = useState("");
  const [productCost, setProductCost] = useState("");
  const [quantity, setQuantiy] = useState("");

  //setting up loading animation
  const [loading, SetLoading] = useState(false);
  //creating config_obj to congigure the authorized user
  const CONFIG_OBJ = {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  //Add Sale event

  const addsale = (event) => {
    event.preventDefault();
    SetLoading(true);
    const requestData = { productName: productName, productCost, quantity };
    axios
      .post(`${API_BASE_URL}/createpost`, requestData, CONFIG_OBJ)
      .then((result) => {
        if (result.status === 201) {
          SetLoading(false);

          GetMyAllData(); //for auto reloading
        }
        setProductName("");
        setProductCost("");
        setQuantiy("");
      })
      .catch((error) => {
        console.log(error);
        SetLoading(false);
        Swal.fire({
          icon: "error",
          title: error.response.data.error,
        });
      });
  };
  // all posts
  const [allmyData, setAllMyData] = useState([]);
  const GetMyAllData = async () => {
    const response = await axios.get(`${API_BASE_URL}/myallposts`, CONFIG_OBJ);
    //debugger;
    if (response.status === 200) {
      setAllMyData(response.data.posts);
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
  return (
    <div className="row">
      <div className="col-md-5 col-sm-12">
        <div class="card shadow m-3">
          <div class="card-header" style={{ fontWeight: "500" }}>
            Add sale{" "}
          </div>
          <div class="card-body">
            <Form onSubmit={(e) => addsale(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  value={productName}
                  onChange={(ev) => setProductName(ev.target.value)}
                  type="text"
                  placeholder="Product Name "
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  value={productCost}
                  onChange={(ev) => setProductCost(ev.target.value)}
                  type="Text"
                  placeholder="Product Cost"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  value={quantity}
                  onChange={(ev) => setQuantiy(ev.target.value)}
                  type="text"
                  placeholder="Product Quantity"
                />
              </Form.Group>
              <div className="row"></div>

              {/*Adding the loading animation on top of the card  */}
              {loading ? (
                <div className="row">
                  <div className="col-md-12">
                    {/*Adding spinner code from bootstrap */}
                    <div className="spinner-border text-warning" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <Button
                className="btn btn-primary"
                style={{ width: "100%" }}
                variant="primary"
                type="submit"
              >
                Add Sale
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <div className="col-md-7 col-sm-12">
        <div className="card shadow m-2 p-4 " id="recentdata">
          <div className="card-title " style={{ fontWeight: "500" }}>
            Recently Added Data
          </div>
          <div className="card-body">
            {/* Show Data*/}
            <div className="row mb-4 " style={{ marginLeft: "-25px" }}>
              {/* Here we will loop the user post with .map method*/}
              {allmyData &&
                allmyData
                  .map((post) => {
                    return (
                      <div
                        className="col-md-3  col-sm-12 mb-sm-2"
                        id="postspace"
                        key={post._id}
                      >
                        <DataCard
                          postData={post}
                          deleteData={deleteData}
                          GetMyAllData={GetMyAllData}
                        />
                      </div>
                    );
                  })
                  .reverse()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSale;
