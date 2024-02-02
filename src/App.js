import { Route, Routes } from "react-router-dom";
import './App.css';
import Contact from "./components/Contact";
import Home from "./components/Home";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Nopage from "./components/Nopage";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route index element={<Homepage/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="*" element={<Nopage/>} />
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
    </div>
  );
}

export default App;
