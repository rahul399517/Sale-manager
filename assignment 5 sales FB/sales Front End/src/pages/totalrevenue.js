import "./topsale.css";

function TotalRevenue(props) {
  function add(totalcost) {
    for (let i = 0; i <= props.propsData.length; i++) {
      totalcost = props.postData.productCost + totalcost;
    }
    return totalcost;
  }
  return (
    <div class="card" id="topsale">
      <div class="card-body">
        <p style={{ fontWeight: "500" }}>Total cost</p>
        {(e) => add(e)}

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
export default TotalRevenue;
