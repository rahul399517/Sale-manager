import "../components/footer.css";
import Card from "react-bootstrap/Card";
function Footer() {
  return (
    <div id="footer" style={{ padding: "30px" }}>
      <div className="row">
        <div className="col-md-3 col-sm-12">
          {["Primary"].map((variant) => (
            <Card
              bg={variant.toLowerCase()}
              key={variant}
              text={variant.toLowerCase() === "light" ? "dark" : "white"}
              style={{ width: "18rem" }}
              className="mb-2"
            >
              <Card.Header>Sales App</Card.Header>
              <Card.Body>
                <Card.Title>How to add Sales </Card.Title>
                <Card.Text>
                  Fill up the required detail and click submit
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="col-md-3 col-sm-12">
          {["warning"].map((variant) => (
            <Card
              bg={variant.toLowerCase()}
              key={variant}
              text={variant.toLowerCase() === "light" ? "dark" : "white"}
              style={{ width: "18rem" }}
              className="mb-2"
            >
              <Card.Header>Register </Card.Header>
              <Card.Body>
                <Card.Title> How to Register </Card.Title>
                <Card.Text>
                  Click on register button on right top corner and add details
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="col-md-3 col-sm-12">
          {["Danger"].map((variant) => (
            <Card
              bg={variant.toLowerCase()}
              key={variant}
              text={variant.toLowerCase() === "light" ? "dark" : "white"}
              style={{ width: "18rem" }}
              className="mb-2"
            >
              <Card.Header>LogIn</Card.Header>
              <Card.Body>
                <Card.Title> How to Login </Card.Title>
                <Card.Text>
                  Click on Login button on top right corner of screen and click
                  Login
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="col-md-3 col-sm-12">
          {["Info"].map((variant) => (
            <Card
              bg={variant.toLowerCase()}
              key={variant}
              text={variant.toLowerCase() === "light" ? "dark" : "white"}
              style={{ width: "18rem" }}
              className="mb-2"
            >
              <Card.Header>Logout</Card.Header>
              <Card.Body>
                <Card.Title>{variant} How to Log Out </Card.Title>
                <Card.Text>
                  Click on logout button on top right corner of screen
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Footer;
