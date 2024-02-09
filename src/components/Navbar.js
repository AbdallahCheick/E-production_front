
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../logo.png";
import { accountService } from './accountService';

export default function BasicDemo() {
    let navigate = useNavigate();
    const logout = () => {
        accountService.logout();
        navigate('/login');
    }
    const items = [
        {
          label: 'Accueil',
          icon: 'pi pi-home',
          command: () => {},
          url: '/',
        },
        {
          label: 'Achat',
          icon: 'pi pi-user',
          command: () => {},
          url: '/profile',
        },
        {
          label: 'Producteur',
          icon: 'pi pi-phone',
          command: () => {},
          url: '/contact',
        },
        {
          label: 'Tableau',
          icon: 'pi pi-phone',
          command: () => {},
          url: '/datatable',
        }
    ];

    const start = <img alt="logo" src={Logo} height="90" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <Button label="Deconnecté" severity="danger" onClick={logout} rounded/>
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
        