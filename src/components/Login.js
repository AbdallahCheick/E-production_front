import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { default as React, useState } from 'react';
import { Link } from "react-router-dom";

const Login = () => {
  const [value, setValue] = useState('');
  return (
    <div className="flex justify-center items-center justify-content-center h-screen">
    <div className=" shadow-6 m-auto p-8">
      <div><img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img></div>
      <h1 className="text-primary">Connexion</h1>
      <div className="p-inputgroup mb-4">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <InputText placeholder="Nom d'utilisateur" />
      </div>
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-lock"></i>
        </span>
        <Password placeholder="Mot de passe" value={value} onChange={(e) => setValue(e.target.value)} feedback={false} toggleMask />
      </div>
      <Link to="/Logout" className="text-primary font-bold h-2rem m-5">S'inscire</Link>
    </div>
  </div>
  )
}

export default Login
