import React from 'react'
import Navbar from './Navbar'
import Subnav from './Subnav'


const Container = ({ children }) => {
    return (
        <div>
            <Navbar />
            <Subnav />
            {children}
        </div>
    )
}

export default Container
