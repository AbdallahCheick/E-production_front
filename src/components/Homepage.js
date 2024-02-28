import { Card } from 'primereact/card';
import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import React from 'react';

const Homepage = () => {
    const [admin, setAdmin] = useState(null);
    const [prod, setProd] = useState(null);
    const [produit, setProduit] = useState(null);
    const [categorie, setCategorie] = useState(null);
    const [achat, setAchat] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/listadmin')
        .then(res => {
            const __admin = res['data'];
            setAdmin(res['data'].length);
            console.log(__admin);
        })
        .catch(error => console.log(error));

        axios.get('http://localhost:8080/api/v1/listproducteur')
        .then(res => {
            const __admin = res['data'];
            setProd(res['data'].length);
            console.log(__admin);
        })
        .catch(error => console.log(error));

        axios.get('http://localhost:8080/api/v1/listcategories')
        .then(res =>{
            const categorie = res["data"];
            setCategorie(res['data'].length);
            console.log(categorie);
        })
        .catch(error => console.log(error));

        axios.get('http://localhost:8080/api/v1/listproduit')
        .then(res =>{
            const produit = res["data"];
            setProduit(res['data'].length);
            console.log(produit);
        })
        .catch(error => console.log(error));

        axios.get('http://localhost:8080/api/v1/listachat')
        .then(res =>{
            const achat = res["data"];
            setAchat(res['data'].length);
            console.log(achat);
        })
        .catch(error => console.log(error));
    }, []);
  return (
    <div>
        <div className="card">
            <h1 className="left-0">Bienvenue sur E-Producteur</h1>

        <div className="grid">
    <div className="col-12 md:col-6 lg:col-4">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Administrateurs</span>
                    <div className="text-900 font-medium text-xl"> {admin} </div>
                </div>
                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
                </div>
            </div>
        </div>
    </div>
    <div className="col-12 md:col-6 lg:col-4">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Producteurs</span>
                    <div className="text-900 font-medium text-xl"> {prod} </div>
                </div>
                <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-map-marker text-orange-500 text-xl"></i>
                </div>
            </div>
        </div>
    </div>
    <div className="col-12 md:col-6 lg:col-4">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Categories</span>
                    <div className="text-900 font-medium text-xl"> {categorie} </div>
                </div>
                <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-inbox text-cyan-500 text-xl"></i>
                </div>
            </div>
        </div>
    </div>
    <div className="col-12 md:col-6 lg:col-4">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Produit</span>
                    <div className="text-900 font-medium text-xl"> {produit} </div>
                </div>
                <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-comment text-purple-500 text-xl"></i>
                </div>
            </div>
        </div>
    </div>
</div>
    
<div className="grid">
    <div className="col-12 md:col-6 lg:col-4">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Achats</span>
                    <div className="text-900 font-medium text-xl"> {achat} </div>
                </div>
                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
                </div>
            </div>
            <span className="text-green-500 font-medium">24 new </span>
            <span className="text-500">since last visit</span>
        </div>
    </div>
    <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Revenue</span>
                    <div className="text-900 font-medium text-xl">$2.100</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-map-marker text-orange-500 text-xl"></i>
                </div>
            </div>
            <span className="text-green-500 font-medium">%52+ </span>
            <span className="text-500">since last week</span>
        </div>
    </div>
    <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Customers</span>
                    <div className="text-900 font-medium text-xl">28441</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-inbox text-cyan-500 text-xl"></i>
                </div>
            </div>
            <span className="text-green-500 font-medium">520  </span>
            <span className="text-500">newly registered</span>
        </div>
    </div>
    <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">Comments</span>
                    <div className="text-900 font-medium text-xl">152 Unread</div>
                </div>
                <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <i className="pi pi-comment text-purple-500 text-xl"></i>
                </div>
            </div>
            <span className="text-green-500 font-medium">85 </span>
            <span className="text-500">responded</span>
        </div>
    </div>
</div>
    
    {/*
<div className="surface-0 text-center">
    <div className="mb-3 font-bold text-3xl">
        <span className="text-900">One Product, </span>
        <span className="text-blue-600">Many Solutions</span>
    </div>
    <div className="text-700 mb-6">Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.</div>
    <div className="grid">
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-desktop text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Built for Developers</div>
            <span className="text-700 line-height-3">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-lock text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">End-to-End Encryption</div>
            <span className="text-700 line-height-3">Risus nec feugiat in fermentum posuere urna nec. Posuere sollicitudin aliquam ultrices sagittis.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-check-circle text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Easy to Use</div>
            <span className="text-700 line-height-3">Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat ac tincidunt vitae semper.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-globe text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Fast & Global Support</div>
            <span className="text-700 line-height-3">Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-github text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Open Source</div>
            <span className="text-700 line-height-3">Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. </span>
        </div>
        <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-shield text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Trusted Securitty</div>
            <span className="text-700 line-height-3">Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus metus aliquam eleifend.</span>
        </div>
    </div>
</div>
  */}
    
        </div>
    </div>
  )
}

export default Homepage
