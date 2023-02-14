import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AddSale from "./pages/addsale";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/addsale" element={<AddSale />}></Route>
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
