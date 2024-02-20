import axios from "axios";
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

export default function ProductsDemo() {
    //Objet pour initialiser le state produits
    let emptyproduit = {
        id : '',
        categorie : '',
        idcategorie :'',
        libelle : '',
        prix :''
    };
    

    const [produits, setProduits] = useState(null);
    const [produitDialog, setProduitDialog] = useState(false);
    const [deleteProduitDialog, setDeleteProduitDialog] = useState(false);
    const [deleteProduitsDialog, setDeleteProduitsDialog] = useState(false);
    const [produit, setProduit] = useState(emptyproduit);
    const [cat, setCat] = useState(null);
    const [selectedProduits, setSelectedProduits] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/listproduit')
        .then(res => {
            const __produit = res['data'];
            setProduits(res['data']);
            console.log(__produit);
        })
        .catch(error => console.log(error));

        axios.get('http://localhost:8080/api/v1/listcategories')
        .then(res => {
            console.log(res['data']);
            setCat(res['data']);
        })
        .catch(error =>{
            console.log(error);
        })
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' });
    };

    //Pour le bouton Ajouter
    const openNew = () => {
        setProduit(emptyproduit);
        setSubmitted(false);
        setProduitDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProduitDialog(false);
    };

    const hideDeleteProduitDialog = () => {
        setDeleteProduitDialog(false);
    };

    const hideDeleteProduitsDialog = () => {
        setDeleteProduitsDialog(false);
    };


    //Ajout et la modification des produitistrateur
    const saveproduit = () => {
        setSubmitted(true);

        if (produit.libelle.trim()) {
            let _produits = [...produits];
            let _produit = {...produit};
            console.log(_produit);
            console.log(_produit);
            console.log(_produits);
            //La modification
            if (produit.id) {
                //requete de mise a jour des données
                axios.put('http://localhost:8080/api/v1/updateproduit',_produit )
                .then(res => {
                    //requete de rechargement de la liste des produits
                    axios.get('http://localhost:8080/api/v1/listproduit')
                    .then(res => {
                        setProduits(res['data']);
                      console.log(res['data']);
                    })
                    .catch(error => console.log(error));
                    console.log(res);
                })
                .catch(error => console.log(error.response.data.Erreur));
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Modification effectué', life: 3000 });
            } else {
                axios.post('http://localhost:8080/api/v1/addproduit',_produit )
                .then(res => {
                    //requete de rechargement de la liste des produits
                    axios.get('http://localhost:8080/api/v1/listproduit')
                    .then(res => {
                        setProduits(res['data']);
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

            setProduits(_produits);
            setProduitDialog(false);
            setProduit(emptyproduit);
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

    const editproduit = (produit) => {
        console.log(produit);
        setProduit({
            id : produit.idProduit,
            libelle : produit.libelleProduit,
            categorie : produit.categorie,
            idcategorie : produit.idCatProd,
            prix : produit.prixProduit
        });
        setProduitDialog(true);
    };

    const confirmDeleteProduit = (produit) => {
        setProduit(produit);
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
                let _produits = {id : ""+produit.idProduit+""};
                console.log(_produits);
        
                axios.post('http://localhost:8080/api/v1/deleteProduit', _produits)
                .then(res => {
                    //requete de rechargement de la liste des produits
                    axios.get('http://localhost:8080/api/v1/listproduit')
                    .then(res => {
                        setProduits(res['data']);
                      console.log(res['data']);
                    })
                    .catch(error => console.log(error));
                    console.log(res);
                })
                .catch(error => console.log(error));
                setDeleteProduitDialog(false);
                setProduit(emptyproduit);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    };

    const deleteProduit = () => {
        //Suppression d'un produit specifique
        console.log(produit);

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'produit Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < produits.length; i++) {
            if (produits[i].id === id) {
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
        setDeleteProduitsDialog(true);
    };

    const deleteSelectedProduits = () => {
        //Requete de suppression des produit
        
        const selectlength = selectedProduits.length ; 
        for (let i = 0; i < selectlength; i++ ){
            console.log(selectedProduits[i]);
            const _idproduit = {id : selectedProduits[i].idProduit};
            console.log(_idproduit);
            axios.post("http://localhost:8080/api/v1/deleteProduit", _idproduit)
            .then(res =>{
                //requete de rechargement de la liste des produits
                axios.get('http://localhost:8080/api/v1/listproduit')
                .then(res => {
                    setProduits(res['data']);
                  console.log(res['data']);
                })
                .catch(error => console.log(error));
                console.log(res['data']);
            })
            .catch(error =>{
                console.log(error);
            })
        }
        
        let _produits = produits.filter((val) => !selectedProduits.includes(val));

        setProduits(_produits);
        setDeleteProduitsDialog(false);
        setSelectedProduits(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'produits Deleted', life: 3000 });
    };

    const onCategorieChange = (e) => {
        let _produit = { ...produit };
        console.log(_produit);
        console.log(e);
        _produit['categorie'] = e.value.libelleCatProd;
        _produit['idcategorie'] = e.value.idCatProd;
        setProduit(_produit);
    };
    
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _produit = { ...produit };

        _produit[`${name}`] = val;
        console.log(_produit);
        setProduit(_produit);
    };

    const onDateChange = (e) => {
        let _produit = { ...produit };

        _produit['date'] =formatDate(e.value) ;
        console.log(_produit);
        setProduit(_produit);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _produit = { ...produit };

        _produit[`${name}`] = val;

        setProduit(_produit);
    };


    //Gestion des bouton d'ajout et de suppression
    const leftToolbarTemplate = () => {
        
        const level = parseInt(localStorage.getItem('userLevel'));
        if (level === 1) {
            return(
                <div className="flex flex-wrap gap-2">
                    <Button label="Ajouter" icon="pi pi-plus" severity="success" onClick={openNew} />
                    <Button label="Supprimer" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProduits || !selectedProduits.length} />
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

    //Gestion des images du tableau
    const imageBodyTemplate = (rowData) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/produit/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    //Gestion des prix
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.prixProduit);
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
                    <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editproduit(rowData)} />
                    <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduit(rowData)} />
                </React.Fragment>
            );
        } else {
            return null; // Rien ne sera affiché si rowData.userLevel !== 1
        }
    };
    

    const getSeverity = (produit) => {
        switch (produit.inventoryStatus) {
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
            <h4 className="m-0">Liste des produits</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Rechercher..." />
            </span>
        </div>
    );
    const produitDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveproduit} />
        </React.Fragment>
    );
    const deleteProduitDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProduitDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduit} />
        </React.Fragment>
    );
    const deleteProduitsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProduitsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProduits} />
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
                <DataTable ref={dt} value={produits} selection={selectedProduits} onSelectionChange={(e) => setSelectedProduits(e.value)}
                        dataKey="idProduit"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} produits" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="libelleProduit" header="Libelle" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="categorie" header="Catégorie" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="prixProduit" header="Prix"body={priceBodyTemplate} sortable  style={{ minWidth: '16rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            {/*Popup d'ajout d'une ligne */}
            <Dialog visible={produitDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="produit Details" modal className="p-fluid" footer={produitDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="nom" className="font-bold">
                        Libellé produit
                    </label>
                    <InputText id="nom" value={produit.libelle} onChange={(e) => onInputChange(e, 'libelle')} required autoFocus className={classNames({ 'p-invalid': submitted && !produit.libelle })} />
                    {submitted && !produit.libelle && <small className="p-error">Le libelle est obligatoire.</small>}
                </div>
                <div className="field">
                    <label htmlFor="prenoms" className="font-bold">
                        Catégorie
                    </label>
                    <Dropdown value={produit.categorie} onChange={onCategorieChange} options={cat} optionLabel="libelleCatProd" placeholder="Select a City"  />
                    {submitted && !produit.categorie && <small className="p-error">La categorie est obligatoire.</small>}
                </div>
                <div className="field">
                    <label htmlFor="prenoms" className="font-bold">
                        prix
                    </label>
                    <InputNumber id="price" value={produit.prix} onValueChange={(e) => onInputNumberChange(e, 'prix')} mode="currency" currency="XOF" locale="fr-FR" />
                    {submitted && !produit.prix && <small className="p-error">Le nom est obligatoire.</small>}
                </div>
                
            </Dialog>


            {/*Popup de confirmation de suppression d'une ligne */}
            <Dialog visible={deleteProduitDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProduitDialogFooter} onHide={hideDeleteProduitDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {produit && (
                        <span>
                            Etre vous sure de vouloir supprimer  <b>{produit.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            {/*Popup de confirmation de suppression des produits selectionnés */}
            <Dialog visible={deleteProduitsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProduitsDialogFooter} onHide={hideDeleteProduitsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {produit && <span>Etre vous sure de vouloir supprimer les produits selectionnés?</span>}
                </div>
            </Dialog>
        </div>
    );
}
        