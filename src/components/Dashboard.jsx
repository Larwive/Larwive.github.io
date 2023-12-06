import "./Dashboard.css";
import React from 'react';
import Statistic from './Statistic';
import { BsFillPeopleFill, BsHourglass, BsWrench } from 'react-icons/bs'
import { DemoRequestPannel, RequestPannel } from "./RequestPannel";
import { BillInsertion, ClientInsertion, VehiculeInsertion } from "./Insertion"


const Dashboard = () => {

    return (
        <div className="dashboard">
            <div className="dashboard-stats">
                <Statistic name='Clients' icon={<BsFillPeopleFill className='stat-icon' />} route='gettable' body={{ table: "clients" }} />
                <Statistic name='Interventions' icon={<BsWrench className='stat-icon' />} route='intervention' body={{}} />
                <Statistic name='Charged hours' icon={<BsHourglass className='stat-icon' />} route='nbChargedHours' body={{}} />
            </div>
            <div className="dashboard-request">
                <RequestPannel />
                <ClientInsertion />
                <VehiculeInsertion />
                <BillInsertion />
            </div>
        </div>
    );
}

export default Dashboard