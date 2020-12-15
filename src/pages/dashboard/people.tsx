import React from 'react'
import Navbar from '../../components/Navbar'
import Subnav from '../../components/Subnav'

const People:React.FC = () => {
    return (
        <div className="h-screen bg-gray-800">
            <Navbar />
            <Subnav />
        </div>
    )
}

export default People
