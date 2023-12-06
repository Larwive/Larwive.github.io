import React, { useEffect, useState } from 'react'
import "./Insertion.css"

const baseUrl = 'https://kindhearted-lava-giver.glitch.me';

export const ClientInsertion = () => {

    const initalState = { "id": "admin", "password": "admin", "nom_client": "", "prenom_client": "", "adresse_client": "", "mail_client": "", "telephone_client": "" }
    const [data, setData] = useState({ 'id': "admin", 'password': 'admin' })

    return (
        <div className='insertion-client'>
            <h2 className='insertion-title'>Ajouter un client à la base de donnée</h2>
            <form className='insertion-client-data'>
                <input type='text' placeholder='Nom' required="required" value={data.nom_client} onChange={(e) => setData({ ...data, nom_client: e.target.value })} />
                <input type='text' placeholder='Prenom' required="required" value={data.prenom_client} onChange={(e) => setData({ ...data, prenom_client: e.target.value })} />
                <input type='text' placeholder='Adresse' required="required" value={data.adresse_client} onChange={(e) => setData({ ...data, adresse_client: e.target.value })} />
                <input type='email' placeholder='Email' required="required" value={data.mail_client} onChange={(e) => setData({ ...data, mail_client: e.target.value })} />
                <input type='tel' placeholder='Téléphone' required="required" value={data.telephone_client} onChange={(e) => setData({ ...data, telephone_client: e.target.value })} />
                <ExportButton className='instertion-client-add' route="clients" data={data} initalState={initalState} setData={setData} />

            </form>
        </div >
    )
}

export const VehiculeInsertion = () => {
    const initalState = { "id": "admin", "password": "admin", "immatriculation": "", "date_de_mise_en_circulation": "", "type_vehicule": "" }
    const [data, setData] = useState({ "id": "admin", "password": "admin" })
    const [clients, setClients] = useState([])
    const [models, setModels] = useState([])

    useEffect(() => {
        fetch(`${baseUrl}/search`, {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({ table: "clients" })
        })
            .then(response => response.json())
            .then((data) => {
                console.log("call api")
                setClients(data.rows.map(elm => { return { id_client: elm.id_client, nom_client: elm.nom_client, prenom_client: elm.prenom_client } }))
            });

        fetch(`${baseUrl}/search`, {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({ table: "modeles" })
        })
            .then(response => response.json())
            .then((data) => {
                console.log("call api")
                setModels(data.rows.map(elm => { return { id_modele: elm.id_modele, nom_modele: elm.nom_modele } }))
            });
    }, [])

    return (
        <div className='insertion-vehicule'>
            <h2 className='insertion-title'>Ajouter un véhicule à la base de donnée</h2>
            <form className='insertion-vehicule-data'>
                <input type='text' placeholder='Immatriculation' value={data.immatriculation} onChange={(e) => setData({ ...data, immatriculation: e.target.value })} />
                <input type='date' placeholder='Date de mise en circulation' value={data.date_de_mise_en_circulation} onChange={(e) => setData({ ...data, date_de_mise_en_circulation: e.target.value })} />
                <input type='text' placeholder='Type de véhicule' value={data.type_vehicule} onChange={(e) => setData({ ...data, type_vehicule: e.target.value })} />
                <select type='text' placeholder='Client' onChange={(e) => setData({ ...data, id_client: JSON.parse(e.target.value).id_client })} >
                    {clients.map(client => <option>{JSON.stringify(client)}</option>)}
                </select>
                <select type='text' placeholder='Modèle' onChange={(e) => setData({ ...data, id_modele: JSON.parse(e.target.value).id_modele })} >
                    {models.map(model => <option>{JSON.stringify(model)}</option>)}
                </select>
                <ExportButton className='instertion-vehicules-add' route="vehicules" data={data} initalState={initalState} setData={setData} />
            </form>
        </div>

    )
}


export const BillInsertion = () => {

    const initalState = { "id": "admin", "password": "admin", "montant": "", "date_facture": "" }
    const [data, setData] = useState(initalState)
    const [clients, setClients] = useState([])
    const [interventions, setInterventions] = useState([])

    useEffect(() => {
        fetch(`${baseUrl}/search`, {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({ table: "clients" })
        })
            .then(response => response.json())
            .then((data) => {
                console.log("call api")
                setClients(data.rows.map(elm => { return { id_client: elm.id_client, nom_client: elm.nom_client, prenom_client: elm.prenom_client } }))
            });

        fetch(`${baseUrl}/search`, {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({ table: "interventions" })
        })
            .then(response => response.json())
            .then((data) => {
                setInterventions(data.rows.map(elm => { return { id_intervention: elm.id_intervention, type_intervention: elm.type_intervention } }))
            });
    }, [])

    return (
        <div className='insertion-bill'>
            <h2 className='insertion-title'>Ajouter une facture</h2>
            <form className='insertion-bill-data'>
                <input type='text' placeholder='Montant' required="required" value={data.montant} onChange={(e) => setData({ ...data, montant: e.target.value })} />
                <input type='date' placeholder='Date Facture' required="required" value={data.date_facture} onChange={(e) => setData({ ...data, date_facture: e.target.value })} />
                <select onChange={(e) => setData({ ...data, id_client: JSON.parse(e.target.value).id_client })} >
                    {clients.map(client => <option>{JSON.stringify(client)}</option>)}
                </select>
                <select onChange={(e) => setData({ ...data, id_intervention: JSON.parse(e.target.value).id_intervention })} >
                    {interventions.map(intervention => <option>{JSON.stringify(intervention)}</option>)}
                </select>
                <ExportButton className='instertion-bill-add' route="factures" data={data} initalState={initalState} setData={setData} />
            </form>
        </div >
    )
}

const ExportButton = ({ data, route, initalState, setData }) => {
    return <input type='submit' onClick={(e) => {
        e.preventDefault();
        console.log(data)
        fetch(`${baseUrl}/insertion/${route}`, {
            method: 'POST', headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => console.log(data));
        setData(initalState)
    }}></input>
}


export default ClientInsertion