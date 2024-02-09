import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';

function Example() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:8080/api/v1/listcategories');
      console.log("lancement de la requete");

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }

      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error.message);
    } 
  }

  return (
    <div className='card'>
            <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                <Column field="idCatProd" header="Code"></Column>
                <Column field="libelleCatProd" header="Name"></Column>
            </DataTable>
    </div>
  );
}

export default Example;
