import { Dropdown } from 'primereact/dropdown';
import React, { useState } from "react";

const Nopage = () => {

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
      { name: 'New York' },
      { name: 'Rome' },
      { name: 'London' },
      { name: 'Istanbul' },
      { name: 'Paris' }
  ];
  console.log(selectedCity);
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
