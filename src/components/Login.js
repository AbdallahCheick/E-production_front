import axios from "axios";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { default as React, useRef, useState, } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo.png";
import { accountService } from "./accountService";

const Login = () => {

  
  const toastCenter = useRef(null);

  const showMessage = (data, ref, severity) => {

    ref.current.show({ severity: severity, summary: 'Erreur', detail: data, life: 3000 });
};

  let navigate = useNavigate();
  const [formulaire, setFormulaire] = useState({
    username : '',
    password: ''
  });

  const onChange = (e) => {
      setFormulaire({
        ...formulaire,
        [e.target.name] : e.target.value
      })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formulaire);
    axios.post('http://localhost:8080/api/v1/authentification', formulaire)
      .then(res => {
        accountService.saveToken(res.data.token);
        accountService.saveInfo(res.data.donnee[0])
        navigate('/')
        console.log(res);
      })
      .catch(error =>{
        showMessage(error.response.data.Erreur, toastCenter, 'error')
        console.log(error)
      });
  }
  return (
    <div className="flex justify-center items-center justify-content-center h-screen">
    <Toast ref={toastCenter} position="center" /> {/* Pour la notification centrée */}
      <form onSubmit={onSubmit}>
    <div className=" shadow-6 m-auto p-8">
      <div><img alt="logo" src={Logo} height="90" className="mr-2"></img></div>
      <h1 className="text-primary">Connexion</h1>
      <div className="p-inputgroup mb-4">
        <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <span className="p-float-label">
              <InputText id="username" name="username" value={formulaire.username} onChange={onChange}  />
              <label htmlFor="nom">Nom d'utilisateur</label>
          </span>
      </div>
      <div className="p-inputgroup mb-4">
        <span className="p-inputgroup-addon">
            <i className="pi pi-lock"></i>
          </span>
          <span className="p-float-label">
            <Password id="password" name="password" value={formulaire.password} onChange={onChange} feedback={false} toggleMask />
              <label htmlFor="nom">Mot de passe</label>
          </span>
      </div><br/>
      <Button label="Se connecter"></Button><br/><br/>
      <Link to="/Logout" className="text-500 font-bold h-2rem m-5">S'inscire</Link>
    </div>
    </form>
  </div>
  )
}

export default Login
