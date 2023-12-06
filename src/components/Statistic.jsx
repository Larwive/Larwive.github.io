import React, { useEffect, useState } from 'react'
import './Statistic.css'


const Statistic = ({ name, icon, route, body }) => {
    const url = 'https://kindhearted-lava-giver.glitch.me'
    const [data, setData] = useState(null)

    useEffect(() => {
        if (route) { // TODO: remove this
            fetch(`${url}/${route}`, {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then((data) => {
                    setData(data.count)
                    console.log(data)
                });
        }
    }, )

    return (
        <div className='stat'>
            <div className='stat-header'>
                <Title name={name} />
            </div>
            <div className='stat-data'>
                <div>{data === null ? <div></div> : <div>{data}</div>}</div>
                {icon}
            </div>
        </div>
    )
}

const Title = ({ name }) => {
    return <h2 className='stat-title'>
        {name}
    </h2>
}

export default Statistic