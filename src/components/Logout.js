import axios from 'axios';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { default as React, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo.png";
import { accountService } from './accountService';

const Logout = () => {

  const toastCenter = useRef(null);

  const showMessage = (data, ref, severity) => {

    ref.current.show({ severity: severity, summary: 'Erreur', detail: data, life: 3000 });
};

  let navigate = useNavigate();
  const [formulaire, setFormulaire] = useState({
    nom: 'f',
    prenoms: 'f',
    date : '27/10/2000',
    password : 'f',
    repassword : 'f',
    username : 'f',
    contact : '0779595588'

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
    axios.post('http://localhost:8080/api/v1/addadmin', formulaire)
      .then(res => {
        accountService.saveToken(res.data.token)
        navigate('/login')
        console.log(res.data.Erreur);
      })
      .catch(error =>{
        showMessage(error.response.data.Erreur, toastCenter, 'error')
        console.log(error.response.data.Erreur);
      });
  }
  return (
    <div className="flex justify-center items-center justify-content-center h-screen border-round ">
    <Toast ref={toastCenter} position="center" /> {/* Pour la notification centrée */}
    <form onSubmit={onSubmit} >
    <div className=" shadow-6 m-auto p-8 ">
      <div><img alt="logo" src={Logo} height="90" className="mr-2"></img></div>
      <h1 className="text-primary">Inscription</h1>
      {/* La premiere ligne */}
    <div className='formgrid grid'>
      <div className="p-inputgroup w-12 md:w-19rem mb-5">
        {/* Le champs nom */}
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <span className="p-float-label">
            <InputText id="nom" name="nom" value={formulaire.nom} onChange={onChange} />
            <label htmlFor="nom">Nom</label>
        </span>
      </div>

      <div className="p-inputgroup w-12 md:w-19rem mb-5 md:ml-2">
        {/* Le champs nom */}
        <span className="p-inputgroup-addon">
        <i className="pi pi-users"></i>
        </span>
        <span className="p-float-label">
            <InputText id="prenoms" name="prenoms" value={formulaire.prenoms} onChange={onChange} />
            <label htmlFor="prenoms">Prénoms</label>
        </span>
      </div>
    </div>
    
    
      {/* La premiere ligne */}
      <div className='formgrid grid'>
      <div className="p-inputgroup w-12 md:w-19rem mb-5">
        {/* Le champs nom */}
        <span className="p-inputgroup-addon">
          <i className="pi pi-calendar"></i>
        </span>
        <span className="p-float-label">
            <Calendar id='date' name="date" value={formulaire.date} onChange={onChange} />
            <label htmlFor="date">Date de naissance</label>
        </span>
      </div>

      <div className="p-inputgroup w-12 md:w-19rem mb-5 md:ml-2">
        {/* Le champs nom */}
        <span className="p-inputgroup-addon">
        <i className="pi pi-id-card"></i>
        </span>
        <span className="p-float-label">
            <InputText id="username" name="username" value={formulaire.username} onChange={onChange} />
            <label htmlFor="username">Nom d'utilisateur</label>
        </span>
      </div>
    </div>

    
      {/* La premiere ligne */}
      <div className='formgrid grid'>
      <div className="p-inputgroup w-12 md:w-19rem mb-5">
        {/* Le champs nom */}
        <span className="p-inputgroup-addon">
          <i className="pi pi-lock"></i>
        </span>
        <span className="p-float-label">
            <Password id="password" name='password' value={formulaire.password} onChange={onChange} feedback={false} toggleMask />
            <label htmlFor="password">Mot de passe</label>
        </span>
      </div>

      <div className="p-inputgroup w-12 md:w-19rem mb-5 md:ml-2">
        {/* Le champs nom */}
        <span className="p-inputgroup-addon">
        <i className="pi pi-lock"></i>
        </span>
        <span className="p-float-label">
            <Password id="Repassword" name='repassword' value={formulaire.repassword} onChange={onChange} feedback={false} toggleMask />
            <label htmlFor="Repassword">Confirmer le mot de passe</label>
        </span>
      </div>
    </div>
      {/* La premiere ligne */}
      <div className='formgrid grid'>
      <div className="p-inputgroup w-12 mb-2">
        {/* Le champs nom */}
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <span className="p-float-label">
            <InputText id="contact" name='contact' value={formulaire.contact} onChange={onChange} />
            <label htmlFor="contact">Contact</label>
        </span>
      </div>
    </div><br/>
    <Button label="S'inscrire" severity="primary" rounded></Button><br></br>
      <Link to="/Login" className="text-primary font-bold h-2rem m-5">Se connecter</Link>
    </div>

    </form>
  </div>
  );
}

export default Logout
