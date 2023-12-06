import "./Dashboard.css";
import React, { useState } from 'react';
import Statistic from './Statistic';
import { BsFillPeopleFill, BsHourglass, BsWrench } from 'react-icons/bs'
import { RequestPannel } from "./RequestPannel";
import { BillInsertion, ClientInsertion, VehiculeInsertion } from "./Insertion"


const Dashboard = () => {

    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <div className="dashboard">
            <div className="dashboard-stats">
                <Statistic name='Clients' icon={<BsFillPeopleFill className='stat-icon' />} route='search' body={{ table: "clients" }} />
                <Statistic name='Interventions' icon={<BsWrench className='stat-icon' />} route='search' body={{ table: "interventions" }} />
                <Statistic name='Heures facturée' icon={<BsHourglass className='stat-icon' />} route='nbChargedHours' body={{}} />
            </div>
            <div className="dashboard-request">
                <RequestPannel />
                {isAdmin ? <div></div> : <Authentification setIsAdmin={setIsAdmin} isAdmin={isAdmin} />}
                {!isAdmin ? <div></div> : <div>
                    <ClientInsertion />
                    <VehiculeInsertion />
                    <BillInsertion />
                </div>}

            </div>
        </div>
    );
}

const Authentification = ({ setIsAdmin }) => {

    const url = "https://kindhearted-lava-giver.glitch.me/getrights"
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return <div>
        <form className="insertion-client-data authentification">
            <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={(e) => {
                e.preventDefault()
                fetch(url, {
                    method: 'POST', headers: {
                        "Content-Type": "application/json",
                    }, body: JSON.stringify({ id: username, password: password })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        if (data.rights === 2)
                            setIsAdmin(true)
                        else {
                            setUsername("")
                            setPassword("")
                        }
                    });

            }}>Se connecter</button>
        </form>
    </div>
}

export default Dashboard