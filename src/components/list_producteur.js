import axios from "axios";
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

export default function ProductsDemo() {
    //Objet pour initialiser le state produits
    let emptyprod = {
        id : '',
        nom : '',
        prenoms :'',
        sexe : '',
        date :'',
        produit : '',
        contact : ''
    };
    

    const [prods, setProds] = useState(null);
    const [prodDialog, setProdDialog] = useState(false);
    const [deleteProdDialog, setDeleteProdDialog] = useState(false);
    const [deleteProdsDialog, setDeleteProdsDialog] = useState(false);
    const [prod, setProd] = useState(emptyprod);
    const [produit, setProduit] = useState();
    const [selectedprods, setSelectedprods] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/listproducteur')
        .then(res => {
            setProds(res['data'])
            console.log(res['data']);
            
        })
        .catch(error => console.log(error));

        axios.get('http://localhost:8080/api/v1/listproduit')
        .then(res => {
            console.log(res['data']);
            setProduit(res['data']);
        })
        .catch(error =>{
            console.log(error);
        })
    }, []);

    //Pour le bouton Ajouter
    const openNew = () => {
        setProd(emptyprod);
        setSubmitted(false);
        setProdDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProdDialog(false);
    };

    const hideDeleteProdDialog = () => {
        setDeleteProdDialog(false);
    };

    const hideDeleteProdsDialog = () => {
        setDeleteProdsDialog(false);
    };


    //Ajout et la modification des prodistrateur
    const saveprod = () => {
        setSubmitted(true);

        if (prod.nom.trim()) {
            let _prods = [...prods];
            let _prod = {...prod};
            console.log(_prod);
            console.log(_prods);
            console.log("Bien noté");
            //La modification
            if (prod.id) {
                //requete de mise a jour des données
                axios.put('http://localhost:8080/api/v1/updateproducteur',_prod )
                .then(res => {
                    //requete de rechargement de la liste des prods
                    axios.get('http://localhost:8080/api/v1/listproducteur')
                    .then(res => {
                        setProds(res['data']);
                      console.log(res['data']);
                    })
                    .catch(error => console.log(error));
                    console.log(res);
                })
                .catch(error => console.log(error.response.data.Erreur));
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Modification effectué', life: 3000 });
            } else {
                axios.post('http://localhost:8080/api/v1/addproducteur',_prod )
                .then(res => {
                    //requete de rechargement de la liste des prods
                    axios.get('http://localhost:8080/api/v1/listproducteur')
                    .then(res => {
                        setProds(res['data']);
                      console.log(res['data']);
                    })
                    .catch(error => console.log(error));
                    console.log(res);
                })
                .catch(error => {
                    console.log(error.response.data.Erreur)
                    Swal.fire({
                        title: "Erreur",
                        text: error.response.data.Erreur,
                        icon: "error"
                      });
                    });
            }

            setProds(_prods);
            setProdDialog(false);
            setProd(emptyprod);
        }
    };

    const formatDate = (date) => {
        if (date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        }
        return null;
    };

    const editprod = (prod) => {
        console.log(prod);
        setProd({
            id : prod.idProd,
            nom : prod.nomProd,
            prenoms : prod.prenomsProd,
            sexe : prod.sexeProd,
            date : prod.date_naissProd,
            produit : prod.idProduit,
            nomproduit : prod.nomProduit,
            contact : prod.contactProd
        });

        console.log(selectedprods);
        setProdDialog(true);
    };

    const confirmDeleteProd = (prod) => {
        console.log(prod);
        setProd(prod);
        Swal.fire({
            title: "Etes vous sûre?",
            text: "Cette action est irreversible!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, je supprime",
            cancelButtonText: "Annuller"
          }).then((result) => {
            if (result.isConfirmed) {
                let _prods = {id : ""+prod.idProd+""};
                console.log(_prods);
        
                axios.post('http://localhost:8080/api/v1/deleteProducteur', _prods)
                .then(res => {
                    //requete de rechargement de la liste des prods
                    axios.get('http://localhost:8080/api/v1/listproducteur')
                    .then(res => {
                        setProds(res['data']);
                      console.log(res['data']);
                    })
                    .catch(error => console.log(error));
                    console.log(res);
                })
                .catch(error => console.log(error));
                setDeleteProdDialog(false);
                setProd(emptyprod);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    };

    const deleteProd = () => {
        //Suppression d'un produit specifique
        console.log(prod);

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'prod Deleted', life: 3000 });
    };



    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProdsDialog(true);
    };

    const deleteSelectedprods = () => {
        //Requete de suppression des produit
        
        const selectlength = selectedprods.length ; 
        for (let i = 0; i < selectlength; i++ ){
            console.log(selectedprods[i]);
            const _idprod = {id : selectedprods[i].idProd};
            console.log(_idprod);
            axios.post("http://localhost:8080/api/v1/deleteProducteur", _idprod)
            .then(res =>{
                //requete de rechargement de la liste des prods
                axios.get('http://localhost:8080/api/v1/listproducteur')
                .then(res => {
                    setProds(res['data']);
                  console.log(res['data']);
                })
                .catch(error => console.log(error));
                console.log(res['data']);
            })
            .catch(error =>{
                console.log(error);
            })
        }
        
        let _prods = prods.filter((val) => !selectedprods.includes(val));

        setProds(_prods);
        setDeleteProdsDialog(false);
        setSelectedprods(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'prods Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _prod = { ...prod };
        _prod['sexe'] = e.value;
        setProd(_prod);
    };
    
    const onProduitChange = (e) => {
        let _prod = { ...prod };
        const produitvalue = e.value;
        console.log(produitvalue);
        _prod['produit'] = produitvalue.idProduit;
        setProd(_prod);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _prod = { ...prod };

        _prod[`${name}`] = val;
        console.log(_prod);
        setProd(_prod);
    };

    const onDateChange = (e) => {
        let _prod = { ...prod };

        _prod['date'] =formatDate(e.value) ;
        console.log(_prod);
        setProd(_prod);
    };


    //Gestion des bouton d'ajout et de suppression
    const leftToolbarTemplate = () => {
        
        const level = parseInt(localStorage.getItem('userLevel'));
        if (level === 1) {
            return(
                <div className="flex flex-wrap gap-2">
                    <Button label="Ajouter" icon="pi pi-plus" severity="success" onClick={openNew} />
                    <Button label="Supprimer" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedprods || !selectedprods.length} />
                </div>

            )
        }
        else{
            return(
                <Button label="Ajouter" icon="pi pi-plus" severity="success" onClick={openNew} />
            )
        }
    };

    //Gestion de l'export 
    const rightToolbarTemplate = () => {
        return <Button label="Exporter" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    //Bouton de la dernière colonne de chaque ligne du tableau
    const actionBodyTemplate = (rowData) => {
        const level = parseInt(localStorage.getItem('userLevel'));
        console.log(level);
        if (level === 1) {
            return (
                <React.Fragment>
                    <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editprod(rowData)} />
                    <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProd(rowData)} />
                </React.Fragment>
            );
        } else {
            return null; // Rien ne sera affiché si rowData.userLevel !== 1
        }
    };
    


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Liste des Producteurs</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Rechercher..." />
            </span>
        </div>
    );
    const prodDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveprod} />
        </React.Fragment>
    );
    const deleteProdDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProdDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProd} />
        </React.Fragment>
    );
    const deleteProdsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProdsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedprods} />
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
                <DataTable ref={dt} value={prods} selection={selectedprods} onSelectionChange={(e) => setSelectedprods(e.value)}
                        dataKey="idProd"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} prods" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="nomProd" header="Nom" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="prenomsProd" header="Prenoms" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="nomProduit" header="Produit" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="date_naissProd" header="Date de naissance" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="sexeProd" header="Sexe" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="contactProd" header="Contact" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            {/*Popup d'ajout d'une ligne */}
            <Dialog visible={prodDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="prod Details" modal className="p-fluid" footer={prodDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="nom" className="font-bold">
                        Nom
                    </label>
                    <InputText id="nom" value={prod.nom} onChange={(e) => onInputChange(e, 'nom')} required autoFocus className={classNames({ 'p-invalid': submitted && !prod.nom })} />
                    {submitted && !prod.nom && <small className="p-error">Le nom est obligatoire.</small>}
                </div>
                <div className="field">
                    <label htmlFor="prenoms" className="font-bold">
                        Prenoms
                    </label>
                    <InputText id="prenoms" value={prod.prenoms} onChange={(e) => onInputChange(e, 'prenoms')} required autoFocus className={classNames({ 'p-invalid': submitted && !prod.prenoms })} />
                    {submitted && !prod.prenoms && <small className="p-error">Le nom est obligatoire.</small>}
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Sexe</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="f" name="sexe" value="F" onChange={onCategoryChange} checked={prod.sexe === 'F'} />
                            <label htmlFor="f">Feminin</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="m" name="sexe" value="M" onChange={onCategoryChange} checked={prod.sexe === 'M'} />
                            <label htmlFor="m">Masculin</label>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="date" className="font-bold">
                        Date de naissance
                    </label>
                    <Calendar  id="date" value={prod.date} onChange={onDateChange} required  className={classNames({ 'p-invalid': submitted && !prod.date })} dateFormat="dd/mm/yy" />
                    {submitted && !prod.date && <small className="p-error">La date de naissance est obligatoire.</small>}
                </div>

                
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="username" className="font-bold">
                            Produit
                        </label>
                        <Dropdown value={prod.nomproduit} onChange={onProduitChange} options={produit} optionLabel="libelleProduit" placeholder="Select a City" className="w-full md:w-14rem" />
                    </div>

                    <div className="field col">
                        <label htmlFor="contact" className="font-bold">
                            Contact
                        </label>
                        <InputText id="contact" value={prod.contact} onChange={(e) => onInputChange(e, 'contact')} required autoFocus className={classNames({ 'p-invalid': submitted && !prod.contact })} />
                        {submitted && !prod.contact && <small className="p-error">Le contact est obligatoire</small>}
                    </div>
                </div>
                
            </Dialog>


            {/*Popup de confirmation de suppression d'une ligne */}
            <Dialog visible={deleteProdDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProdDialogFooter} onHide={hideDeleteProdDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {prod && (
                        <span>
                            Etre vous sure de vouloir supprimer  <b>{prod.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            {/*Popup de confirmation de suppression des produits selectionnés */}
            <Dialog visible={deleteProdsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProdsDialogFooter} onHide={hideDeleteProdsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {prod && <span>Etre vous sure de vouloir supprimer les produits selectionnés?</span>}
                </div>
            </Dialog>
        </div>
    );
}
        