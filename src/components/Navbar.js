
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Sidebar } from 'primereact/sidebar';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../logo.png";
import { accountService } from './accountService';

export default function BasicDemo() {

    const [visible, setVisible] = useState(false);
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
          label: 'Admin',
          icon: 'pi pi-phone',
          command: () => {},
          url: '/listAdmin',
        },
        {
          label: 'Producteur',
          icon: 'pi pi-phone',
          command: () => {},
          url: '/listProducteur',
        }
    ];

    const customHeader = (
        <div className="flex align-items-center gap-2">
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
            <span className="font-bold"> {localStorage.getItem('nom')} </span>
        </div>
    );

    const start = <img alt="logo" src={Logo} height="90" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <Button label="Deconnecté" severity="danger" onClick={logout} rounded/>
            <Button icon="pi pi-user" label='' className='bg-teal-500 border-teal-50' onClick={() => setVisible(true)} />
            <p> {localStorage.getItem('nom')+ ' ' + localStorage.getItem('prenoms') } </p>
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
            <Sidebar header={customHeader} visible={visible} position="right" onHide={() => setVisible(false)} >
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </Sidebar>

        </div>
    )
}
        