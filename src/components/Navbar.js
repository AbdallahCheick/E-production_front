
import { Menubar } from 'primereact/menubar';
import { Link } from 'react-router-dom';
import React from 'react';

export default function BasicDemo() {
    const items = [
        {
          label: 'Accueil',
          icon: 'pi pi-home',
          command: () => {},
          url: '/',
        },
        {
          label: 'Profil',
          icon: 'pi pi-user',
          command: () => {},
          url: '/profile',
        },
        {
          label: 'Contact',
          icon: 'pi pi-phone',
          command: () => {},
          url: '/contact',
        }
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <Link to="/login" rel="noopener noreferrer" className="p-button font-bold">
                Log In
            </Link>
        </div>
    );

    return (
        <div className="card">
                <Menubar
                    model={items.map((item) => ({
                        ...item,
                        command: () => {}, // Vous pouvez laisser cette fonction vide
                        template: (itemOptions, index) => (
                        <Link key={index} to={itemOptions.url} className="p-menuitem-link">
                            <span className={itemOptions.icon}></span>
                            <span>{itemOptions.label}</span>
                        </Link>
                        ),
                    }))}
                    className="horizontal-scroll-menu mean-bar d-flex align-items-center mb-0"
                    start={start} end={end} />

        </div>
    )
}
        