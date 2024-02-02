import { Calendar } from 'primereact/calendar';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { default as React, useState } from 'react';
import { Link } from "react-router-dom";

const Logout = () => {
  const [value, setValue] = useState('');
  const [Nom, setNom] = useState('');
  const [Prenoms, setPrenoms] = useState('');
  const [Passwords, setPasswords] = useState('');
  const [Repasswords, setRepasswords] = useState('');
  const [Username, setUsername] = useState('');
  const [Contact, setContact] = useState('');
  const [Date, setDate] = useState(null);
  return (
    <div className="flex justify-center items-center justify-content-center h-screen border-round ">
    <div className=" shadow-6 m-auto p-8 ">
      <div><img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img></div>
      <h1 className="text-primary">Inscription</h1>

      {/* La premiere ligne */}
    <div className='formgrid grid'>
      <div className="p-inputgroup w-12 md:w-19rem mb-5">
        {/* Le champs nom */}
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <span className="p-float-label">
            <InputText id="nom" value={Nom} onChange={(e) => setNom(e.target.value)} />
            <label htmlFor="nom">Nom</label>
        </span>
      </div>

      <div className="p-inputgroup w-12 md:w-19rem mb-5 md:ml-2">
        {/* Le champs nom */}
        <span className="p-inputgroup-addon">
        <i className="pi pi-users"></i>
        </span>
        <span className="p-float-label">
            <InputText id="prenoms" value={Prenoms} onChange={(e) => setPrenoms(e.target.value)} />
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
            <Calendar id="date" value={Date} onChange={(e) => setDate(e.value)} />
            <label htmlFor="date">Date de naissance</label>
        </span>
      </div>

      <div className="p-inputgroup w-12 md:w-19rem mb-5 md:ml-2">
        {/* Le champs nom */}
        <span className="p-inputgroup-addon">
        <i className="pi pi-id-card"></i>
        </span>
        <span className="p-float-label">
            <InputText id="username" value={Username} onChange={(e) => setUsername(e.target.value)} />
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
            <Password id="password" placeholder="Mot de passe" value={Passwords} onChange={(e) => setPasswords(e.target.value)} feedback={false} toggleMask />
            <label htmlFor="password">Mot de passe</label>
        </span>
      </div>

      <div className="p-inputgroup w-12 md:w-19rem mb-5 md:ml-2">
        {/* Le champs nom */}
        <span className="p-inputgroup-addon">
        <i className="pi pi-lock"></i>
        </span>
        <span className="p-float-label">
            <InputText id="prenoms" value={Repasswords} onChange={(e) => setRepasswords(e.target.value)} />
            <label htmlFor="username">Confirmer le mot de passe</label>
        </span>
      </div>
    </div>
      {/* La premiere ligne */}
      <div className='formgrid grid'>
      <div className="p-inputgroup w-12 md:w-19rem mb-2">
        {/* Le champs nom */}
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <span className="p-float-label">
            <InputText id="contact" value={Contact} onChange={(e) => setContact(e.target.value)} />
            <label htmlFor="contact">Contact</label>
        </span>
      </div>

      <div className="p-inputgroup w-12 md:w-19rem mb-2 md:ml-2">
        {/* Le champs nom */}
        <span className="p-inputgroup-addon">
        <i className="pi pi-user"></i>
        </span>
        <span className="p-float-label">
            <InputText id="prenoms" value={value} onChange={(e) => setValue(e.target.value)} />
            <label htmlFor="username">Username</label>
        </span>
      </div>
    </div>
      <Link to="/Login" className="text-primary font-bold h-2rem m-5">Se connecter</Link>
    </div>

  </div>
  );
}

export default Logout
