import "./topsale.css";

function Topsale(props) {
  return (
    <div class="card" id="topsale">
      <div class="card-body">
        <p style={{ fontWeight: "500" }}>Product Name</p>

        {props.postData.productName}

        <p style={{ fontWeight: "500" }}>Product Cost</p>
        {props.postData.productCost}

        <p style={{ fontWeight: "500" }}>Product Quantity</p>
        {props.postData.quantity}

        <p style={{ fontWeight: "500" }}>..</p>
        <i
          onClick={() => props.deleteData(props.postData._id)}
          className="fa-solid fa-trash"
          style={{ color: "red" }}
        ></i>
      </div>
    </div>
  );
}
export default Topsale;
