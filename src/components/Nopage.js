import { Dropdown } from 'primereact/dropdown';
import React, { useState } from "react";

const Nopage = () => {

  const cities = [
      { name: 'New York' },
      { name: 'Rome' },
      { name: 'London' },
      { name: 'Istanbul' },
      { name: 'Paris' }
  ];

  // Initialiser selectedCity avec l'objet de la ville "Rome"
  const [selectedCity, setSelectedCity] = useState(cities.find(city => city.name === 'Rome'));

  return (
    <div>
        <h1>404 PAGE NOT FOUND</h1>
        <div className="card flex justify-content-center">
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="Select a City" className="w-full md:w-14rem" />
        </div>
    </div>
  )
}

export default Nopage
