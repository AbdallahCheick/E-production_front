import axios from "axios";
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

export default function ProductsDemo() {
    //Objet pour initialiser le state produits
    let emptycategorie = {
        id : '',
        libelle : ''
    };
    

    const [categories, setCategories] = useState(null);
    const [categorieDialog, setCategorieDialog] = useState(false);
    const [deleteCategorieDialog, setDeleteCategorieDialog] = useState(false);
    const [deleteCategoriesDialog, setDeleteCategoriesDialog] = useState(false);
    const [categorie, setCategorie] = useState(emptycategorie);
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);


    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/listcategories')
        .then(res => {
            const __categorie = res['data'];
            setCategories(res['data']);
            console.log(__categorie);
        })
        .catch(error => console.log(error));
    }, []);

   

    //Pour le bouton Ajouter
    const openNew = () => {
        setCategorie(emptycategorie);
        setSubmitted(false);
        setCategorieDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCategorieDialog(false);
    };

    const hideDeleteCategorieDialog = () => {
        setDeleteCategorieDialog(false);
    };

    const hideDeleteCategoriesDialog = () => {
        setDeleteCategoriesDialog(false);
    };


    //Ajout et la modification des categorieistrateur
    const savecategorie = () => {
        setSubmitted(true);
        console.log(categorie);
        if (categorie.libelle.trim()) {
            let _categories = [...categories];
            let _categorie = {...categorie};
            console.log(_categorie);
            console.log(_categorie);
            console.log(_categories);
            //La modification
            if (categorie.id) {
                //requete de mise a jour des données
                axios.put('http://localhost:8080/api/v1/updatecategories',_categorie )
                .then(res => {
                    //requete de rechargement de la liste des categories
                    axios.get('http://localhost:8080/api/v1/listcategories')
                    .then(res => {
                        setCategories(res['data']);
                      console.log(res['data']);
                    })
                    .catch(error => console.log(error));
                    console.log(res);
                })
                .catch(error => console.log(error.response.data.Erreur));
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Modification effectué', life: 3000 });
            } else {
                axios.post('http://localhost:8080/api/v1/addcategorie',_categorie )
                .then(res => {
                    //requete de rechargement de la liste des categories
                    axios.get('http://localhost:8080/api/v1/listcategories')
                    .then(res => {
                        setCategories(res['data']);
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

            setCategories(_categories);
            setCategorieDialog(false);
            setCategorie(emptycategorie);
        }
    };



    const editcategorie = (categorie) => {
        console.log(categorie);
        setCategorie({
            id : categorie.idCatProd,
            libelle : categorie.libelleCatProd
        });
        setCategorieDialog(true);
    };

    const confirmDeleteCategorie = (categorie) => {
        setCategorie(categorie);
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
                let _categories = {id : ""+categorie.idCatProd+""};
                console.log(_categories);
        
                axios.post('http://localhost:8080/api/v1/deleteCategories', _categories)
                .then(res => {
                    //requete de rechargement de la liste des categories
                    axios.get('http://localhost:8080/api/v1/listcategories')
                    .then(res => {
                        setCategories(res['data']);
                      console.log(res['data']);
                    })
                    .catch(error => console.log(error));
                    console.log(res);
                })
                .catch(error => console.log(error));
                setDeleteCategorieDialog(false);
                setCategorie(emptycategorie);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    };

    const deleteCategorie = () => {
        //Suppression d'un produit specifique
        console.log(categorie);

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'categorie Deleted', life: 3000 });
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteCategoriesDialog(true);
    };

    const deleteSelectedCategories = () => {
        //Requete de suppression des produit
        
        const selectlength = selectedCategories.length ; 
        for (let i = 0; i < selectlength; i++ ){
            console.log(selectedCategories[i]);
            const _idcategorie = {id : selectedCategories[i].idCatProd};
            console.log(_idcategorie);
            axios.post("http://localhost:8080/api/v1/deleteCategories", _idcategorie)
            .then(res =>{
                //requete de rechargement de la liste des categories
                axios.get('http://localhost:8080/api/v1/listcategories')
                .then(res => {
                    setCategories(res['data']);
                  console.log(res['data']);
                })
                .catch(error => console.log(error));
                console.log(res['data']);
            })
            .catch(error =>{
                console.log(error);
            })
        }
        
        let _categories = categories.filter((val) => !selectedCategories.includes(val));

        setCategories(_categories);
        setDeleteCategoriesDialog(false);
        setSelectedCategories(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'categories Deleted', life: 3000 });
    };


    
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _categorie = { ...categorie };

        _categorie[`${name}`] = val;
        console.log(_categorie);
        setCategorie(_categorie);
    };

    //Gestion des bouton d'ajout et de suppression
    const leftToolbarTemplate = () => {
        
        const level = parseInt(localStorage.getItem('userLevel'));
        if (level === 1) {
            return(
                <div className="flex flex-wrap gap-2">
                    <Button label="Ajouter" icon="pi pi-plus" severity="success" onClick={openNew} />
                    <Button label="Supprimer" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedCategories || !selectedCategories.length} />
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
                    <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editcategorie(rowData)} />
                    <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteCategorie(rowData)} />
                </React.Fragment>
            );
        } else {
            return null; // Rien ne sera affiché si rowData.userLevel !== 1
        }
    };
    

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Liste des Categories</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Rechercher..." />
            </span>
        </div>
    );
    const categorieDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={savecategorie} />
        </React.Fragment>
    );
    const deleteCategorieDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCategorieDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteCategorie} />
        </React.Fragment>
    );
    const deleteCategoriesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCategoriesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedCategories} />
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
                <DataTable ref={dt} value={categories} selection={selectedCategories} onSelectionChange={(e) => setSelectedCategories(e.value)}
                        dataKey="idCatProd"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} categories" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="idCatProd" header="Numero" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="libelleCatProd" header="libellé categroie" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            {/*Popup d'ajout d'une ligne */}
            <Dialog visible={categorieDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="categorie Details" modal className="p-fluid" footer={categorieDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="nom" className="font-bold">
                        Catégorie
                    </label>
                    <InputText id="nom" value={categorie.libelle} onChange={(e) => onInputChange(e, 'libelle')} required autoFocus className={classNames({ 'p-invalid': submitted && !categorie.libelle })} />
                    {submitted && !categorie.libelle && <small className="p-error">La categorie est obligatoire.</small>}
                </div>
            </Dialog>


            {/*Popup de confirmation de suppression d'une ligne */}
            <Dialog visible={deleteCategorieDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteCategorieDialogFooter} onHide={hideDeleteCategorieDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {categorie && (
                        <span>
                            Etre vous sure de vouloir supprimer  <b>{categorie.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            {/*Popup de confirmation de suppression des produits selectionnés */}
            <Dialog visible={deleteCategoriesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteCategoriesDialogFooter} onHide={hideDeleteCategoriesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {categorie && <span>Etre vous sure de vouloir supprimer les produits selectionnés?</span>}
                </div>
            </Dialog>
        </div>
    );
}
        