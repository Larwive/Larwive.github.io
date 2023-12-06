import React, { useState } from 'react'
import './RequestPannel.css'

export const DemoRequestPannel = () => {

    const [data, setData] = useState(null)

    return (
        <div className='request-pannel'>
            <div className='request-buttons'>
                <RequestButton name='Clients' url='https://kindhearted-lava-giver.glitch.me/gettable' setData={setData} />
                <RequestButton name='Interventions' url='https://kindhearted-lava-giver.glitch.me/intervention' setData={setData} />
                {/* <RequestButton name='REQ 3' url='https://kindhearted-lava-giver.glitch.me/gettable' setData={setData} />
                <RequestButton name='REQ 4' url='https://kindhearted-lava-giver.glitch.me/gettable' setData={setData} />
                <RequestButton name='REQ 5' url='' setData={setData} /> */}
                {/* <RequestButton name='REQ 6' url='' setData={setData} /> */}
            </div>
            <div className='request-result'>{data === null ? <div></div> :
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Object.keys(data[0]).length}, auto)`, gap: '20px' }}>
                    {Object.keys(data[0]).map(cat => <div className='request-categorie'>{cat}</div>)}
                    {data.map((elm) => Object.values(elm).map(val => <div className='request-value' key={val}>{val}</div>))}
                </div>}
            </div>
        </div>
    )
}

export const RequestPannel = () => {

    const [data, setData] = useState(null);
    const [options, setOptions] = useState({});

    return (
        <div className='request-pannel'>
            <div className='request-buttons'>
                {/* <input className='request-name-input' type='text' onChange={(e) => setOptions({ ...options, nom: e.target.value })} />
                <input className='request-name-input' type='text' onChange={(e) => setOptions({ ...options, prenom: e.target.value })} /> */}
                <RequestButton name='Clients' url='https://kindhearted-lava-giver.glitch.me/search' setData={setData} option={{
                    method: 'POST', headers: {
                        "Content-Type": "application/json",
                    }, body: JSON.stringify({ ...options, table: 'clients' })
                }} />
                <RequestButton name='Vehicules' url='https://kindhearted-lava-giver.glitch.me/search' setData={setData} option={{
                    method: 'POST', headers: {
                        "Content-Type": "application/json",
                    }, body: JSON.stringify({ ...options, table: 'vehicules' })
                }} />
                <RequestButton name='Interventions' url='https://kindhearted-lava-giver.glitch.me/search' setData={setData} option={{
                    method: 'POST', headers: {
                        "Content-Type": "application/json",
                    }, body: JSON.stringify({ ...options, table: 'interventions' })
                }} />
                <RequestButton name='Factures' url='https://kindhearted-lava-giver.glitch.me/search' setData={setData} option={{
                    method: 'POST', headers: {
                        "Content-Type": "application/json",
                    }, body: JSON.stringify({ ...options, table: 'factures' })
                }} />
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

const RequestButton = ({ name, url, setData, option }) => {
    return <button className='request-button'
        onClick={() => {
            setData(null);
            fetch(url, option)
                .then(response => response.json())
                .then((data) => setData(data.rows));
        }}>
        <h2>{name}</h2>
    </button>
}

export default RequestPannel