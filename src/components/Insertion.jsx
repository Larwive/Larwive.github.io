import React, { useEffect, useState } from 'react'
import "./Insertion.css"

const baseUrl = 'https://kindhearted-lava-giver.glitch.me';

export const ClientInsertion = () => {

    const [data, setData] = useState({ 'id': "admin", 'password': 'admin' })

    return (
        <div className='insertion-client'>
            <h2 className='insertion-client-title'>Ajoutez un client à la base de donnée</h2>
            <form className='insertion-client-data'>
                <input type='text' placeholder='Nom' required="required" onChange={(e) => setData({ ...data, nom_client: e.target.value })} />
                <input type='text' placeholder='Prenom' required="required" onChange={(e) => setData({ ...data, prenom_client: e.target.value })} />
                <input type='text' placeholder='Adresse' required="required" onChange={(e) => setData({ ...data, adresse_client: e.target.value })} />
                <input type='email' placeholder='Email' required="required" onChange={(e) => setData({ ...data, mail_client: e.target.value })} />
                <input type='tel' placeholder='Téléphone' required="required" onChange={(e) => setData({ ...data, telephone_client: e.target.value })} />
                <input type='submit' className='instertion-client-add' onClick={(e) => {
                    e.preventDefault();
                    fetch(`${baseUrl}/insertion/clients`, {
                        method: 'POST', headers: {
                            "Content-Type": "application/json",
                        }, body: JSON.stringify(data)
                    })
                        .then(response => response.json())
                        .then(data => console.log(data));
                }}></input>
            </form>
        </div >
    )
}

export const VehiculeInsertion = () => {
    const [data, setData] = useState({ 'id': "admin", 'password': 'admin' })
    const [clients, setClients] = useState([])
    const [models, setModels] = useState([])

    useEffect(() => {
        fetch(`${baseUrl}/gettable`, {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({ table: "clients" })
        })
            .then(response => response.json())
            .then((data) => {
                console.log("call api")
                setClients(data.rows.map(elm => { return { id_client: elm.id_client, nom_client: elm.nom_client, prenom_client: elm.prenom_client } }))
            });

        fetch(`${baseUrl}/gettable`, {
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
            <h2 className='insertion-vehicule-title'>Ajoutez un véhciules à la base de donnée</h2>
            <form className='insertion-vehicule-data'>
                <input type='text' placeholder='Immatriculation' onChange={(e) => setData({ ...data, immatriculation: e.target.value })} />
                <input type='date' placeholder='Date de mise en circulation' onChange={(e) => setData({ ...data, date_de_mise_en_circulation: e.target.value })} />
                <input type='text' placeholder='Type de véhicule' onChange={(e) => setData({ ...data, type_vehicule: e.target.value })} />
                <select type='text' placeholder='Client' onChange={(e) => setData({ ...data, id_client: JSON.parse(e.target.value).id_client })} >
                    {clients.map(client => <option>{JSON.stringify(client)}</option>)}
                </select>
                <select type='text' placeholder='Modèle' onChange={(e) => setData({ ...data, id_modele: JSON.parse(e.target.value).id_modele })} >
                    {models.map(model => <option>{JSON.stringify(model)}</option>)}
                </select>
                <input type='submit' className='instertion-client-add' onClick={(e) => {
                    e.preventDefault(); // TODO: factoriser cette merde
                    fetch(`${baseUrl}/insertion/vehicules`, {
                        method: 'POST', headers: {
                            "Content-Type": "application/json",
                        }, body: JSON.stringify(data)
                    })
                        .then(response => response.json())
                        .then(data => console.log(data));
                }}></input>
            </form>
        </div>

    )
}


export const BillInsertion = () => {

    const [data, setData] = useState({ 'id': "admin", 'password': 'admin' })
    const [clients, setClients] = useState([])
    const [interventions, setInterventions] = useState([])

    useEffect(() => {
        fetch(`${baseUrl}/gettable`, {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({ table: "clients" })
        })
            .then(response => response.json())
            .then((data) => {
                console.log("call api")
                setClients(data.rows.map(elm => { return { id_client: elm.id_client, nom_client: elm.nom_client, prenom_client: elm.prenom_client } }))
            });

        fetch(`${baseUrl}/gettable`, {
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
            <h2 className='insertion-bill-title'>Ajoutez une facture</h2>
            <form className='insertion-bill-data'>
                <input type='text' placeholder='Montant' required="required" onChange={(e) => setData({ ...data, montant: e.target.value })} />
                <input type='date' placeholder='Date Facture' required="required" onChange={(e) => setData({ ...data, date_facture: e.target.value })} />
                <select onChange={(e) => setData({ ...data, id_client: JSON.parse(e.target.value).id_client })} >
                    {clients.map(client => <option>{JSON.stringify(client)}</option>)}
                </select>
                <select onChange={(e) => setData({ ...data, id_intervention: JSON.parse(e.target.value).id_intervention })} >
                    {interventions.map(intervention => <option>{JSON.stringify(intervention)}</option>)}
                </select>
                <input type='submit' className='instertion-bill-add' onClick={(e) => {
                    e.preventDefault();
                    console.log(data)
                    fetch(`${baseUrl}/insertion/factures`, {
                        method: 'POST', headers: {
                            "Content-Type": "application/json",
                        }, body: JSON.stringify(data)
                    })
                        .then(response => response.json())
                        .then(data => console.log(data));
                }}></input>
            </form>
        </div >
    )
}


export default ClientInsertion