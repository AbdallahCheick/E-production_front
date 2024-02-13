import { Route, Routes } from "react-router-dom";
import './App.css';
import AuthGuard from "./components/AuthGuard";
import Contact from "./components/Contact";
import Example from "./components/Example";
import Home from "./components/Home";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Nopage from "./components/Nopage";
import Profile from "./components/Profile";
import Datatable from "./components/datatable";
import ListAdmin from "./components/list_admin";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={
        <AuthGuard>
          <Home/>
        </AuthGuard>
        }>
          <Route index element={<Homepage/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/datatable" element={<Datatable/>} />
          <Route path="/listAdmin" element={<ListAdmin/>} />
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/example" element={<Example/>} />
        <Route path="*" element={<Nopage/>} />
      </Routes>
    </div>
  );
}

export default App;
