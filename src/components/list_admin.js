import axios from "axios";
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';

export default function ProductsDemo() {
    //Objet pour initialiser le state produits
    let emptyAdmin = {
        nom: null,
        prenoms: '',
        date: null,
        contact: ''
    };

    const [admins, setAdmins] = useState(null);
    const [adminDialog, setAdminDialog] = useState(false);
    const [deleteAdminDialog, setDeleteAdminDialog] = useState(false);
    const [deleteAdminsDialog, setDeleteAdminsDialog] = useState(false);
    const [admin, setAdmin] = useState(emptyAdmin);
    const [selectedAdmins, setSelectedAdmins] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/listadmin')
        .then(res => {
            setAdmins(res['data']);
          console.log(res['data']);
        })
        .catch(error => console.log(error));
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    //Pour le bouton Ajouter
    const openNew = () => {
        setAdmin(emptyAdmin);
        setSubmitted(false);
        setAdminDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setAdminDialog(false);
    };

    const hideDeleteAdminDialog = () => {
        setDeleteAdminDialog(false);
    };

    const hideDeleteAdminsDialog = () => {
        setDeleteAdminsDialog(false);
    };

    const saveAdmin = () => {
        setSubmitted(true);

        if (admin.name.trim()) {
            let _admins = [...admins];
            let _admin = { ...admin };

            if (admin.id) {
                const index = findIndexById(admin.id);

                _admins[index] = _admin;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'admin Updated', life: 3000 });
            } else {
                _admin.id = createId();
                _admin.image = 'admin-placeholder.svg';
                _admins.push(_admin);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'admin Created', life: 3000 });
            }

            setAdmins(_admins);
            setAdminDialog(false);
            setAdmin(emptyAdmin);
        }
    };

    const editadmin = (admin) => {
        setAdmin({ ...admin });
        setAdminDialog(true);
    };

    const confirmDeleteAdmin = (admin) => {
        setAdmin(admin);
        setDeleteAdminDialog(true);
    };

    const deleteAdmin = () => {
        //Suppression d'un produit specifique
        let _admins = admins.filter((val) => val.id !== admin.id);

        setAdmins(_admins);
        setDeleteAdminDialog(false);
        setAdmin(emptyAdmin);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'admin Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < admins.length; i++) {
            if (admins[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteAdminsDialog(true);
    };

    const deleteSelectedAdmins = () => {
        //Requete de suppression des produit
        let _admins = admins.filter((val) => !selectedAdmins.includes(val));

        setAdmins(_admins);
        setDeleteAdminsDialog(false);
        setSelectedAdmins(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'admins Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _admin = { ...admin };

        _admin['category'] = e.value;
        setAdmin(_admin);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _admin = { ...admin };

        _admin[`${name}`] = val;

        setAdmin(_admin);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _admin = { ...admin };

        _admin[`${name}`] = val;

        setAdmin(_admin);
    };

    //Gestion des bouton d'ajout et de suppression
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Ajouter" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Supprimer" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedAdmins || !selectedAdmins.length} />
            </div>
        );
    };

    //Gestion de l'export 
    const rightToolbarTemplate = () => {
        return <Button label="Exporter" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    //Gestion des images du tableau
    const imageBodyTemplate = (rowData) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/admin/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    //Gestion des prix
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    //Gestion des etoiles
    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    //Gestion des statuts
    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };

    //Bouton de la dernière colonne de chaque ligne du tableau
    const actionBodyTemplate = (rowData) => {
        const level = parseInt(localStorage.getItem('userLevel'));
        console.log(level);
        if (level === 1) {
            return (
                <React.Fragment>
                    <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editadmin(rowData)} />
                    <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteAdmin(rowData)} />
                </React.Fragment>
            );
        } else {
            return null; // Rien ne sera affiché si rowData.userLevel !== 1
        }
    };
    

    const getSeverity = (admin) => {
        switch (admin.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage admins</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Rechercher..." />
            </span>
        </div>
    );
    const adminDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveAdmin} />
        </React.Fragment>
    );
    const deleteAdminDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteAdminDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteAdmin} />
        </React.Fragment>
    );
    const deleteAdminsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteAdminsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedAdmins} />
        </React.Fragment>
    );

    return (
        <div>
            {/*Tableau complet */}
            <Toast ref={toast} />
            <div className="card">
                {/*Entete du Tableau */}
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                {/*Datatable*/}
                <DataTable ref={dt} value={admins} selection={selectedAdmins} onSelectionChange={(e) => setSelectedAdmins(e.value)}
                        dataKey="idAdmin"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} admins" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="nomAdmin" header="Nom" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="prenomsAdmin" header="Prenoms" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="date_naissAdmin" header="Date de naissance" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="contactAdmin" header="Contact" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            {/*Popup d'ajout d'une ligne */}
            <Dialog visible={adminDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="admin Details" modal className="p-fluid" footer={adminDialogFooter} onHide={hideDialog}>
                {admin.image && <img src={`https://primefaces.org/cdn/primereact/images/admin/${admin.image}`} alt={admin.image} className="admin-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={admin.nomAdmin} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !admin.name })} />
                    {submitted && !admin.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={admin.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={admin.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={admin.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={admin.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={admin.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={admin.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <InputNumber id="quantity" value={admin.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                    </div>
                </div>
            </Dialog>


            {/*Popup de confirmation de suppression d'une ligne */}
            <Dialog visible={deleteAdminDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteAdminDialogFooter} onHide={hideDeleteAdminDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {admin && (
                        <span>
                            Etre vous sure de vouloir supprimer  <b>{admin.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            {/*Popup de confirmation de suppression des produits selectionnés */}
            <Dialog visible={deleteAdminsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteAdminsDialogFooter} onHide={hideDeleteAdminsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {admin && <span>Etre vous sure de vouloir supprimer les produits selectionnés?</span>}
                </div>
            </Dialog>
        </div>
    );
}
        