import React, { useState } from 'react'
import './RequestPannel.css'

export const RequestPannel = () => {


    const [data, setData] = useState(null);
    const [categorie, setCategorie] = useState("")
    const [option, setOption] = useState({})

    function showInputs(cat) {
        switch (cat) {
            case "Clients":
                return <div className='inputs'>
                    <ClientOption option={option} setOption={setOption} />
                    <SpecialRequest option={option} setData={setData} route="entrustedVehicules" name="Véhicule/Personne" />
                    <SpecialRequest option={option} setData={setData} route="invoicesSum" name="Montant/Personne" />
                    <RequestButton option={option} setOption={setOption} setData={setData} route="clients" />
                </div>
            case "Véhicules":
                return <div className='inputs'>

                    <VehiculeOption option={option} setOption={setOption} />
                    <SpecialRequest option={option} setData={setData} route="listModelsInterval" name="Liste modèles" />
                    <RequestButton option={option} setOption={setOption} setData={setData} route="vehicules" />
                </div>
            case "Factures":
                return <div className='inputs'>
                    <FactureOption option={option} setOption={setOption} />
                    <RequestButton option={option} setOption={setOption} setData={setData} route="factures" />
                </div>
            // case "Interventions":
            //     return <div className='inputs'>
            //         <InterventionOption option={option} setOption={setOption} />
            //         <RequestButton option={option} setOption={setOption} setData={setData} route="intervention" />
            //     </div>
            default:
                return <div className='inputs'>
                    <ClientOption option={option} setOption={setOption} />
                    <SpecialRequest option={option} setData={setData} route="entrustedVehicules" name="Véhicule/Personne" />
                    <SpecialRequest option={option} setData={setData} route="invoicesSum" name="Montant/Personne" />
                    <RequestButton option={option} setOption={setOption} setData={setData} route="clients" />
                </div>
        }
    }

    return (
        <div className='request-pannel'>
            <div>
                <select className='request-categorie' value={categorie} onChange={(e) => setCategorie(e.target.value)}>
                    <option>Clients</option>
                    <option>Véhicules</option>
                    <option>Factures</option>
                </select>
                {showInputs(categorie)}
            </div>
            <div className='request-result'>{data === null ? <div>Loading...</div> :
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Object.keys(data[0]).length}, auto)`, gap: '20px' }}>
                    {Object.keys(data[0]).map(cat => <div className='request-categorie' key={cat}>{cat}</div>)}
                    {data.map((elm) => Object.values(elm).map(val => <div className='request-value' key={val}>{val}</div>))}
                </div>}
            </div>
        </div>
    )
}

const RequestButton = ({ option, setData, route }) => {

    const url = 'https://kindhearted-lava-giver.glitch.me/search'

    return <button className='request-button'
        onClick={(e) => {
            e.preventDefault()
            setData(null);
            fetch(url, {
                method: 'POST', headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({ ...option, table: route })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(JSON.stringify(data))
                    if (data.count > 0) {
                        setData(data.rows)
                    }
                });
        }}>
        <h2>Chercher</h2>
    </button>
}

function handleInputChange(e, key, option, setOption) {
    e.preventDefault()
    const value = e.target.value
    if (value.length > 0) {
        const newOption = { ...option }
        newOption[key] = value;
        setOption(newOption)
    }
    else {
        delete option[key]
        setOption({ ...option })
    }
}


const ClientOption = ({ option, setOption }) => {

    return <form className='insertion'>
        <input type='text' placeholder='Nom' onChange={(e) => handleInputChange(e, "nom_client", option, setOption)} />
        <input type='text' placeholder='Prenom' onChange={(e) => handleInputChange(e, "prenom_client", option, setOption)} />
        <input type='text' placeholder='Adresse' onChange={(e) => handleInputChange(e, "adresse_client", option, setOption)} />
        <input type='email' placeholder='Email' onChange={(e) => handleInputChange(e, "mail_client", option, setOption)} />
        <input type='tel' placeholder='Téléphone' onChange={(e) => handleInputChange(e, "telephone_client", option, setOption)} />
    </form>
}

const FactureOption = ({ option, setOption }) => {
    return <form className='insertion'>
        <input type='text' placeholder='Montant' onChange={(e) => handleInputChange(e, "montant", option, setOption)} />
        <input type='date' placeholder='Date Facture' onChange={(e) => handleInputChange(e, "date_facture", option, setOption)} />
    </form>
}
const VehiculeOption = ({ option, setOption }) => {
    return <form className='insertion'>
        <input type='text' placeholder='Immatriculation' onChange={(e) => handleInputChange(e, "immatriculation", option, setOption)} />
        <input type='date' placeholder='Date de mise en circulation' onChange={(e) => handleInputChange(e, "date_de_mise_en_circulation", option, setOption)} />
        <input type='text' placeholder='Type de véhicule' onChange={(e) => handleInputChange(e, "type_vehicule", option, setOption)} />
    </form>
}

const SpecialRequest = ({ option, setData, route, name }) => {

    const baseUrl = 'https://kindhearted-lava-giver.glitch.me/'

    return <button className='request-button'
        onClick={(e) => {
            e.preventDefault()
            setData(null);
            fetch(`${baseUrl}/${route}`, {
                method: 'POST', headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({ ...option })
            })
                .then(response => response.json())
                .then(data => {
                    setData(data.rows)
                });
        }}>
        <h2>{name}</h2>
    </button>
}


export default RequestPannel